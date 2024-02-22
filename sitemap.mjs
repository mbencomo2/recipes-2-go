import fs from 'fs';
import { SitemapStream, streamToPromise } from 'sitemap';

// Get all your website's routes
const routes = [
  '/',
  '/about',
  '/faq',
  '/login',
  '/register',
  '/legal/terms-and-conditions',
  '/legal/privacy',
  '/legal/cookies',
  '/dashboard',
];

// Create a sitemap stream
const sitemapStream = new SitemapStream({
  hostname: 'https://recipes2go.verce.app',
});

// Write each route to the sitemap stream
routes.forEach((route) => {
  sitemapStream.write({ url: route, changefreq: 'monthly', priority: 0.5 });
});

// End the stream
sitemapStream.end();

// Convert the stream to a string
streamToPromise(sitemapStream).then((sitemapXML) => {
  // Write the sitemap to a file
  fs.writeFileSync('./public/sitemap.xml', sitemapXML);
});
