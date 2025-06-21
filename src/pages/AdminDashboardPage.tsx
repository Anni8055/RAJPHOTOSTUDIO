import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GalleryUpload from '@/components/admin/GalleryUpload';
import ListGalleries from '@/components/admin/ListGalleries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('galleries');
  
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };
  
  return (
    <div className="min-h-screen bg-off-white">
      <Header />
      <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-medium">Admin Dashboard</h1>
            <p className="text-gray-600">Manage client galleries and uploads</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Logged in as {currentUser?.email}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white">
            <TabsTrigger value="galleries">Galleries</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="galleries">
            <ListGalleries />
          </TabsContent>
          
          <TabsContent value="upload" className="bg-white rounded-lg shadow-sm">
            <GalleryUpload />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage; 