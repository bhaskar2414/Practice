import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView, Linking } from 'react-native';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ChevronRight, Heart, Info, Bell, RefreshCw, Share2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useState } from 'react';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const appVersion = '1.0.0';

  const shareApp = async () => {
    try {
      await Linking.openURL(
        'https://api.whatsapp.com/send?text=ગુજરાતી સમાચાર માટે GujaratiPulse ડાઉનલોડ કરો!'
      );
    } catch (error) {
      console.error('Could not open sharing options', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>સેટિંગ્સ</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>સૂચનાઓ</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                નવા સમાચાર સૂચનાઓ
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.inactiveSwitch, true: colors.primary }}
              thumbColor={colors.switchThumb}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <RefreshCw size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                ઑટો-રિફ્રેશ (દર 30 મિનિટે)
              </Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.inactiveSwitch, true: colors.primary }}
              thumbColor={colors.switchThumb}
              disabled
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>એપ્લિકેશન</Text>
          
          <TouchableOpacity style={styles.settingRow} onPress={shareApp}>
            <View style={styles.settingInfo}>
              <Share2 size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                એપ્લિકેશન શેર કરો
              </Text>
            </View>
            <ChevronRight size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Heart size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                એપ્લિકેશનને રેટ કરો
              </Text>
            </View>
            <ChevronRight size={20} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Info size={20} color={colors.text} />
              <Text style={[styles.settingText, { color: colors.text }]}>
                અમારા વિશે
              </Text>
            </View>
            <ChevronRight size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.textDim }]}>
            GujaratiPulse v{appVersion}
          </Text>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
  },
  sectionTitle: {
    fontFamily: 'Hind-Medium',
    fontSize: 16,
    padding: 16,
    paddingBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: 'Hind-Regular',
    fontSize: 16,
    marginLeft: 12,
  },
  versionContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  versionText: {
    fontFamily: 'Hind-Regular',
    fontSize: 14,
  },
});