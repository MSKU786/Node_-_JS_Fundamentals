import Firecrawl from '@mendable/firecrawl-js';
import dotenv from 'dotenv';
dotenv.config();

const firecrawl = new Firecrawl({ apiKey: process.env.FIRE_CRAWL_API_KEY });

const crawlData = async (
  websiteLink = 'https://zerodha.tech/blog/scaling-with-common-sense/'
) => {
  // Crawl with scrape options
  const doc = await firecrawl.scrape(websiteLink, {
    formats: ['markdown', 'html'],
  });

  return doc;
};
