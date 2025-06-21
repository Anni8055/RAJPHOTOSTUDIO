import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/config/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GalleryData {
  id: string;
  galleryId: string;
  name: string;
  clientName: string;
  clientEmail: string;
  createdAt: Date;
  imageCount: number;
}

const ListGalleries = () => {
  const [galleries, setGalleries] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryData | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  
  useEffect(() => {
    fetchGalleries();
  }, []);
  
  const fetchGalleries = async () => {
    try {
      setLoading(true);
      setError('');
      
      const galleriesRef = collection(db, 'galleries');
      const q = query(galleriesRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const galleriesData: GalleryData[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        galleriesData.push({
          id: doc.id,
          galleryId: data.galleryId,
          name: data.name,
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          createdAt: data.createdAt.toDate(),
          imageCount: data.images?.length || 0,
        });
      });
      
      setGalleries(galleriesData);
    } catch (err) {
      console.error('Error fetching galleries:', err);
      setError('Failed to load galleries. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteGallery = async (galleryId: string) => {
    try {
      setDeleting(galleryId);
      
      // Get the gallery to be deleted
      const galleryToDelete = galleries.find(g => g.id === galleryId);
      if (!galleryToDelete) return;
      
      // Delete gallery document from Firestore
      await deleteDoc(doc(db, 'galleries', galleryId));
      
      // Remove from state
      setGalleries(prev => prev.filter(g => g.id !== galleryId));
      
      // Note: In a production app, you would also delete all image files from Storage
      // This would require fetching all image references first and deleting them in a batch
      
      // Close the confirm dialog
      setConfirmDeleteId(null);
    } catch (err) {
      console.error('Error deleting gallery:', err);
      alert('Failed to delete gallery. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const openEmailModal = (gallery: GalleryData) => {
    setSelectedGallery(gallery);
    
    // Create default email content
    const galleryLink = `${window.location.origin}/gallery/${gallery.galleryId}`;
    
    setEmailSubject(`Your Photo Gallery is Ready - ${gallery.name}`);
    setEmailBody(`Dear ${gallery.clientName},\n\nYour photo gallery is now ready to view!\n\nGallery: ${gallery.name}\nLink: ${galleryLink}\n\nClick the link above to access your photos. You can view and download the images.\n\nBest regards,\nYour Photography Studio`);
    
    setShowEmailModal(true);
  };
  
  const handleSendEmail = () => {
    if (!selectedGallery) return;
    
    // Format the mailto link
    const mailtoLink = `mailto:${selectedGallery.clientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open the user's email client
    window.open(mailtoLink, '_blank');
    
    // Close the modal
    setShowEmailModal(false);
  };
  
  const copyGalleryLink = (galleryId: string) => {
    const link = `${window.location.origin}/gallery/${galleryId}`;
    navigator.clipboard.writeText(link);
    alert('Gallery link copied to clipboard!');
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Filter galleries based on search term
  const filteredGalleries = searchTerm 
    ? galleries.filter(gallery => 
        gallery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gallery.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gallery.clientEmail.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : galleries;
  
  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search galleries by name or client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
      ) : error ? (
        <div className="p-4 rounded-md bg-red-50 text-red-700">
          {error}
        </div>
      ) : filteredGalleries.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-md shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {searchTerm ? 'No matching galleries found' : 'No Galleries Found'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try using different search terms or clear your search.'
              : "You haven't created any client galleries yet."}
          </p>
          {searchTerm && (
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredGalleries.map(gallery => (
            <Card key={gallery.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle>{gallery.name}</CardTitle>
                  <span className="text-sm text-gray-500">
                    {formatDate(gallery.createdAt)}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Client</p>
                    <p>{gallery.clientName}</p>
                    <p className="text-sm text-gray-600">{gallery.clientEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">Statistics</p>
                    <p>{gallery.imageCount} Images</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-end gap-2 mt-6">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setConfirmDeleteId(gallery.id)}
                    disabled={deleting === gallery.id}
                  >
                    {deleting === gallery.id ? 'Deleting...' : 'Delete'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/gallery/${gallery.galleryId}`, '_blank')}
                  >
                    View Gallery
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEmailModal(gallery)}
                  >
                    Email Client
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={() => copyGalleryLink(gallery.galleryId)}
                  >
                    Copy Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDeleteId} onOpenChange={(open) => !open && setConfirmDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this gallery? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              variant="destructive" 
              onClick={() => confirmDeleteId && handleDeleteGallery(confirmDeleteId)}
              disabled={!!deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Gallery'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Email Client Dialog */}
      <Dialog open={showEmailModal} onOpenChange={setShowEmailModal}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Email Gallery to Client</DialogTitle>
            <DialogDescription>
              Customize the email to be sent to {selectedGallery?.clientName}.
              This will open your email client.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient" 
                value={selectedGallery?.clientEmail || ''} 
                disabled 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={emailSubject} 
                onChange={(e) => setEmailSubject(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="body">Email Body</Label>
              <textarea 
                id="body" 
                className="flex min-h-[160px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                value={emailBody} 
                onChange={(e) => setEmailBody(e.target.value)} 
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSendEmail}>
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListGalleries; 