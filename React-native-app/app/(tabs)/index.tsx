import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl, Dimensions } from 'react-native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NewsCard } from '@/components/NewsCard';
import Header from '@/components/Header';
import { fetchNewsArticles } from '@/services/newsService';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import { Article } from '@/types';
import EmptyState from '@/components/EmptyState';
import { useFocusEffect } from 'expo-router';

export default function HomeScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const loadArticles = async () => {
    try {
      setLoading(true);
      const newsArticles = await fetchNewsArticles();
      setArticles(newsArticles);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadArticles();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadArticles();
    }, [])
  );

  // Setup interval to refresh articles
  useEffect(() => {
    // Initial load
    loadArticles();

    // Set up interval for refreshing (every 30 minutes)
    const intervalId = setInterval(() => {
      loadArticles();
    }, 30 * 60 * 1000); // 30 minutes

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />
      
      {loading && articles.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>
            માહિતી મેળવી રહ્યા છીએ...
          </Text>
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 100).springify()}>
              <NewsCard article={item} />
            </Animated.View>
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<EmptyState />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Hind-Medium',
    fontSize: 16,
  },
});