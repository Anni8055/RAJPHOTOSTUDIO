import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PortfolioPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { name: "All", active: true },
    { name: "Wedding", active: false },
    { name: "Pre-Wedding", active: false },
    { name: "Engagement", active: false },
    { name: "Portrait", active: false }
  ];

  const portfolioImages = [
    {
      src: "https://images.unsplash.com/photo-1506268452458-bfb3757ed859",
      alt: "City lights at night",
      category: "Wedding"
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
      alt: "Wedding chairs on grass",
      category: "Wedding"
    },
    {
      src: "https://images.unsplash.com/photo-1504438190342-5951e134ffee",
      alt: "Children on bench",
      category: "Portrait"
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
      alt: "Couple at sunset",
      category: "Engagement"
    },
    {
      src: "https://images.unsplash.com/photo-1544148103-0773bf10d330",
      alt: "Bride with veil",
      category: "Wedding"
    },
    {
      src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
      alt: "Couple embracing",
      category: "Pre-Wedding"
    },
    {
      src: "https://images.unsplash.com/photo-1609189184775-9f2e0573bb74",
      alt: "European architecture",
      category: "Portrait"
    },
    {
      src: "https://images.unsplash.com/photo-1497261776786-216c2f786efa",
      alt: "Couple in car",
      category: "Wedding"
    },
    {
      src: "https://images.unsplash.com/photo-1469406396016-013bfae5d83e",
      alt: "Woman with flower crown",
      category: "Portrait"
    }
  ];

  const openImageModal = (src: string) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-script text-5xl text-[#9B8F4B] mb-6">
            Portfolio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Browse through a collection of my best work. Click on any image to view it in full size.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 border rounded-md transition-colors ${
                  category.active 
                    ? "bg-[#9B8F4B] text-white border-[#9B8F4B]" 
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {portfolioImages.map((image, index) => (
            <div 
              key={index}
              className="overflow-hidden rounded-md cursor-pointer group"
              onClick={() => openImageModal(`${image.src}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`)}
            >
              <div className="relative aspect-square">
                <img 
                  src={`${image.src}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white bg-black/50 px-3 py-1 rounded-md text-sm">
                    View
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal for full-size image view */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Full size" 
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default PortfolioPage;

// Explicitly export the component to fix potential module resolution issues
export { PortfolioPage }; 