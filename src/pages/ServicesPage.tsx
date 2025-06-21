import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-off-white">
      <Header />
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="font-script text-4xl md:text-6xl text-[#9B8F4B] mb-6 font-light tracking-wide">
            Our Services
          </h1>
          <div className="w-24 h-0.5 bg-[#9B8F4B] mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our full range of professional photography services. From wedding photography to portrait sessions,
            we offer customized packages to meet your unique needs and preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-off-white shadow-lg rounded-lg overflow-hidden">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Wedding Photography</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Full-day coverage capturing all the special moments of your wedding day.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-off-white shadow-lg rounded-lg overflow-hidden">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1594736797933-d0d5b5dc1bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Pre-Wedding Sessions</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Beautiful engagement shoots to celebrate your love before the big day.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-off-white shadow-lg rounded-lg overflow-hidden">
            <div 
              className="h-64 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
              }}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3">Wedding Photography</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Full-day coverage capturing all the special moments of your wedding day.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage; 