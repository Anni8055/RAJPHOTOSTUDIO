import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          
          if (entry.isIntersecting && textRef.current) {
            textRef.current.classList.add("animate-text-reveal");
          }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Full-width background image container */}
      <div className="relative w-full h-[700px] md:h-[800px]">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1537907510278-a5a2cd67da42?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        />
        
        {/* Left side image */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 md:w-2/5">
          <img 
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Wedding couple" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Right side image - added for symmetry */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 md:w-2/5">
          <img 
            src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Wedding couple" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* RAJ PHOTO STUDIO tag */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-[#333] text-white px-3 py-1 text-xs uppercase tracking-wider">
            RAJ PHOTO STUDIO
          </div>
        </div>
        
        {/* Content container for card with relative positioning */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Container for text and card with relative positioning */}
          <div className="relative max-w-md w-full mx-auto z-20">
            {/* Animated "LET'S START" text at the top */}
            <h2 
              ref={textRef}
              className="text-6xl md:text-7xl font-bold text-[#9B8F4B] whitespace-nowrap z-20 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                opacity: isVisible ? 1 : 0,
                transition: "opacity 1s ease-in-out"
              }}
            >
              LET'S START
            </h2>
            
            {/* White card with top padding for text */}
            <div 
              className={`bg-off-white p-8 md:p-10 shadow-xl w-full transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
              }`}
              style={{
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
            >
              <div className="pt-8"></div> {/* Empty space at the top */}
              <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-black">
                READY TO MAKE MAGIC TOGETHER?
              </h3>
              
              <p className="text-center text-gray-600 mb-8">
                I'm a paragraph. Click here to add your own text and edit me. It's easy. I'm a paragraph. Click here to add your own text and edit me.
              </p>
              
              <Button 
                className="w-full bg-[#deb887] hover:bg-[#c9a677] text-white py-6 rounded-none"
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
