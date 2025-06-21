import { useState, useRef, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp, doc, updateDoc, arrayUnion, setDoc } from 'firebase/firestore';
import { db, storage, analytics } from '@/config/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import usePerformanceMonitoring from '@/hooks/usePerformanceMonitoring';

// Maximum size for individual uploads (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;
// Maximum total size for batch uploads (50MB)
const MAX_TOTAL_SIZE = 50 * 1024 * 1024;
// Target compression quality (0.7 = 70% quality)
const COMPRESSION_QUALITY = 0.7;
// Max image dimension for resizing
const MAX_IMAGE_DIMENSION = 2000;

type UploadFile = {
  id: string;
  file: File;
  preview: string;
  progress: number;
  uploaded?: boolean;
  error?: string;
  path?: string;
  compressing?: boolean;
  originalSize?: number;
  compressedSize?: number;
};

const GalleryUpload = () => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [galleryName, setGalleryName] = useState('');
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [galleryCreated, setGalleryCreated] = useState(false);
  const [galleryLink, setGalleryLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [totalSize, setTotalSize] = useState(0);
  
  const galleryIdRef = useRef<string>('');
  
  // Monitor performance for this page
  usePerformanceMonitoring('gallery_upload');
  
  // Keep track of total file size
  useEffect(() => {
    const size = files.reduce((sum, file) => sum + file.file.size, 0);
    setTotalSize(size);
  }, [files]);
  
  // Compress an image before upload
  const compressImage = async (file: File): Promise<File> => {
    // Skip compression for non-image files or GIFs (animation would be lost)
    if (!file.type.startsWith('image/') || file.type === 'image/gif') {
      return file;
    }
    
    // Original size for comparison
    const originalSize = file.size;
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
      
      reader.onload = function(e) {
        img.src = e.target?.result as string;
        
        img.onload = function() {
          // Calculate new dimensions while maintaining aspect ratio
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
            if (width > height) {
              height = Math.round(height * (MAX_IMAGE_DIMENSION / width));
              width = MAX_IMAGE_DIMENSION;
            } else {
              width = Math.round(width * (MAX_IMAGE_DIMENSION / height));
              height = MAX_IMAGE_DIMENSION;
            }
          }
          
          // Create canvas for resizing/compression
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(file); // Fallback to original if canvas not supported
            return;
          }
          
          // Draw image on canvas at new dimensions
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to blob with compression
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file); // Fallback to original if compression fails
                return;
              }
              
              // Only use the compressed version if it's actually smaller
              if (blob.size < originalSize) {
                // Create new file from blob
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: file.lastModified,
                });
                
                // Log compression results
                analytics.logEvent('image_compressed', {
                  original_size: originalSize,
                  compressed_size: compressedFile.size,
                  compression_ratio: (originalSize / compressedFile.size).toFixed(2),
                });
                
                resolve(compressedFile);
              } else {
                // Use original if compression didn't reduce size
                resolve(file);
              }
            },
            file.type, 
            COMPRESSION_QUALITY
          );
        };
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file for compression'));
      };
      
      reader.readAsDataURL(file);
    });
  };
  
  // Process files when added
  const processFiles = async (acceptedFiles: File[]) => {
    // Filter out any files that would exceed size limits
    const validFiles = acceptedFiles.filter(file => {
      const newTotalSize = totalSize + file.size;
      return file.size <= MAX_FILE_SIZE && newTotalSize <= MAX_TOTAL_SIZE;
    });
    
    if (validFiles.length < acceptedFiles.length) {
      setError(`Some files exceeded the ${MAX_FILE_SIZE / (1024 * 1024)}MB per file or ${MAX_TOTAL_SIZE / (1024 * 1024)}MB total limit and were skipped.`);
    }
    
    // Create new file objects with preview
    const newFiles = validFiles.map(file => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      originalSize: file.size,
      compressing: true
    }));
    
    // Add to state first with "compressing" status
    setFiles(prev => [...prev, ...newFiles]);
    
    // Process each file (compression)
    const processedFiles = await Promise.all(
      newFiles.map(async (fileObj) => {
        try {
          // Compress the image
          const compressedFile = await compressImage(fileObj.file);
          
          // Return updated file object
          return {
            ...fileObj,
            file: compressedFile,
            compressing: false,
            compressedSize: compressedFile.size
          };
        } catch (err) {
          console.error('Compression error:', err);
          return {
            ...fileObj,
            compressing: false,
            error: 'Failed to compress image'
          };
        }
      })
    );
    
    // Update state with processed files
    setFiles(prev => 
      prev.map(f => {
        const processed = processedFiles.find(p => p.id === f.id);
        return processed || f;
      })
    );
  };
  
  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop: processFiles,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    }
  });
  
  const removeFile = (id: string) => {
    setFiles(prev => {
      const filtered = prev.filter(file => file.id !== id);
      // Revoke preview URL to avoid memory leaks
      const fileToRemove = prev.find(file => file.id === id);
      if (fileToRemove) URL.revokeObjectURL(fileToRemove.preview);
      return filtered;
    });
  };
  
  const uploadGallery = async () => {
    if (!clientName || !galleryName || files.length === 0) {
      setError('Please fill in all fields and add at least one image.');
      return;
    }
    
    const startTime = performance.now();
    
    try {
      setUploading(true);
      setError(null);
      
      // Create a unique gallery ID if not already created
      if (!galleryIdRef.current) {
        galleryIdRef.current = uuidv4();
      }
      
      const galleryId = galleryIdRef.current;
      
      // Create gallery document in Firestore
      const galleryRef = doc(db, 'galleries', galleryId);
      await setDoc(galleryRef, {
        galleryId,
        name: galleryName,
        clientName,
        clientEmail,
        createdAt: Timestamp.now(),
        images: [], // Will be populated as images are uploaded
      });
      
      // Track the creation in analytics
      analytics.logEvent('gallery_created', {
        gallery_id: galleryId,
        image_count: files.length,
        total_size: totalSize
      });
      
      // Batch uploads for better performance
      const uploadBatch = async (batch: UploadFile[], batchIndex: number) => {
        // Start all uploads in parallel but collect promises
        const uploadPromises = batch.map(async (fileObj) => {
          return new Promise<string>((resolve, reject) => {
            // Skip already uploaded files
            if (fileObj.uploaded) {
              resolve(fileObj.id);
              return;
            }
            
            const path = `galleries/${galleryId}/${fileObj.file.name}`;
            const fileRef = storageRef(storage, path);
            
            const uploadTask = uploadBytesResumable(fileRef, fileObj.file);
            
            uploadTask.on('state_changed',
              (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFiles(prev => prev.map(f => 
                  f.id === fileObj.id ? { ...f, progress } : f
                ));
              },
              (error) => {
                // Handle upload errors
                setFiles(prev => prev.map(f => 
                  f.id === fileObj.id ? { ...f, error: 'Upload failed' } : f
                ));
                reject(error);
              },
              async () => {
                // Upload complete
                try {
                  // Get download URL
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                  
                  // Update the file status in state
                  setFiles(prev => prev.map(f => 
                    f.id === fileObj.id ? { 
                      ...f, 
                      uploaded: true, 
                      path: path 
                    } : f
                  ));
                  
                  // Update Firestore with the new image metadata
                  await updateDoc(galleryRef, {
                    images: arrayUnion({
                      id: fileObj.id,
                      name: fileObj.file.name,
                      path: path,
                      size: fileObj.file.size,
                      type: fileObj.file.type,
                      createdAt: Timestamp.now()
                    })
                  });
                  
                  resolve(fileObj.id);
                } catch (err) {
                  reject(err);
                }
              }
            );
          });
        });
        
        // Wait for all uploads in this batch to complete
        return Promise.all(uploadPromises);
      };
      
      // Split files into batches of 5 for better performance
      const BATCH_SIZE = 5;
      let completed = 0;
      
      for (let i = 0; i < files.length; i += BATCH_SIZE) {
        const batch = files.slice(i, i + BATCH_SIZE);
        await uploadBatch(batch, i / BATCH_SIZE);
        completed += batch.length;
        
        // Update progress information
        const totalUploadProgress = (completed / files.length) * 100;
        console.log(`Batch completed: ${totalUploadProgress.toFixed(0)}% done`);
      }
      
      // Set the gallery link for sharing
      const baseUrl = window.location.origin;
      setGalleryLink(`${baseUrl}/gallery/${galleryId}`);
      setGalleryCreated(true);
      
      // Track the upload duration
      const uploadDuration = performance.now() - startTime;
      analytics.logEvent('gallery_upload_complete', {
        gallery_id: galleryId,
        image_count: files.length,
        upload_duration_ms: Math.round(uploadDuration),
        total_size: totalSize
      });
      
    } catch (err) {
      console.error('Error uploading gallery:', err);
      setError('Error creating gallery. Please try again.');
      
      analytics.logEvent('gallery_upload_error', {
        error_message: (err as Error).message || 'Unknown error'
      });
    } finally {
      setUploading(false);
    }
  };
  
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(galleryLink);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-medium mb-6">Create Client Gallery</h2>
        
        {galleryCreated ? (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <h3 className="text-green-800 font-medium">Gallery Created Successfully!</h3>
              </div>
              <p className="text-green-700 mb-4">Your client gallery has been created and all images have been uploaded.</p>
              
              <div className="bg-white border border-gray-200 p-4 rounded flex items-center justify-between">
                <div className="font-medium text-gray-700 truncate">
                  {galleryLink}
                </div>
                <Button variant="outline" onClick={copyLinkToClipboard}>
                  Copy Link
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => {
                setFiles([]);
                setClientName('');
                setClientEmail('');
                setGalleryName('');
                setGalleryCreated(false);
                setGalleryLink('');
                galleryIdRef.current = '';
              }}>
                Create New Gallery
              </Button>
              
              <Button onClick={() => window.open(galleryLink, '_blank')}>
                View Gallery
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Client Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="John & Jane Doe"
                  />
                </div>
                
                <div>
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="client@example.com"
                  />
                </div>
              </div>
              
              {/* Gallery Info */}
              <div>
                <Label htmlFor="galleryName">Gallery Name</Label>
                <Input
                  id="galleryName"
                  value={galleryName}
                  onChange={(e) => setGalleryName(e.target.value)}
                  placeholder="Wedding Photos - June 2023"
                />
                
                <div className="mt-4 text-sm text-gray-500">
                  Total size: {(totalSize / (1024 * 1024)).toFixed(2)} MB 
                  {totalSize > 0 && 
                    <span className={totalSize > MAX_TOTAL_SIZE * 0.8 ? 'text-amber-600' : ''}>
                      {' '}({((totalSize / MAX_TOTAL_SIZE) * 100).toFixed(0)}% of limit)
                    </span>
                  }
                </div>
              </div>
            </div>
            
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                isDragActive ? 'border-[#9B8F4B] bg-[#9B8F4B]/5' : 'border-gray-300 hover:border-[#9B8F4B]/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="text-gray-600">
                  <span className="font-medium text-[#9B8F4B]">Click to upload</span> or drag and drop
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, JPEG up to 10MB each (max 50MB total)
                </p>
              </div>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded">
                {error}
              </div>
            )}
            
            {/* File preview list */}
            {files.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Selected Images ({files.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {files.map(file => (
                    <div key={file.id} className="relative">
                      <Card className="overflow-hidden">
                        <div className="aspect-[4/3] bg-gray-100 relative">
                          <img 
                            src={file.preview} 
                            alt={file.file.name}
                            className="w-full h-full object-cover"
                          />
                          {file.uploaded && (
                            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          
                          {file.compressing && (
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                              <div className="text-sm">Optimizing...</div>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-sm font-medium truncate" title={file.file.name}>
                              {file.file.name.length > 20 ? `${file.file.name.slice(0, 20)}...` : file.file.name}
                            </p>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(file.id);
                              }}
                              disabled={uploading}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>{(file.file.size / 1024 / 1024).toFixed(2)} MB</span>
                            {file.originalSize && file.compressedSize && file.originalSize > file.compressedSize && (
                              <span className="text-green-600">
                                Saved {(100 - (file.compressedSize / file.originalSize * 100)).toFixed(0)}%
                              </span>
                            )}
                          </div>
                          {file.error ? (
                            <p className="text-xs text-red-500">{file.error}</p>
                          ) : (
                            <Progress 
                              value={file.progress} 
                              className="h-1" 
                              indicatorClassName={file.uploaded ? "bg-green-500" : ""}
                            />
                          )}
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upload button */}
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={uploadGallery} 
                disabled={uploading || files.length === 0 || files.some(f => f.compressing)}
                className={uploading ? "bg-[#9B8F4B]/70" : "bg-[#9B8F4B] hover:bg-[#867A40]"}
              >
                {uploading ? 'Uploading...' : 'Upload Gallery'}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GalleryUpload; 