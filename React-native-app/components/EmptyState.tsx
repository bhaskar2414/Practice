import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Newspaper } from 'lucide-react-native';

export default function EmptyState() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  return (
    <View style={styles.container}>
      <Newspaper size={48} color={colors.primary} />
      <Text style={[styles.title, { color: colors.text }]}>
        કોઈ સમાચાર ઉપલબ્ધ નથી
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        કૃપા કરીને પછીથી ફરી પ્રયાસ કરો અથવા પૃષ્ઠને રિફ્રેશ કરો
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Hind-Bold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Hind-Regular',
    fontSize: 14,
    textAlign: 'center',
    maxWidth: '80%',
  },
});