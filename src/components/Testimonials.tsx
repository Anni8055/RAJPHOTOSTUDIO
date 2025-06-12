import { useEffect, useRef, useState } from "react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Calculate max scroll width
  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;
      setMaxScroll(scrollWidth - clientWidth);
    }
  }, []);

  // Auto scroll functionality
  useEffect(() => {
    let animationId: number;
    let direction = 1;
    let speed = 0.5;
    let lastTimestamp: number;

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      if (scrollContainerRef.current && isVisible) {
        // Update scroll position
        let newPosition = scrollPosition + (speed * direction * elapsed / 16);
        
        // Reverse direction if reaching the end
        if (newPosition >= maxScroll) {
          direction = -1;
          newPosition = maxScroll;
        } else if (newPosition <= 0) {
          direction = 1;
          newPosition = 0;
        }
        
        // Apply scroll
        scrollContainerRef.current.scrollLeft = newPosition;
        setScrollPosition(newPosition);
      }
      
      lastTimestamp = timestamp;
      animationId = requestAnimationFrame(animate);
    };
    
    if (isVisible && maxScroll > 0) {
      animationId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isVisible, maxScroll, scrollPosition]);

  const testimonials = [
    {
      name: "Alan + Sara",
      location: "ITALY, VENICE",
      text: "Absolutely thrilled with our wedding photos! The photographer beautifully captured every moment and emotion. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Michael + Emily",
      location: "FRANCE, PARIS", 
      text: "The photographer's attention to detail and creativity exceeded our expectations. The photos are breathtaking. Thank you!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "David + Jennifer",
      location: "GREECE, SANTORINI",
      text: "Our wedding photos are absolutely stunning! Every special moment was captured with such artistry and attention to detail.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      name: "Thomas + Rebecca",
      location: "SPAIN, BARCELONA",
      text: "We couldn't be happier with our wedding photos. The candid moments captured truly tell the story of our special day.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background image - removed whitish overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522673607200-164d1b6ce486?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          zIndex: -1
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0 bg-black opacity-50"
        style={{ zIndex: -1 }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="bg-[#333] text-white px-3 py-1 text-xs uppercase tracking-wider inline-block mb-4">
            RAJ PHOTO STUDIO
          </div>
          <h2 className="font-script text-5xl md:text-6xl text-white mb-8">
            Clients Love
          </h2>
        </div>
        
        {/* Scrolling testimonials container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-none shadow-lg flex-shrink-0 w-[400px] snap-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transitionDelay: `${index * 0.1}s`,
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-script text-xl text-black">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
