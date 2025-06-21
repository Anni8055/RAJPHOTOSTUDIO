import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/config/firebase';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import usePerformanceMonitoring from '@/hooks/usePerformanceMonitoring';

type GalleryImage = {
  id: string;
  url: string;
  name: string;
  createdAt: Date;
  downloadUrl?: string;
};

const ClientGallery = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Monitor performance for this page
  usePerformanceMonitoring('client_gallery');

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        
        // Fetch gallery metadata from Firestore
        const imagesRef = collection(db, 'galleries');
        const q = query(imagesRef, where('galleryId', '==', galleryId));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError('Gallery not found or no images available.');
          setLoading(false);
          return;
        }
        
        // Process gallery results
        const galleryData = querySnapshot.docs[0].data();
        const imagePromises = galleryData.images.map(async (image: any) => {
          // Get the download URL for each image
          const imageRef = ref(storage, image.path);
          const url = await getDownloadURL(imageRef);
          
          return {
            id: image.id,
            url,
            name: image.name,
            createdAt: image.createdAt.toDate(),
          };
        });
        
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError('Failed to load gallery images. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (galleryId) {
      fetchGalleryImages();
    }
  }, [galleryId]);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleDownload = async () => {
    if (!selectedImage) return;
    
    try {
      setIsDownloading(true);
      
      // If we don't already have the download URL, get a fresh one
      const downloadUrl = selectedImage.downloadUrl || selectedImage.url;
      
      // Create a temporary anchor to trigger the download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = selectedImage.name || 'download-image';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading image:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Header />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-script text-5xl text-[#9B8F4B] mb-6 font-light tracking-wide">
            Your Gallery
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Browse through your collection of photos. Click on any image to view it in full size.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div 
                key={index}
                className="animate-pulse rounded-md overflow-hidden shadow-md"
              >
                <div className="aspect-square bg-gray-200"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="bg-red-50 p-6 rounded-lg max-w-lg mx-auto">
              <h3 className="text-red-800 font-medium mb-2">Gallery Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div 
                key={image.id}
                className="overflow-hidden rounded-md cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => handleImageClick(image)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <OptimizedImage 
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full"
                    objectFit="cover"
                    // Prioritize the first few images for faster initial load
                    priority={index < 6}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty state if no images */}
        {!loading && !error && images.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-50 p-8 rounded-lg max-w-lg mx-auto">
              <h3 className="font-medium text-lg mb-2">No Images Yet</h3>
              <p className="text-gray-600 mb-4">
                There are no images in this gallery yet. Please check back later or contact your photographer.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Image Viewer Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-6xl p-0 bg-white border-none rounded-md overflow-hidden">
          {selectedImage && (
            <div className="flex flex-col h-full max-h-[85vh]">
              {/* Main image section */}
              <div className="relative w-full bg-black flex items-center justify-center">
                <img 
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
                
                {/* Download button */}
                <button 
                  className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload();
                  }}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Downloading...' : 'Download'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>

                <button 
                  className="absolute top-2 right-2 bg-black/10 hover:bg-black/20 text-white w-8 h-8 rounded-full flex items-center justify-center"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ClientGallery; 