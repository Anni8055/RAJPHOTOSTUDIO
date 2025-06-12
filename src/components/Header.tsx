import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Navigation links
  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT ME", path: "/about" },
    { name: "SERVICES", path: "/services" },
    { name: "PORTFOLIO", path: "/portfolio" },
    { name: "SHOP", path: "/shop" },
    { name: "BLOG", path: "/blog" },
    { name: "CONTACT", path: "/contact" }
  ];

  // Social media links
  const socialLinks = [
    { name: "Instagram", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
    { name: "Facebook", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg> },
    { name: "YouTube", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg> }
  ];

  // Toggle menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Close menu on navigation
  const handleNavigation = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;
      
      setPrevScrollPos(currentScrollPos);
      setVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset overflow when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, [prevScrollPos]);

  return (
    <>
      <header 
        className={`fixed top-0 w-full bg-white z-50 transition-transform duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex items-center text-[#D2B48C]">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="ml-1 text-sm">0</span>
            </div>
          </div>

          <div className="ml-4">
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white px-5 py-2 h-auto text-sm">
              BOOK NOW
            </Button>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className="text-center cursor-pointer group transition-transform hover:scale-105">
              <h1 className="font-script text-2xl md:text-3xl text-[#9B8F4B]">
                RAJ PHOTO STUDIO
              </h1>
            </Link>
          </div>

          {/* Hamburger menu button */}
          <button 
            onClick={toggleMenu}
            className="flex flex-col justify-center h-8 space-y-1.5 ml-auto cursor-pointer z-50"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className={`w-8 h-0.5 bg-[#9B8F4B] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-8 h-0.5 bg-[#9B8F4B] transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
            <div className={`w-8 h-0.5 bg-[#9B8F4B] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dialog */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#f5f0ed] z-40 flex flex-col"
          >
            <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
              <div className="w-full max-w-md mx-auto">
                {/* Logo */}
                <div className="mb-12 text-center">
                  <h2 className="font-script text-4xl text-black mb-2">RAJ PHOTO STUDIO</h2>
                  <p className="text-sm uppercase tracking-widest">WEDDING PHOTOGRAPHER</p>
                  <div className="w-24 h-0.5 bg-black mx-auto mt-4"></div>
                </div>
                
                {/* Navigation Links */}
                <nav className="mb-12">
                  <ul className="space-y-6 text-center">
                    {navLinks.map((link, index) => (
                      <motion.li 
                        key={link.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link 
                          to={link.path} 
                          className="text-lg font-medium text-gray-800 hover:text-black block py-2"
                          onClick={handleNavigation}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                
                {/* Book Now Button */}
                <div className="mb-12 text-center">
                  <Link to="/contact">
                    <Button 
                      className="bg-[#deb887] hover:bg-[#c9a677] text-white px-12 py-6 rounded-none h-auto text-lg"
                      onClick={handleNavigation}
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
                
                {/* Social Media */}
                <div className="flex justify-center space-x-6">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href="#"
                      aria-label={social.name}
                      className="text-black hover:text-[#9B8F4B] transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
                
                {/* Gallery Preview */}
                <div className="grid grid-cols-3 gap-2 mt-12">
                  {[...Array(3)].map((_, index) => (
                    <motion.div
                      key={index}
                      className="aspect-square bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-${
                          [
                            '1519741497674-611481863552',
                            '1583939003579-730e3918a45a', 
                            '1537633552985-df8429e8048b'
                          ][index]
                        }?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80)`
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 text-center text-xs text-gray-500">
              © {new Date().getFullYear()} by RAJ PHOTO STUDIO. All rights reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
