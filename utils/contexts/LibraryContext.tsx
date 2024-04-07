/**
 * This is the Library Context, this takes care of the front-end CRUD functionality for
 * adding, removing, and updating Playlist & Cards.
 * Used in:
 * Playlist Page is Library.tsx
 * DeckPreview.tsx displays the Playlist cards
 */
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { FlashCardType, PlaylistType } from "../types";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getAllDecksByUID } from "../services/decksFunctions";

/**
 * Represents the state of the library, mapping playlist IDs to their respective PlaylistType.
 */
export interface LibraryState {
  [id: string]: PlaylistType;
}

/**
 * Describes the context for the playlist, providing types for the current playlist, library state,
 * and functions to manipulate them.
 */
export interface PlaylistContextType {
  user: User | null;
  currPlaylist: PlaylistType | null;
  setCurrPlaylist: Dispatch<SetStateAction<PlaylistType | null>>;
  library: LibraryState;
  setLibrary: Dispatch<SetStateAction<LibraryState>>;
  addPlaylist: (newPlaylist: PlaylistType) => void;
  addFlashcard: (playlistId: string, newFlashcard: FlashCardType) => void;
  updateFlashcard: (
    playlistId: string,
    flashcardId: string,
    updatedFlashcard: FlashCardType
  ) => void;
  updatePlaylist: (
    playlistId: string,
    updatedPlaylistData: Partial<PlaylistType>
  ) => void;
  deleteFlashcard: (playlistId: string, flashcardId: string) => void;
  personalLibrary: PlaylistType[];
  setPL: Dispatch<SetStateAction<PlaylistType[]>>;
}

// The default state for the PlaylistContext when it is first created.
const defaultState: PlaylistContextType = {
  user: null,
  currPlaylist: null, // Since currPlaylist can be null now
  setCurrPlaylist: () => {},
  library: {}, // Initialize library as an empty object
  setLibrary: () => {},
  addPlaylist: () => {},
  addFlashcard: () => {},
  updatePlaylist: () => {},
  updateFlashcard: () => {},
  deleteFlashcard: () => {},
  personalLibrary: [],
  setPL: () => [],
};

// Create the context with the default state.
const LibraryContext = React.createContext<PlaylistContextType>(defaultState);

/**
 * Provides a context wrapper for the library, exposing state management functions
 * and the current state to children components.
 *
 * found in App.tsx
 */
export const LibraryProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}: any) => {
  // Initialize currPlaylist as null because there might not be a current playlist selected
  const [currPlaylist, setCurrPlaylist] = useState<PlaylistType | null>(null);

  // Initialize the library as an empty object
  const [library, setLibrary] = useState<LibraryState>({});

  const [personalLibrary, setPL] = useState<PlaylistType[]>([]);

  /**
   * Adds a new playlist to the library state.
   * @param newPlaylist - The new playlist to be added.
   */
  const addPlaylist = (newPlaylist: PlaylistType) => {
    setLibrary((prevLibrary) => ({
      ...prevLibrary,
      [newPlaylist.id]: newPlaylist, // Add the new playlist to the library object using the playlist id as the key
    }));
  };

  /**
   * Adds a new flashcard to the specified playlist.
   * @param playlistId - The ID of the playlist to which the flashcard will be added.
   * @param newFlashcard - The flashcard to be added.
   */
  const addFlashcard = (playlistId: string, newFlashcard: FlashCardType) => {
    // Access the playlist directly by ID
    const newFlashcardWithTimestamp = {
      ...newFlashcard,
      createdAt: Date.now(), // Ensure every new flashcard has a current timestamp
    };

    const playlistToUpdate = library[playlistId];

    if (playlistToUpdate) {
      // Correctly use newFlashcardWithTimestamp when adding the flashcard
      const updatedPlaylist = {
        ...playlistToUpdate,
        playlist: {
          [newFlashcardWithTimestamp.id]: newFlashcardWithTimestamp, // Use the flashcard with timestamp
          ...playlistToUpdate.playlist,
        },
      };

      // Update the library with the new playlist that includes the new flashcard
      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        [playlistId]: updatedPlaylist,
      }));

      // Update currPlaylist if it's the one being modified
      if (currPlaylist && currPlaylist.id === playlistId) {
        setCurrPlaylist(updatedPlaylist);
      }
    }
  };

  /**
   * Updates a flashcard in the specified playlist with new data.
   * @param playlistId - The ID of the playlist containing the flashcard.
   * @param flashcardId - The ID of the flashcard to be updated.
   * @param updatedFlashcard - The new data for the flashcard.
   */
  const updateFlashcard = (
    playlistId: string,
    flashcardId: string,
    updatedFlashcard: FlashCardType
  ) => {
    const playlistToUpdate = library[playlistId];
    if (playlistToUpdate && playlistToUpdate.playlist[flashcardId]) {
      // Preserve the existing flashcard properties, except those that are updated
      const flashcardToUpdate = playlistToUpdate.playlist[flashcardId];
      const flashcardWithUpdates = {
        ...flashcardToUpdate,
        ...updatedFlashcard,
      };

      const updatedPlaylist = {
        ...playlistToUpdate,
        playlist: {
          ...playlistToUpdate.playlist,
          [flashcardId]: flashcardWithUpdates,
        },
      };

      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        [playlistId]: updatedPlaylist,
      }));

      if (currPlaylist?.id === playlistId) {
        setCurrPlaylist(updatedPlaylist);
      }
    }
  };

  /**
   * Deletes a flashcard from the specified playlist.
   * @param playlistId - The ID of the playlist from which the flashcard will be deleted.
   * @param flashcardId - The ID of the flashcard to be removed.
   * This function updates the state to reflect the removal of the flashcard from the playlist.
   */
  const deleteFlashcard = (playlistId: string, flashcardId: string) => {
    const playlistToUpdate = library[playlistId];
    if (playlistToUpdate && playlistToUpdate.playlist[flashcardId]) {
      const { [flashcardId]: _, ...restOfFlashcards } =
        playlistToUpdate.playlist;
      const updatedPlaylist = {
        ...playlistToUpdate,
        playlist: restOfFlashcards,
      };

      setLibrary({
        ...library,
        [playlistId]: updatedPlaylist,
      });

      if (currPlaylist?.id === playlistId) {
        setCurrPlaylist(updatedPlaylist);
      }
    }
  };

  const updatePlaylist = (
    playlistId: string,
    updatedPlaylistData: Partial<PlaylistType>
  ) => {
    const playlistToUpdate = library[playlistId];
    if (playlistToUpdate) {
      // Create a new playlist object with the updated data
      const updatedPlaylist = {
        ...playlistToUpdate,
        ...updatedPlaylistData,
        playlist: { ...playlistToUpdate.playlist }, // Ensure the flashcards remain unchanged
      };

      // Update the library state with the modified playlist
      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        [playlistId]: updatedPlaylist,
      }));

      // If the current playlist is the one being updated, also update currPlaylist
      if (currPlaylist?.id === playlistId) {
        setCurrPlaylist(updatedPlaylist);
      }
    }
  };

  const [user, setUser] = useState<User | null>(null);
  onAuthStateChanged(auth, (user) => setUser(user));

  return (
    <LibraryContext.Provider
      value={{
        user,
        currPlaylist,
        setCurrPlaylist,
        library,
        setLibrary,
        addPlaylist,
        addFlashcard,
        updatePlaylist,
        updateFlashcard,
        deleteFlashcard,
        personalLibrary,
        setPL,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;
