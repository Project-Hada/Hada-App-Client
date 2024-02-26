// _layout.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from './pages/library'; // Update the path as needed
import DeckPreview from './pages/deckprev'; // Update the path as needed
import SplashScreen from 'expo-splash-screen';

const Stack = createStackNavigator();

export default function RootLayout() {

  return (
      <Stack.Navigator>
        <Stack.Screen name="pages/library" component={LibraryScreen} />
        <Stack.Screen name="pages/deckprev" component={DeckPreview} />
        {/* Add other screens here */}
      </Stack.Navigator>
  );
}
