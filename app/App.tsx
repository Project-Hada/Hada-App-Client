import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './_layout';
import { View } from 'react-native';
import flashCards from './fakeData';
import { FlashCardType } from '@/Tools/types';
import FlashcardContext, { FlashcardContextType } from '@/Tools/Contexts/FlashcardContext';

export default function App() {
  const [currFlashcards, setCurrFlashcards] = useState<FlashCardType[]>([]);

  const value: FlashcardContextType = {
    flashcards: flashCards,
    setFlashcards: setCurrFlashcards
  }

  

  return (
    <FlashcardContext.Provider value={value}> {/* Provide the initial flashcards */}
      <View style={{backgroundColor: '#F2E8E1'}}>
        <NavigationContainer>
          <RootLayout />
        </NavigationContainer>
      </View>
    </FlashcardContext.Provider>
  );
}
