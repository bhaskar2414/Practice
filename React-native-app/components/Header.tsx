import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { formatDate } from '@/utils/dateFormatter';

export default function Header() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const today = formatDate(new Date());
  
  return (
    <View style={[styles.header, { backgroundColor: colors.card }]}>
      <View style={styles.logoContainer}>
        <View style={[styles.logoBackground, { backgroundColor: colors.primary }]}>
          <Text style={styles.logoText}>ગુ</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.appName, { color: colors.text }]}>
            GujaratiPulse
          </Text>
          <Text style={[styles.date, { color: colors.textDim }]}>
            {today}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontFamily: 'Hind-Bold',
    fontSize: 20,
  },
  titleContainer: {
    marginLeft: 12,
  },
  appName: {
    fontFamily: 'Hind-Bold',
    fontSize: 20,
    marginBottom: 2,
  },
  date: {
    fontFamily: 'Hind-Regular',
    fontSize: 14,
  },
});