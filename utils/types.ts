//types for a flashcard
export interface FlashCardType {
  createdAt: any;
  id: string;
  term: string;
  definition: string;
  passes: number;
  fails: number;
}

// Defines a type for the bleedArray, which is an array of flashcard IDs
// organized into a binary priority heap.
export type BleedArrayType = string[];


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
  bleedArray: BleedArrayType;
}

// this sets up id's for PlaylistType to be accessed in O(1) in LibraryContext.tsx
export interface LibraryState {
  [id: string]: PlaylistType;
}

/** EXAMPLE:
 * Initializing LibraryContext state with two playlists.
 */

// Define two example playlists
const examplePlaylist1: PlaylistType = {
  id: "playlist1",
  title: "Basic Vocabulary",
  playlist: {
    "card1": {
      createdAt: new Date(),
      id: "card1",
      term: "Hello",
      definition: "A greeting",
      grade: 0
    },
    "card2": {
      createdAt: new Date(),
      id: "card2",
      term: "World",
      definition: "The earth, together with all of its countries and peoples",
      grade: 0
    }
  },
  createdAt: Date.now(),
  lastSession: Date.now(),
  bleedArray: ["card2", "card1"] // Prioritize "World" for review
};

const examplePlaylist2: PlaylistType = {
  id: "playlist2",
  title: "Advanced Vocabulary",
  playlist: {
    "card3": {
      createdAt: new Date(),
      id: "card3",
      term: "Ephemeral",
      definition: "Lasting for a very short time",
      grade: 0
    },
    "card4": {
      createdAt: new Date(),
      id: "card4",
      term: "Labyrinthine",
      definition: "Complicated and confusing, like a labyrinth",
      grade: 0
    }
  },
  createdAt: Date.now() - 1000, // Slightly earlier createdAt time for variety
  lastSession: Date.now(),
  bleedArray: ["card3", "card4"] // Prioritize "Ephemeral" for review
};

const initializeLibrary = (): LibraryState => {
  // Here, we're directly initializing the state with our example playlists.
  // In a real application, this data might come from an API call, local storage, etc.
  return {
    "playlist1": examplePlaylist1,
    "playlist2": examplePlaylist2
  };
};

// Use the function to set the initial state in LibraryContext
// const [library, setLibrary] = useState<LibraryState>(initializeLibrary());
