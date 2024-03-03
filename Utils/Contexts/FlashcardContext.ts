import React, { Dispatch, SetStateAction } from 'react';
import { FlashCardType } from '../types';


interface IContext {
  flashcards: FlashCardType[];
  setFlashcards: Dispatch<SetStateAction<FlashCardType[]>>;
}

const FlashcardContext = React.createContext<IContext>({
  flashcards: [],
  setFlashcards: () => {},
})

export interface FlashcardContextType {
  flashcards: FlashCardType[];
  setFlashcards: React.Dispatch<React.SetStateAction<FlashCardType[]>>;
}

export default FlashcardContext;