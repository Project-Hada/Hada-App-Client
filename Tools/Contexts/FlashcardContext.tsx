// FlashcardContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface FlashCard {
  definition: string;
  romanization: string;
  translation: string;
}

interface FlashcardContextType {
  flashcards: FlashCard[];
  setFlashcards: React.Dispatch<React.SetStateAction<FlashCard[]>>;
}

// Creating the context with an empty array as the default value for flashcards
export const FlashcardContext = createContext<FlashcardContextType>({
  flashcards: [],
  setFlashcards: () => {},
});

interface FlashcardProviderProps {
  children: ReactNode;
  initialFlashcards?: FlashCard[];
}

// The Provider component now correctly typed with FlashcardProviderProps
export const FlashcardProvider: React.FC<FlashcardProviderProps> = ({ children, initialFlashcards }) => {
  const [flashcards, setFlashcards] = useState<FlashCard[]>(initialFlashcards || []);

  return (
    <FlashcardContext.Provider value={{ flashcards, setFlashcards }}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () => {
  const context = React.useContext(FlashcardContext);
  if (!context) {
    throw new Error('useFlashcards must be used within a FlashcardProvider');
  }
  return context;
};
