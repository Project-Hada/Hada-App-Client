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

  const updateFlashcard = (
    playlistId: string,
    flashcardId: string,
    updatedFlashcard: FlashCardType
  ) => {
    const playlistToUpdate = library[playlistId];
    if (playlistToUpdate && playlistToUpdate.playlist[flashcardId]) {
      const updatedPlaylist = {
        ...playlistToUpdate,
        playlist: {
          ...playlistToUpdate.playlist,
          [flashcardId]: updatedFlashcard, // Directly update the flashcard
        },
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

  /** Delete a flashcard */
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
