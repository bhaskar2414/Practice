/**
 * GujaratiPulse News Scraper
 * 
 * This script scrapes Gujarati news from popular websites and
 * saves the data for use in the GujaratiPulse app.
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// Configuration
const NEWS_SOURCES = [
  {
    name: 'દિવ્ય ભાસ્કર',
    url: 'https://www.divyabhaskar.co.in/',
    selectors: {
      articles: '.list-news-dt',
      title: '.stry-hd-sml',
      summary: '.stry-dt-sml',
      link: 'a',
      image: 'img',
    }
  },
  {
    name: 'સંદેશ',
    url: 'https://sandesh.com/latest-news/',
    selectors: {
      articles: '.article-box',
      title: '.article-title',
      summary: '.article-summary',
      link: 'a',
      image: 'img',
    }
  }
];

// Path to store the scraped data
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'news.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Scrape news from a specific source
 * @param {Object} source - News source configuration
 * @returns {Promise<Array>} - Scraped articles
 */
async function scrapeNewsSource(source) {
  console.log(`Scraping ${source.name}...`);
  
  try {
    const response = await axios.get(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const articles = [];
    
    $(source.selectors.articles).each((index, element) => {
      if (index >= 20) return false; // Limit to 20 articles per source
      
      const $element = $(element);
      const title = $element.find(source.selectors.title).text().trim();
      const summary = $element.find(source.selectors.summary).text().trim();
      const link = $element.find(source.selectors.link).attr('href');
      
      // Handle relative URLs
      const url = link?.startsWith('http') ? link : `${new URL(source.url).origin}${link}`;
      
      // Extract image URL if available
      let imageUrl = null;
      const $img = $element.find(source.selectors.image);
      if ($img.length > 0) {
        imageUrl = $img.attr('src') || $img.attr('data-src');
      }
      
      // Only add articles with non-empty titles
      if (title) {
        articles.push({
          id: `${source.name}-${Date.now()}-${index}`,
          title,
          summary: summary || 'વધુ માહિતી માટે વાંચો...',
          url,
          imageUrl,
          source: source.name,
          publishedAt: new Date().toISOString(),
          category: determineCategory(title, summary)
        });
      }
    });
    
    console.log(`Found ${articles.length} articles from ${source.name}`);
    return articles;
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error.message);
    return [];
  }
}

/**
 * Simple category detection based on keywords in title and summary
 * @param {string} title - Article title
 * @param {string} summary - Article summary
 * @returns {string} - Determined category
 */
function determineCategory(title, summary) {
  const text = `${title} ${summary}`.toLowerCase();
  
  const categoryKeywords = {
    'national': ['ભારત', 'મોદી', 'સરકાર', 'રાષ્ટ્રીય', 'રાજ્ય', 'મંત્રી'],
    'international': ['વિદેશ', 'અમેરિકા', 'ચીન', 'આંતરરાષ્ટ્રીય', 'વિશ્વ'],
    'business': ['બિઝનેસ', 'અર્થતંત્ર', 'શેરબજાર', 'બેંક', 'ટેક્સ', 'વેપાર'],
    'sports': ['ક્રિકેટ', 'ફૂટબોલ', 'ખેલ', 'રમત', 'સ્પોર્ટ્સ'],
    'entertainment': ['ફિલ્મ', 'બોલિવૂડ', 'અભિનેતા', 'સિનેમા', 'મનોરંજન'],
    'technology': ['ટેક', 'સ્માર્ટફોન', 'ટેક્નોલોજી', 'ઇન્ટરનેટ', 'ડિજિટલ']
  };
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return category;
      }
    }
  }
  
  return 'national'; // Default category
}

/**
 * Main function to scrape all news sources
 */
async function scrapeAllNews() {
  console.log('Starting news scraping process...');
  
  try {
    // Read existing data if available
    let existingArticles = [];
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, 'utf8');
      existingArticles = JSON.parse(fileData);
    }
    
    // Scrape news from all sources
    const allScraperPromises = NEWS_SOURCES.map(source => scrapeNewsSource(source));
    const scrapedArticlesArrays = await Promise.all(allScraperPromises);
    
    // Flatten the array of arrays
    const newArticles = scrapedArticlesArrays.flat();
    
    // Combine new articles with existing ones (keeping newest first)
    const existingIds = new Set(existingArticles.map(article => article.id));
    const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.id));
    
    const allArticles = [...uniqueNewArticles, ...existingArticles];
    
    // Keep only the latest 100 articles
    const latestArticles = allArticles.slice(0, 100);
    
    // Write the updated articles to the data file
    fs.writeFileSync(DATA_FILE, JSON.stringify(latestArticles, null, 2));
    
    console.log(`Scraped ${newArticles.length} new articles. Total: ${latestArticles.length} articles.`);
    console.log('News scraping completed successfully!');
  } catch (error) {
    console.error('Error during news scraping:', error);
  }
}

// Run the scraper immediately
scrapeAllNews();

// Schedule to run every 30 minutes
setInterval(scrapeAllNews, 30 * 60 * 1000);

console.log('GujaratiPulse news scraper is running. Press Ctrl+C to stop.');