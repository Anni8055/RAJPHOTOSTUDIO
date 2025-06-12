import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { memo } from "react";

// Optimize SVG icons by memoizing them
const SocialIcons = memo(() => {
  const icons = [
    { 
      name: "Instagram", 
      href: "#",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> 
    },
    { 
      name: "Facebook", 
      href: "#",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg> 
    },
    { 
      name: "YouTube", 
      href: "#",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg> 
    },
    { 
      name: "Pinterest", 
      href: "#",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg> 
    },
    { 
      name: "Behance", 
      href: "#",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/></svg> 
    }
  ];

  return (
    <div className="flex space-x-4 pt-4">
      {icons.map((social, index) => (
        <a 
          key={index}
          href={social.href}
          aria-label={social.name}
          className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm hover:bg-gray-800 transition-colors cursor-pointer"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
});

SocialIcons.displayName = "SocialIcons";

// Optimize navigation links
const NavLinks = memo(() => {
  const links = [
    { name: "HOME", href: "/" },
    { name: "ABOUT ME", href: "/about" }, 
    { name: "SERVICES", href: "/services" },
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "SHOP", href: "/shop" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT", href: "/contact" }
  ];

  return (
    <nav className="space-y-3">
      {links.map((link, index) => (
        <div key={index}>
          <a 
            href={link.href} 
            className="text-gray-600 hover:text-black transition-colors block"
          >
            {link.name}
          </a>
        </div>
      ))}
    </nav>
  );
});

NavLinks.displayName = "NavLinks";

// Optimize gallery images
const ImageGallery = memo(() => {
  // Optimized image data with proper alt text and loading attributes
  const galleryImages = [
    {
      id: '1519741497674-611481863552',
      alt: "Decorative pendant lights",
      type: "image"
    },
    {
      id: '1583939003579-730e3918a45a',
      alt: "Wedding couple portrait",
      type: "shop"
    },
    {
      id: '1537633552985-df8429e8048b',
      alt: "Photographer with camera",
      type: "image"
    },
    {
      id: '1606216794074-735e91aa2c92',
      alt: "Portrait photography",
      type: "shop"
    },
    {
      id: '1522673607200-164d1b6ce486',
      alt: "Beach wedding setup",
      type: "image"
    },
    {
      id: '1594736797933-d0d5b5dc1bbc',
      alt: "Wedding details",
      type: "shop"
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-16">
      {galleryImages.map((image, index) => (
        <div 
          key={index}
          className="aspect-square bg-cover bg-center relative group cursor-pointer"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-${image.id}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80)`
          }}
        >
          {/* Hover overlay with icon */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
            <div className="w-10 h-10 bg-white rounded-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {image.type === "image" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

ImageGallery.displayName = "ImageGallery";

const Footer = () => {
  // Contact information
  const contactInfo = {
    email: "info@rajphotostudio.com",
    phone: "+91 123 456 789",
    location: "INDIA",
    booking: "Now booking 2024/25"
  };

  return (
    <footer className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header with CONTACTS text */}
        <div className="relative text-center mb-12 md:mb-16 overflow-hidden">
          {/* Large "CONTACTS" background text */}
          <h2 className="text-7xl sm:text-8xl md:text-9xl font-bold text-[#f8f8f8] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
            CONTACTS
          </h2>
          
          {/* Script "Contacts" overlay text */}
          <h3 className="font-script text-4xl md:text-5xl text-black relative z-10 py-4">
            Contacts
          </h3>
        </div>
        
        {/* Main content grid */}
        <div className="grid md:grid-cols-3 gap-10 md:gap-16 lg:gap-20">
          {/* Left Column - GET IN TOUCH */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-wider text-black font-medium border-b border-gray-300 pb-2 inline-block">
              GET IN TOUCH
            </h3>
            
            <div className="space-y-2 text-gray-600">
              <p className="font-medium">E-mail</p>
              <p>{contactInfo.email}</p>
              
              <p className="font-medium mt-4">Phone</p>
              <p>{contactInfo.phone}</p>
            </div>
            
            {/* Social icons component */}
            <SocialIcons />
            
            <div className="pt-2 space-y-1 text-gray-600">
              <p className="font-medium">{contactInfo.location}</p>
              <p>{contactInfo.booking}</p>
            </div>
          </div>
          
          {/* Middle Column - Navigation Links */}
          <div className="space-y-4 flex flex-col justify-start">
            <NavLinks />
          </div>
          
          {/* Right Column - Contact Form */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-wider text-black font-medium border-b border-gray-300 pb-2 inline-block">
              CONTACT ME BELOW
            </h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <Input 
                  placeholder="NAME *"
                  aria-label="Name"
                  required
                  className="bg-transparent border-b border-t-0 border-l-0 border-r-0 border-gray-300 rounded-none px-0 focus:border-black focus:ring-0"
                />
              </div>
              <div>
                <Input 
                  placeholder="EMAIL *"
                  type="email"
                  aria-label="Email"
                  required
                  className="bg-transparent border-b border-t-0 border-l-0 border-r-0 border-gray-300 rounded-none px-0 focus:border-black focus:ring-0"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#deb887] hover:bg-[#c9a677] text-white rounded-none py-6 h-auto"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
        
        {/* Image Gallery */}
        <ImageGallery />
        
        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 mt-12 pt-8">
          © {new Date().getFullYear()} by RAJ PHOTO STUDIO. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
