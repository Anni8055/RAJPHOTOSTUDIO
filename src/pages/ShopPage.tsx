import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const ShopPage = () => {
  return (
    <>
      <Helmet>
        <title>Shop | RAJ PHOTO STUDIO</title>
        <meta name="description" content="Shop photography prints, albums, and merchandise from RAJ PHOTO STUDIO." />
      </Helmet>
      
      <Header />
      
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Shop</h1>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg mb-6">
              Our online shop is coming soon! 
            </p>
            <p className="text-lg mb-6">
              We'll be offering fine art prints, custom photo albums, and more.
            </p>
            <p className="text-lg">
              Check back soon or contact us for more information about available products.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ShopPage; 