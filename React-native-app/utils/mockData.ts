import { Article } from '@/types';

// Sample category data for mock articles
const categories = [
  'national',
  'international',
  'business',
  'sports',
  'entertainment',
  'technology',
];

// Sample sources
const sources = ['દિવ્ય ભાસ્કર', 'સંદેશ'];

// Sample Gujarati headlines
const sampleHeadlines = [
  'ગુજરાતમાં ભારે વરસાદની આગાહી, સૌરાષ્ટ્રમાં રેડ એલર્ટ',
  'વડાપ્રધાન મોદીએ ગુજરાત પ્રવાસ દરમિયાન નવી યોજનાઓની જાહેરાત કરી',
  'અમદાવાદમાં નવા મેટ્રો રૂટનું ઉદ્ઘાટન આજે થશે',
  'ક્રિકેટ વર્લ્ડ કપ 2023: ભારતે પાકિસ્તાનને હરાવ્યું',
  'ગુજરાતી ફિલ્મ ઉદ્યોગમાં નવા યુવા કલાકારોનો ઉદય',
  'સ્માર્ટફોન બનાવતી કંપનીએ ગુજરાતમાં નવો પ્લાન્ટ શરૂ કર્યો',
  'રાજ્યમાં કોરોનાના નવા કેસોમાં ઘટાડો, સરકારે રાહતનો શ્વાસ લીધો',
  'સુરતની ડાયમંડ ઇન્ડસ્ટ્રીમાં નવી તેજી, નિકાસમાં વધારો',
];

// Sample summaries
const sampleSummaries = [
  'હવામાન વિભાગે ગુજરાતના અલગ અલગ વિસ્તારોમાં ભારે વરસાદની આગાહી કરી છે. ખાસ કરીને સૌરાષ્ટ્ર વિસ્તારમાં રેડ એલર્ટ જાહેર કરવામાં આવ્યું છે.',
  'વડાપ્રધાન નરેન્દ્ર મોદીએ ગુજરાત પ્રવાસ દરમિયાન આરોગ્ય અને શિક્ષણ ક્ષેત્રે નવી યોજનાઓની જાહેરાત કરી. આ યોજનાઓથી રાજ્યના લાખો લોકોને લાભ થશે.',
  'અમદાવાદમાં મેટ્રોના નવા રૂટનું ઉદ્ઘાટન આજે કરવામાં આવશે. આ રૂટ શહેરના પૂર્વ અને પશ્ચિમ વિસ્તારને જોડશે.',
  'ભારતીય ક્રિકેટ ટીમે પાકિસ્તાન સામે રોમાંચક મેચમાં વિજય મેળવ્યો. વિરાટ કોહલીએ શાનદાર બેટિંગ કરી.',
  'ગુજરાતી સિનેમા ઉદ્યોગમાં નવા યુવા કલાકારોનો ઉદય થઈ રહ્યો છે. ગુજરાતી ફિલ્મોને હવે રાષ્ટ્રીય સ્તરે પણ પ્રશંસા મળી રહી છે.',
  'સ્માર્ટફોન બનાવતી એક મોટી કંપનીએ ગુજરાતમાં નવો મેન્યુફેક્ચરિંગ પ્લાન્ટ શરૂ કર્યો છે. આ પ્લાન્ટથી હજારો લોકોને રોજગારી મળશે.',
  'ગુજરાતમાં કોરોનાના નવા કેસોમાં ઘટાડો નોંધાયો છે. સરકારે કહ્યું કે પરિસ્થિતિ નિયંત્રણમાં છે પરંતુ સાવચેતી જરૂરી છે.',
  'સુરતની ડાયમંડ ઇન્ડસ્ટ્રીમાં છેલ્લા કેટલાક મહિનાઓમાં નવી તેજી આવી છે. હીરાની નિકાસમાં નોંધપાત્ર વધારો થયો છે.',
];

// Sample image URLs from Pexels (free stock photos)
const sampleImageUrls = [
  'https://images.pexels.com/photos/3941855/pexels-photo-3941855.jpeg',
  'https://images.pexels.com/photos/3944377/pexels-photo-3944377.jpeg',
  'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
  'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
  'https://images.pexels.com/photos/2343466/pexels-photo-2343466.jpeg',
  'https://images.pexels.com/photos/8885024/pexels-photo-8885024.jpeg',
  'https://images.pexels.com/photos/163016/temple-india-architecture-religion-163016.jpeg',
  'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg',
];

// Function to generate a random date within the last week
const getRandomRecentDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 7); // Random day within the last week
  const hoursAgo = Math.floor(Math.random() * 24); // Random hour
  const minutesAgo = Math.floor(Math.random() * 60); // Random minute
  
  now.setDate(now.getDate() - daysAgo);
  now.setHours(now.getHours() - hoursAgo);
  now.setMinutes(now.getMinutes() - minutesAgo);
  
  return now.toISOString();
};

// Function to generate random mock news articles
export const generateMockArticles = (count: number): Article[] => {
  const articles: Article[] = [];
  
  for (let i = 0; i < count; i++) {
    const headlineIndex = Math.floor(Math.random() * sampleHeadlines.length);
    const summaryIndex = Math.floor(Math.random() * sampleSummaries.length);
    const imageIndex = Math.floor(Math.random() * sampleImageUrls.length);
    const categoryIndex = Math.floor(Math.random() * categories.length);
    const sourceIndex = Math.floor(Math.random() * sources.length);
    
    articles.push({
      id: `article-${Date.now()}-${i}`,
      title: sampleHeadlines[headlineIndex],
      summary: sampleSummaries[summaryIndex],
      imageUrl: sampleImageUrls[imageIndex],
      url: 'https://www.divyabhaskar.co.in',
      publishedAt: getRandomRecentDate(),
      source: sources[sourceIndex],
      category: categories[categoryIndex],
    });
  }
  
  // Sort by publishedAt date (newest first)
  return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};