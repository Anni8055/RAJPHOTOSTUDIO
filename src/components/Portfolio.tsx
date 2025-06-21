import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Portfolio = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1506268452458-bfb3757ed859",
      alt: "City lights at night",
      caption: "European architecture"
    },
    {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
      alt: "Wedding chairs on grass",
      caption: "Couple in car"
    },
    {
      src: "https://images.unsplash.com/photo-1504438190342-5951e134ffee",
      alt: "Children on bench",
      caption: ""
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
      alt: "Couple at sunset",
      caption: ""
    },
    {
      src: "https://images.unsplash.com/photo-1544148103-0773bf10d330",
      alt: "Bride with veil",
      caption: ""
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % images.length;
          const scrollAmount = scrollContainerRef.current?.clientWidth || 0;
          
          // If we're at the end, quickly scroll back to start
          if (nextIndex === 0) {
            scrollContainerRef.current.scrollTo({
              left: 0,
              behavior: 'auto'
            });
          } else {
            // Otherwise, smooth scroll to the next item
            scrollContainerRef.current?.scrollTo({
              left: nextIndex * (scrollAmount / 3),
              behavior: 'smooth'
            });
          }
          
          return nextIndex;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return () => {
      if (portfolioRef.current) {
        observer.unobserve(portfolioRef.current);
      }
    };
  }, []);

  const openImageModal = (src: string) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  const navigateToPortfolio = () => {
    navigate('/portfolio');
  };

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth || 0;
      scrollContainerRef.current.scrollTo({
        left: index * (scrollAmount / 3),
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  return (
    <section className="py-16 bg-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
            SIGNATURE WORK
          </p>
          <h2 className="font-script text-5xl text-black mb-10 font-light tracking-wide">
            Portfolio
          </h2>
        </div>
        
        <div 
          ref={portfolioRef}
          className="opacity-0 transition-opacity duration-1000"
        >
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-hidden scroll-smooth"
            >
              {images.map((image, index) => (
                <div 
                  key={index}
                  className="relative h-80 min-w-[33.333%] flex-shrink-0 px-2 overflow-hidden group cursor-pointer"
                  onClick={() => openImageModal(`${image.src}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`)}
                >
                  <img 
                    src={`${image.src}?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 p-3 text-[#9B8F4B]">
                      {image.caption}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
            
            <button 
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-off-white/80 hover:bg-off-white w-8 h-8 rounded-full flex items-center justify-center z-10"
              onClick={() => scrollTo((currentIndex - 1 + images.length) % images.length)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button 
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-off-white/80 hover:bg-off-white w-8 h-8 rounded-full flex items-center justify-center z-10"
              onClick={() => scrollTo((currentIndex + 1) % images.length)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-[#9B8F4B]' : 'bg-gray-300'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              className="border-[#9B8F4B] text-[#9B8F4B] hover:bg-[#9B8F4B] hover:text-white px-8 py-2 h-auto font-medium"
              onClick={navigateToPortfolio}
            >
              SEE MY PORTFOLIO
            </Button>
          </div>
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
    </section>
  );
};

export default Portfolio;
