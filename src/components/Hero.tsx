const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-off-white">
      <div className="max-w-7xl mx-auto h-screen relative">
        <img
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
          alt="Beautiful Indian wedding"
          className="fixed h-full w-full max-w-7xl object-cover"
        />
        
        <div className="absolute top-0 left-0 m-4 z-10">
          <div className="bg-black/50 px-3 py-1 text-white text-xs">
            
          </div>
        </div>
        
        <div className="absolute bottom-16 right-0 z-10 text-right text-white pr-6 lg:pr-16">
          <h2 className="font-script text-4xl md:text-6xl lg:text-7xl mb-4 leading-tight font-light tracking-wide">
          Framing Love, Life & Legacy
          </h2>
          <p className="text-sm md:text-base uppercase tracking-wider">
          From the Heart of Delhi
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
