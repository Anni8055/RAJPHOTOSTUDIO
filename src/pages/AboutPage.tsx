import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Me | RAJ PHOTO STUDIO</title>
        <meta name="description" content="Learn more about RAJ PHOTO STUDIO and our wedding photography services." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">About Me</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6">
              Welcome to RAJ PHOTO STUDIO. I'm passionate about capturing the most precious moments 
              of your wedding day with an artistic and timeless approach.
            </p>
            <p className="text-lg mb-6">
              With years of experience in wedding photography, I specialize in creating elegant, 
              emotional images that tell your unique love story.
            </p>
            <p className="text-lg">
              This page is under construction. Check back soon for more information about my journey, 
              photography style, and approach to wedding photography.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default AboutPage; 