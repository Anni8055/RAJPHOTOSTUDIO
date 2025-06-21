const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://rajphotostudio.com';

// Static routes that should be included in the sitemap
const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    url: '/services',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    url: '/portfolio',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    url: '/blog',
    changefreq: 'weekly',
    priority: 0.7,
  }
];

// Generate sitemap XML
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add each route to the sitemap
  routes.forEach(route => {
    xmlContent += `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>
`;
  });

  xmlContent += `</urlset>`;
  
  // Ensure the scripts directory exists
  const outputDir = path.join(__dirname, '../public');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the sitemap file
  const outputPath = path.join(outputDir, 'sitemap.xml');
  fs.writeFileSync(outputPath, xmlContent);
  
  console.log(`Sitemap generated at ${outputPath}`);
}

// Execute the function
generateSitemap(); 