import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Router from './Router';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import FlashcardContext from '../Utils/Contexts/FlashcardContext';
import { FlashCardType } from '../Utils/types';
import flashCards from '../Data/fakeData';

export default function Configure() {
  // Always call useState at the top level
  const [flashcards, setFlashcards] = useState<FlashCardType[]>(flashCards);

  // Call useFonts at the top level
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

  // You can handle the loading state inside your component's return statement or use a loader component
  if (!loaded) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (
    <FlashcardContext.Provider value={{flashcards, setFlashcards }}>
      <Router/>
    </FlashcardContext.Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});