import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import PracticeScreen from './(tabs)/practice';
import React from 'react';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    'GeneralSans-Bold': require('../assets/fonts/GeneralSans-Bold.otf'),
    'GeneralSans-BoldItalic': require('../assets/fonts/GeneralSans-BoldItalic.otf'),
    'GeneralSans-Extralight': require('../assets/fonts/GeneralSans-Extralight.otf'),
    'GeneralSans-ExtralightItalic': require('../assets/fonts/GeneralSans-ExtralightItalic.otf'),
    'GeneralSans-Italic': require('../assets/fonts/GeneralSans-Italic.otf'),
    'GeneralSans-Light': require('../assets/fonts/GeneralSans-Light.otf'),
    'GeneralSans-LightItalic': require('../assets/fonts/GeneralSans-LightItalic.otf'),
    'GeneralSans-Medium': require('../assets/fonts/GeneralSans-Medium.otf'),
    'GeneralSans-Regular': require('../assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-Semibold': require('../assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-SemiboldItalic': require('../assets/fonts/GeneralSans-SemiboldItalic.otf'),
    'GeneralSans-Variable': require('../assets/fonts/GeneralSans-Variable.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PracticeScreen/>
    </ThemeProvider>
  );
}
