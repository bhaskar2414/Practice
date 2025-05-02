import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '@/types';
import { generateMockArticles } from '@/utils/mockData';

const STORAGE_KEY = 'gujarati_pulse_articles';
const MAX_ARTICLES = 100;

// Function to fetch articles from storage or generate mock data
export const fetchNewsArticles = async (): Promise<Article[]> => {
  try {
    // Try to get articles from AsyncStorage
    const storedArticles = await AsyncStorage.getItem(STORAGE_KEY);
    
    if (storedArticles) {
      return JSON.parse(storedArticles);
    } else {
      // If no stored articles, generate mock data
      const mockArticles = generateMockArticles(20);
      // Store the mock articles
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockArticles));
      return mockArticles;
    }
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

// Function to add new articles and maintain the limit of 100
export const updateArticles = async (newArticles: Article[]): Promise<void> => {
  try {
    // Get existing articles
    const storedArticles = await AsyncStorage.getItem(STORAGE_KEY);
    const existingArticles: Article[] = storedArticles ? JSON.parse(storedArticles) : [];
    
    // Create a Set of existing article IDs for efficient lookup
    const existingIds = new Set(existingArticles.map(article => article.id));
    
    // Filter out articles that already exist
    const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.id));
    
    // Combine new articles with existing ones, and limit to MAX_ARTICLES
    const updatedArticles = [...uniqueNewArticles, ...existingArticles].slice(0, MAX_ARTICLES);
    
    // Save the updated articles
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
  } catch (error) {
    console.error('Error updating articles:', error);
  }
};

// Function to get articles by category
export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  try {
    const articles = await fetchNewsArticles();
    
    if (category === 'all') {
      return articles;
    }
    
    return articles.filter(article => article.category === category);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
};