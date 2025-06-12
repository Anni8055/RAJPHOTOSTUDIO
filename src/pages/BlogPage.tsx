import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog | RAJ PHOTO STUDIO</title>
        <meta name="description" content="Read the latest wedding photography tips, stories, and insights from RAJ PHOTO STUDIO." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Blog</h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6 text-center">
              Our blog is currently under development. 
            </p>
            <p className="text-lg mb-6 text-center">
              Soon, we'll be sharing wedding photography tips, behind-the-scenes content, 
              and featured weddings from our portfolio.
            </p>
            <p className="text-lg text-center">
              Check back soon for updates!
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default BlogPage; 