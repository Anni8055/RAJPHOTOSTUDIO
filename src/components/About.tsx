import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const About = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Animation effect for the heading with bounce
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add bounce animation class
            entry.target.classList.add("opacity-100", "animate-bounce-in");
            entry.target.classList.remove("opacity-0", "translate-y-10");
            
            // Remove animation after it completes
            setTimeout(() => {
              if (headingRef.current) {
                headingRef.current.classList.remove("animate-bounce-in");
              }
            }, 1500);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="relative">
          {/* Dreamy Frames tag */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-[#333] text-white px-3 py-1 text-xs uppercase tracking-wider">
              Dreamy Frames
            </div>
          </div>
          
          {/* Main image and overlay */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left side with overlapping images */}
            <div className="relative">
              {/* First image (beach setup) */}
              <div className="w-3/4 h-auto aspect-square overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Beach wedding setup" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Second image (photographer) that overlaps - replaced with lighter image */}
              <div className="absolute right-0 top-1/3 w-2/3 h-auto aspect-square overflow-hidden border-8 border-white shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Photographer with camera" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Right Content */}
            <div className="space-y-6">
              {/* Large "ABOUT ME" text with animation */}
              <h3 
                ref={headingRef}
                className="text-[120px] font-bold text-[#e6e0d8] leading-none opacity-0 translate-y-10 transition-all duration-1000 -mb-6"
              >
                ABOUT ME
              </h3>
              
              <h2 className="font-script text-4xl md:text-5xl text-black relative z-10">
                About me
              </h2>
              
              <div className="space-y-6 text-gray-600">
                <p>
                  I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy.
                </p>
                <p>
                  I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me. It's easy.
                </p>
              </div>
              
              <div className="text-right">
                <Button 
                  variant="link" 
                  className="text-black font-bold uppercase tracking-wider hover:underline p-0 h-auto"
                >
                  MORE ABOUT ME
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
