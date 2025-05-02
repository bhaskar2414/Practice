import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/Colors';
import { NewsCard } from '@/components/NewsCard';
import { getArticlesByCategory } from '@/services/newsService';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Article } from '@/types';

const categories = [
  { id: 'all', name: 'બધા', emoji: '📰' },
  { id: 'national', name: 'રાષ્ટ્રીય', emoji: '🇮🇳' },
  { id: 'international', name: 'આંતરરાષ્ટ્રીય', emoji: '🌍' },
  { id: 'business', name: 'બિઝનેસ', emoji: '💼' },
  { id: 'sports', name: 'રમતગમત', emoji: '🏏' },
  { id: 'entertainment', name: 'મનોરંજન', emoji: '🎬' },
  { id: 'technology', name: 'ટેકનોલોજી', emoji: '📱' },
];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [articles, setArticles] = useState<Article[]>([]);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  // Update articles when category changes
  useState(() => {
    const fetchArticles = async () => {
      const categoryArticles = await getArticlesByCategory(selectedCategory);
      setArticles(categoryArticles);
    };
    
    fetchArticles();
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>શ્રેણીઓ</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              { 
                backgroundColor: selectedCategory === category.id 
                  ? colors.primary 
                  : colors.card,
                borderColor: colors.border
              }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryEmoji}>{category.emoji}</Text>
            <Text 
              style={[
                styles.categoryText, 
                { color: selectedCategory === category.id 
                  ? '#FFFFFF' 
                  : colors.text 
                }
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View entering={FadeIn.duration(400)}>
            <NewsCard article={item} />
          </Animated.View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              આ શ્રેણીમાં કોઈ સમાચાર નથી
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Hind-Bold',
  },
  categoriesContainer: {
    maxHeight: 80,
  },
  categoriesContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  categoryText: {
    fontFamily: 'Hind-Medium',
    fontSize: 14,
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Hind-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});