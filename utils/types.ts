import { CardNode } from "../components/pages/Practice/sessionAlgorithm";

//types for a flashcard
export interface FlashCardType {
  createdAt: any;
  id: string;
  term: string;
  definition: string;
  passes: number;
  fails: number;
}


/**
 * types for a single playlist,
 * in Configure.tsx from fakeData.ts
 * an array of PlaylistTypes is held
 */
export interface PlaylistType {
  id: string;
  title: string;
  playlist: {
    [key: string]: FlashCardType;
  };
  createdAt?: number;
  lastSession?: number;
  bleedQueue: CardNode;
  bleedQueueLength: number;
}

// this sets up id's for PlaylistType to be accessed in O(1) in LibraryContext.tsx
export interface LibraryState {
  [id: string]: PlaylistType;
}

