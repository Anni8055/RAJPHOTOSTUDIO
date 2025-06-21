import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Define project type with multiple images
type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  images: {
    src: string;
    alt: string;
  }[];
}

const PortfolioPage = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { name: "All", active: activeCategory === "All" },
    { name: "Wedding", active: activeCategory === "Wedding" },
    { name: "Pre-Wedding", active: activeCategory === "Pre-Wedding" },
    { name: "Engagement", active: activeCategory === "Engagement" },
    { name: "Portrait", active: activeCategory === "Portrait" }
  ];

  // Portfolio projects with multiple images
  const portfolioProjects: Project[] = [
    {
      id: "wedding-1",
      title: "Couple in car",
      description: "A beautiful wedding in the city with elegant details.",
      category: "Wedding",
      coverImage: "https://images.unsplash.com/photo-1506268452458-bfb3757ed859",
      images: [
        { src: "https://images.unsplash.com/photo-1506268452458-bfb3757ed859", alt: "City lights at night" },
        { src: "https://images.unsplash.com/photo-1497261776786-216c2f786efa", alt: "Couple in car" },
        { src: "https://images.unsplash.com/photo-1544148103-0773bf10d330", alt: "Bride with veil" }
      ]
    },
    {
      id: "wedding-2",
      title: "Bride getting ready",
      description: "The bride's preparation moments captured in detail.",
      category: "Wedding",
      coverImage: "https://images.unsplash.com/photo-1533359167605-554960b34c06",
      images: [
        { src: "https://images.unsplash.com/photo-1533359167605-554960b34c06", alt: "Bride getting ready" },
        { src: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c", alt: "Wedding dress close-up" },
        { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed", alt: "Bride and groom portrait" }
      ]
    },
    {
      id: "wedding-3",
      title: "Beach wedding setup",
      description: "A gorgeous beach wedding with natural decorations.",
      category: "Wedding",
      coverImage: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
      images: [
        { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486", alt: "Wedding chairs on grass" },
        { src: "https://images.unsplash.com/photo-1580824456266-c578edfd9df1", alt: "Beach wedding setup" },
        { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486", alt: "Decorative wedding setup" }
      ]
    },
    {
      id: "pre-wedding-1",
      title: "Sunset Couple Session",
      description: "A romantic pre-wedding photoshoot at sunset.",
      category: "Pre-Wedding",
      coverImage: "https://images.unsplash.com/photo-1537633552985-df8429e8048b",
      images: [
        { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b", alt: "Couple embracing" },
        { src: "https://images.unsplash.com/photo-1509927083803-4bd519298ac4", alt: "Couple at sunset" },
        { src: "https://images.unsplash.com/photo-1550005809-91ad75fb315f", alt: "Couple walking hand in hand" }
      ]
    },
    {
      id: "engagement-1",
      title: "Garden Engagement",
      description: "A beautiful engagement session in a garden.",
      category: "Engagement",
      coverImage: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
      images: [
        { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a", alt: "Couple at sunset" },
        { src: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f", alt: "Engagement ring closeup" },
        { src: "https://images.unsplash.com/photo-1511285605577-4d62fb50d2f7", alt: "Engagement celebration" }
      ]
    },
    {
      id: "portrait-1",
      title: "Family Portraits",
      description: "Natural family portraits in various settings.",
      category: "Portrait",
      coverImage: "https://images.unsplash.com/photo-1504438190342-5951e134ffee",
      images: [
        { src: "https://images.unsplash.com/photo-1504438190342-5951e134ffee", alt: "Children on bench" },
        { src: "https://images.unsplash.com/photo-1470931256199-2d2ffd886fb1", alt: "Family portrait" },
        { src: "https://images.unsplash.com/photo-1469406396016-013bfae5d83e", alt: "Woman with flower crown" }
      ]
    },
    {
      id: "portrait-2",
      title: "Architectural Portraits",
      description: "Portrait photography with architectural elements.",
      category: "Portrait",
      coverImage: "https://images.unsplash.com/photo-1609189184775-9f2e0573bb74",
      images: [
        { src: "https://images.unsplash.com/photo-1609189184775-9f2e0573bb74", alt: "European architecture" },
        { src: "https://images.unsplash.com/photo-1469406396016-013bfae5d83e", alt: "Portrait with background" },
        { src: "https://images.unsplash.com/photo-1504438190342-5951e134ffee", alt: "Urban portrait" }
      ]
    }
  ];

  useEffect(() => {
    // Filter projects based on the active category
    if (activeCategory === "All") {
      setFilteredProjects(portfolioProjects);
    } else {
      setFilteredProjects(portfolioProjects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const openProjectModal = (index: number) => {
    setSelectedProjectIndex(index);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    if (selectedProjectIndex !== null) {
      const project = filteredProjects[selectedProjectIndex];
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedProjectIndex !== null) {
      const project = filteredProjects[selectedProjectIndex];
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-off-white">
      <Header />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="font-script text-5xl text-[#9B8F4B] mb-6 font-light tracking-wide">
            Portfolio
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Browse through a collection of my best work. Click on any image to view all photos from the project.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-4 py-2 border rounded-md transition-all duration-300 ${
                  category.active 
                    ? "bg-[#9B8F4B] text-white border-[#9B8F4B] scale-105" 
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div 
              key={index}
                className="animate-pulse rounded-md overflow-hidden shadow-md"
              >
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-4 bg-white">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.5s ease-in-out"
            }}
          >
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="overflow-hidden rounded-md cursor-pointer group shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => openProjectModal(index)}
            >
                <div className="relative aspect-square overflow-hidden">
                <img 
                    src={`${project.coverImage}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white bg-black/50 px-3 py-2 rounded-md text-sm transform transition-transform group-hover:scale-110">
                      View Project
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-3 bg-black/30 text-white text-xs">
                    {project.category}
                  </div>
                  <div className="absolute bottom-0 right-3 p-3 bg-black/50 text-white text-xs rounded-t-md">
                    {project.images.length} photos
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                </div>
              </div>
            ))}
            </div>
        )}
        
        {/* CTA Banner */}
        <div className="mt-16 bg-[#9B8F4B]/10 p-8 rounded-lg text-center">
          <h3 className="font-script text-3xl mb-4 text-[#9B8F4B] font-light tracking-wide">
            Love what you see?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Let's create your own beautiful memories together. Get in touch to discuss your photography needs.
          </p>
          <Link to="/contact">
            <Button 
              className="bg-[#9B8F4B] hover:bg-[#867A40] text-white px-8 py-6 h-auto rounded-md transition-transform hover:scale-105"
            >
              Book a Session
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Project Images Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl p-0 bg-white border-none rounded-md overflow-hidden">
          {selectedProjectIndex !== null && (
            <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
              {/* Main image section */}
              <div className="relative w-full md:w-3/4 bg-black flex items-center justify-center">
                <img 
                  src={`${filteredProjects[selectedProjectIndex].images[currentImageIndex].src}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`}
                  alt={filteredProjects[selectedProjectIndex].images[currentImageIndex].alt}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
                
                {/* Navigation arrows */}
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-black/70 transition-all hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center z-10 hover:bg-black/70 transition-all hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
                
                {/* Image counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {filteredProjects[selectedProjectIndex].images.length}
                </div>

                {/* Mobile close button (only visible on small screens) */}
                <button 
                  className="md:hidden absolute top-2 right-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>
              
              {/* Sidebar with thumbnails and info */}
              <div className="w-full md:w-1/4 p-4 md:p-6 overflow-y-auto bg-white flex flex-col md:min-h-[85vh]">
                <button 
                  className="hidden md:flex absolute top-2 right-2 bg-black/10 hover:bg-black/20 text-black w-8 h-8 rounded-full items-center justify-center"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
                
                <h2 className="text-xl font-medium mb-2">{filteredProjects[selectedProjectIndex].title}</h2>
                <p className="text-gray-600 text-sm mb-4">{filteredProjects[selectedProjectIndex].description}</p>
                
                <div className="mb-4 inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs">
                  {filteredProjects[selectedProjectIndex].category}
                </div>
                
                <h3 className="text-sm font-medium mb-2">All Photos</h3>
                <div className="grid grid-cols-3 sm:grid-cols-2 gap-2 mb-6">
                  {filteredProjects[selectedProjectIndex].images.map((image, idx) => (
                    <div 
                      key={idx} 
                      className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200 ${currentImageIndex === idx ? 'border-[#9B8F4B] scale-105' : 'border-transparent'}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      <img 
                        src={`${image.src}?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80`} 
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* CTA in modal */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link to="/contact" onClick={() => setIsModalOpen(false)}>
                    <Button 
                      className="w-full bg-[#9B8F4B] hover:bg-[#867A40] text-white transition-colors"
                    >
                      Inquire About This Style
                    </Button>
                  </Link>
                </div>
              </div>
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