import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * SEOHead component for adding metadata and optimizing for search engines
 */
const SEOHead = ({
  title = 'RAJ Photo Studio | Wedding Photography',
  description = 'Professional wedding photography services in Delhi capturing your special moments with elegance and creativity.',
  keywords = 'wedding photography, wedding photographer, Delhi, professional photographer, bridal photos',
  image = '/assets/images/seo-default-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://rajphotostudio.com',
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  // Ensure the image URL is absolute
  const absoluteImageUrl = image.startsWith('http') 
    ? image 
    : `${window.location.origin}${image}`;
    
  const siteTitle = title.includes('RAJ Photo Studio') 
    ? title 
    : `${title} | RAJ Photo Studio`;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImageUrl} />
      
      {/* Article specific tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      
      {/* Schema.org structured data for local business */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "RAJ Photo Studio",
            "image": "${absoluteImageUrl}",
            "url": "https://rajphotostudio.com",
            "telephone": "+91-1234567890",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Photography Lane",
              "addressLocality": "Delhi",
              "postalCode": "110001",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 28.6139,
              "longitude": 77.2090
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "10:00",
              "closes": "18:00"
            },
            "sameAs": [
              "https://www.facebook.com/rajphotostudio",
              "https://www.instagram.com/rajphotostudio"
            ]
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEOHead; 