import React, { Dispatch, SetStateAction } from 'react';
import { FlashCardType } from '../types';

//LLM helped with ts types
/**
 * I had created the context thinking it would limit calls,
 * but then realized the util isn't a child component. So if
 * the program were to expand with more children, it might prove useful.
 */
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

/**
 * Sources:
 * React Context: https://react.dev/learn/passing-data-deeply-with-context
 */
