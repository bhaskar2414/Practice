import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { 
  Hind_400Regular,
  Hind_500Medium,
  Hind_700Bold 
} from '@expo-google-fonts/hind';
import { Redirect } from 'expo-router';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Hind-Regular': Hind_400Regular,
    'Hind-Medium': Hind_500Medium,
    'Hind-Bold': Hind_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If fonts are still loading, return null to keep the splash screen visible
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Redirect to the tab layout
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});