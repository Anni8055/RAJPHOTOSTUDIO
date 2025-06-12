import { useEffect, useRef, useState } from "react";

const WhyChooseMe = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation effect for the heading with 180-degree rotation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update visibility state
          setIsVisible(entry.isIntersecting);
          
          if (entry.isIntersecting) {
            if (headingRef.current) {
              headingRef.current.classList.add("opacity-100", "rotate-0");
              headingRef.current.classList.remove("opacity-0", "rotate-180", "translate-y-10");
            }
          } else {
            if (headingRef.current) {
              headingRef.current.classList.remove("opacity-100", "rotate-0");
              headingRef.current.classList.add("opacity-0", "rotate-180", "translate-y-10");
            }
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

  const reasons = [
    {
      number: "01",
      title: "Attention to Detail",
      description: "I capture every intricate detail to ensure nothing is overlooked in your wedding photographs."
    },
    {
      number: "02", 
      title: "Personalized Experience",
      description: "I tailor my approach to reflect your unique style and vision, making each image a personal reflection of your love story."
    },
    {
      number: "03",
      title: "Professionalism and Reliability",
      description: "With years of experience, I bring professionalism and reliability to ensure a seamless and stress-free photography experience."
    },
    {
      number: "04",
      title: "Creative Artistry",
      description: "I provide a creative and artistic perspective that goes beyond traditional poses, delivering unique and captivating wedding photos."
    },
    {
      number: "05",
      title: "Timeless Memories",
      description: "I create timeless images that evoke emotions, allowing you to cherish and relive the unforgettable moments of your special day."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Why Me Content */}
          <div className="space-y-8">
            <div className="relative">
              {/* Large "WHY ME?" text with 180-degree rotation animation */}
              <h2 
                ref={headingRef}
                className="text-7xl md:text-8xl font-bold text-[#d9d2c5] leading-none opacity-0 rotate-180 translate-y-10 transition-all duration-1500 origin-center"
              >
                WHY ME?
              </h2>
              
              {/* Stylish "Why me?" script overlay */}
              <h3 className="font-script text-4xl md:text-5xl text-black absolute top-1/2 left-0 transform -translate-y-1/2">
                Why me?
              </h3>
            </div>
            
            <div className="space-y-10 mt-16">
              {reasons.map((reason, index) => (
                <div 
                  key={index}
                  className={`flex gap-6 items-start transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <span className="text-3xl font-bold text-gray-300 flex-shrink-0">
                    {reason.number}
                  </span>
                  <div>
                    <h4 className="font-medium text-base text-black mb-1">
                      {reason.title}:
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Side - Wedding Photography Image */}
          <div className="h-full">
            <img 
              src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Wedding photography scene with bride and photographer" 
              className={`w-full h-full object-cover rounded-lg transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
