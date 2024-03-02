import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './_layout';
import { View } from 'react-native';
import { FlashcardProvider } from '@/Tools/Contexts/FlashcardContext';
import flashCards from './fakeData';
import { FlashCardType } from '@/Tools/types';

export default function App() {
  const [initialFlashcards, setInitialFlashcards] = useState<FlashCardType[]>([]);

  useEffect(() => {
    setInitialFlashcards(flashCards);
    console.log("flash", flashCards);
  }, []);


  return (
    <FlashcardProvider initialFlashcards={initialFlashcards}> {/* Provide the initial flashcards */}
      <View style={{backgroundColor: '#F2E8E1'}}>
        <NavigationContainer>
          <RootLayout />
        </NavigationContainer>
      </View>
    </FlashcardProvider>
  );
}
