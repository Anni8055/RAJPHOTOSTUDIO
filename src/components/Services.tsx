import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  
  const serviceButtons = [
    "WEDDING",
    "PRE-WEDDING",
    "ENGAGEMENT",
    "PORTRAIT"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === leftCardRef.current) {
              entry.target.classList.add("animate-bounce-left");
            } else if (entry.target === rightCardRef.current) {
              entry.target.classList.add("animate-bounce-right");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (leftCardRef.current) {
      observer.observe(leftCardRef.current);
    }
    if (rightCardRef.current) {
      observer.observe(rightCardRef.current);
    }

    return () => {
      if (leftCardRef.current) {
        observer.unobserve(leftCardRef.current);
      }
      if (rightCardRef.current) {
        observer.unobserve(rightCardRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Intro Section */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
            WELCOME TO
          </p>
          <h2 className="font-script text-5xl text-black mb-6">
            Timeless Moments, Unforgettable Memories
          </h2>
          <div className="relative max-w-3xl mx-auto">
            <p className="text-gray-600 mb-16">
              I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy.
            </p>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-[#333] text-white px-4 py-1 text-sm">
                Dreamy Frames
              </div>
            </div>
          </div>
        </div>

        {/* Services Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Card */}
          <div 
            ref={leftCardRef}
            className="opacity-0 transform translate-x-[-100px] transition-all duration-1000 ease-out"
          >
            <div className="relative border border-gray-200 rounded-sm overflow-hidden h-full">
              <img 
                src="https://images.unsplash.com/photo-1546173159-315724a31696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Wedding cake" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/80 p-3 text-center">
                <div className="text-[#9B8F4B] text-lg font-medium">
                  Wedding cake
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle Services Section */}
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider text-gray-600 mb-2">
              EXPLORE MY
            </p>
            <h3 className="font-script text-4xl text-black mb-8">
              Services
            </h3>
            
            <div className="space-y-3">
              <button className="w-full py-3 bg-[#DDBEA9] text-white font-medium tracking-wider hover:opacity-90 transition-opacity">
                WEDDING
              </button>
              <button className="w-full py-3 bg-[#DDBEA9] text-white font-medium tracking-wider hover:opacity-90 transition-opacity">
                PRE-WEDDING
              </button>
              <button className="w-full py-3 bg-[#DDBEA9] text-white font-medium tracking-wider hover:opacity-90 transition-opacity">
                ENGAGEMENT
              </button>
              <button className="w-full py-3 bg-[#DDBEA9] text-white font-medium tracking-wider hover:opacity-90 transition-opacity">
                PORTRAIT
              </button>
            </div>
            
            <a 
              href="/services"
              className="inline-block mt-8 text-black font-medium hover:underline tracking-wider uppercase"
              onClick={(e) => {
                e.preventDefault();
                navigate('/services');
              }}
            >
              VIEW ALL SERVICES
            </a>
          </div>
          
          {/* Right Card */}
          <div 
            ref={rightCardRef}
            className="opacity-0 transform translate-x-[100px] transition-all duration-1000 ease-out"
          >
            <div className="relative border border-gray-200 rounded-sm overflow-hidden h-full">
              <img 
                src="https://images.unsplash.com/photo-1469406396016-013bfae5d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Children on bench" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
