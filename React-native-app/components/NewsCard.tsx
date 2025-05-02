import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Share, Dimensions } from 'react-native';
import { Share2, ExternalLink } from 'lucide-react-native';
import { Article } from '@/types';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { formatDistanceToNow } from 'date-fns';
import { gu } from 'date-fns/locale';
import { Linking } from 'react-native';

interface NewsCardProps {
  article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${article.title} - ${article.url}`,
      });
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };
  
  const openArticle = () => {
    if (article.url) {
      Linking.openURL(article.url);
    }
  };
  
  // Format the published time as "X minutes/hours/days ago" in Gujarati
  const formattedTime = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
    locale: gu,
  });

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {article.imageUrl && (
        <Image
          source={{ uri: article.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <View style={styles.sourceRow}>
          <Text style={[styles.source, { color: colors.primary }]}>
            {article.source}
          </Text>
          <Text style={[styles.time, { color: colors.textDim }]}>
            {formattedTime}
          </Text>
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>
          {article.title}
        </Text>
        
        <Text
          style={[styles.summary, { color: colors.textSecondary }]}
          numberOfLines={4}
        >
          {article.summary}
        </Text>
        
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.buttonBackground }]}
            onPress={openArticle}
          >
            <ExternalLink size={16} color={colors.buttonText} />
            <Text style={[styles.buttonText, { color: colors.buttonText }]}>
              વધુ વાંચો
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Share2 size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  sourceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  source: {
    fontFamily: 'Hind-Medium',
    fontSize: 14,
  },
  time: {
    fontFamily: 'Hind-Regular',
    fontSize: 12,
  },
  title: {
    fontFamily: 'Hind-Bold',
    fontSize: 18,
    marginBottom: 8,
    lineHeight: 24,
  },
  summary: {
    fontFamily: 'Hind-Regular',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Hind-Medium',
    fontSize: 14,
    marginLeft: 8,
  },
  shareButton: {
    padding: 8,
  },
});