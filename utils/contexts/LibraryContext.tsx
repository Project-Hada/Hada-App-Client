import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { FlashCardType, PlaylistType } from "../types";

export interface LibraryState {
  [id: string]: PlaylistType;
}

export interface PlaylistContextType {
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
  deleteFlashcard: (playlistId: string, flashcardId: string) => void;
}

const defaultState: PlaylistContextType = {
  currPlaylist: null, // Since currPlaylist can be null now
  setCurrPlaylist: () => {},
  library: {}, // Initialize library as an empty object
  setLibrary: () => {},
  addPlaylist: () => {},
  addFlashcard: () => {},
  updateFlashcard: () => {},
  deleteFlashcard: () => {},
};

const LibraryContext = React.createContext<PlaylistContextType>(defaultState);

export const LibraryProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}: any) => {
  // Initialize currPlaylist as null because there might not be a current playlist selected
  const [currPlaylist, setCurrPlaylist] = useState<PlaylistType | null>(null);

  // Initialize the library as an empty object
  const [library, setLibrary] = useState<LibraryState>({});

  /**Adding a playlist */
  const addPlaylist = (newPlaylist: PlaylistType) => {
    setLibrary((prevLibrary) => ({
      ...prevLibrary,
      [newPlaylist.id]: newPlaylist, // Add the new playlist to the library object using the playlist id as the key
    }));
  };

  /**Adding a flashcard */
  const addFlashcard = (playlistId: string, newFlashcard: FlashCardType) => {
    // Access the playlist directly by ID
    const playlistToUpdate = library[playlistId];

    if (playlistToUpdate) {
      // Create a new playlist with the new flashcard added at the start
      const updatedPlaylist = {
        ...playlistToUpdate,
        playlist: [newFlashcard, ...playlistToUpdate.playlist],
      };

      // Update the library with the new playlist
      setLibrary({
        ...library,
        [playlistId]: updatedPlaylist,
      });

      // If the currPlaylist is the one being updated, also set the new currPlaylist
      if (currPlaylist && currPlaylist.id === playlistId) {
        setCurrPlaylist(updatedPlaylist);
      }
    }
  };

  const updateFlashcard = (
    playlistId: string,
    flashcardId: string,
    updatedFlashcard: FlashCardType
  ) => {
    const playlistToUpdate = library[playlistId];

    if (playlistToUpdate) {
      // Find the index of the flashcard to update
      const flashcardIndex = playlistToUpdate.playlist.findIndex(
        (flashcard) => flashcard.id === flashcardId
      );

      if (flashcardIndex !== -1) {
        // Create a copy of the current flashcards
        const updatedFlashcards = [...playlistToUpdate.playlist];
        // Update the specific flashcard at the found index
        updatedFlashcards[flashcardIndex] = updatedFlashcard;

        // Create a new updated playlist with the updated flashcards array
        const updatedPlaylist = {
          ...playlistToUpdate,
          playlist: updatedFlashcards,
        };

        // Update the library with the new playlist
        setLibrary((prevLibrary) => ({
          ...prevLibrary,
          [playlistId]: updatedPlaylist,
        }));

        // Also update the currPlaylist if it's the one being updated
        if (currPlaylist?.id === playlistId) {
          setCurrPlaylist(updatedPlaylist);
        }
      }
    }
  };

  /** Delete a flashcard */
  const deleteFlashcard = (playlistId: string, flashcardId: string) => {
    // Access the playlist directly by ID
    const playlistToUpdate = library[playlistId];

    if (playlistToUpdate) {
      // Filter out the flashcard to be deleted
      const updatedFlashCards = playlistToUpdate.playlist.filter(
        (flashcard) => flashcard.id !== flashcardId
      );

      // Create a new updated playlist
      const updatedPlaylist = {
        ...playlistToUpdate,
        playlist: updatedFlashCards,
      };

      // Update the library with the new playlist
      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        [playlistId]: updatedPlaylist,
      }));

      // Also update the currPlaylist if it's the one being updated
      if (currPlaylist?.id === playlistId) {
        setCurrPlaylist(updatedPlaylist);
      }
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        currPlaylist,
        setCurrPlaylist,
        library,
        setLibrary,
        addPlaylist,
        addFlashcard,
        updateFlashcard,
        deleteFlashcard,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;
