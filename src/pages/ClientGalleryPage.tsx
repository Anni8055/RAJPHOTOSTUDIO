import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import ClientGallery from '@/components/ClientGallery';
import SEOHead from '@/components/SEOHead';

const ClientGalleryPage = () => {
  const { galleryId } = useParams<{ galleryId: string }>();
  const [galleryName, setGalleryName] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch gallery metadata for SEO purposes
    const fetchGalleryMetadata = async () => {
      if (!galleryId) return;
      
      try {
        const galleryRef = doc(db, 'galleries', galleryId);
        const gallerySnap = await getDoc(galleryRef);
        
        if (gallerySnap.exists()) {
          const data = gallerySnap.data();
          setGalleryName(data.name || 'Photo Gallery');
          setClientName(data.clientName || 'Client');
        }
      } catch (error) {
        console.error('Error fetching gallery metadata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGalleryMetadata();
  }, [galleryId]);
  
  if (!galleryId) {
    return (
      <div className="min-h-screen bg-off-white pt-32 pb-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-medium text-red-500 mb-4">Gallery Not Found</h1>
          <p className="text-gray-600 mb-6">
            The gallery ID is missing or invalid. Please check your link and try again.
          </p>
          <a 
            href="/"
            className="inline-block bg-[#9B8F4B] hover:bg-[#867A40] text-white px-4 py-2 rounded-md"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }
  
  const seoTitle = galleryName ? `${galleryName} - ${clientName}'s Gallery` : 'Client Photo Gallery';
  const seoDescription = `View and download ${clientName}'s photos from ${galleryName} by RAJ Photo Studio. Professional wedding photography that captures your special moments.`;

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        keywords="wedding photos, client gallery, professional photography, wedding gallery"
        type="article"
      />
      <ClientGallery />
    </>
  );
};

export default ClientGalleryPage; 