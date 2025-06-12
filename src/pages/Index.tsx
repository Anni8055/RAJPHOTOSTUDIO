import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import WhyChooseMe from "@/components/WhyChooseMe";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div className="relative z-10 bg-white max-w-7xl mx-auto">
        <Services />
        <Portfolio />
        <About />
        <WhyChooseMe />
        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
