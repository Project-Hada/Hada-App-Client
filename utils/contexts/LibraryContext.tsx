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
  useEffect,
  useState,
} from "react";
import { FlashCardType, PlaylistType } from "../types";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  addNewCardToDeck,
  addNewDeck,
  deleteCardInDeck,
  deleteDeckByDID,
  getAllDecksByUID,
  getOneDeckByDID,
  updateBleedQueue,
  updateCardInDeck,
  updateDeckTitle,
} from "../services/decksFunctions";

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
  handleLogout: () => void;
  currPlaylist: PlaylistType | null;
  setCurrPlaylist: Dispatch<SetStateAction<PlaylistType | null>>;
  library: LibraryState;
  setLibrary: Dispatch<SetStateAction<LibraryState>>;
  addPlaylist: () => Promise<PlaylistType>;
  addFlashcard: (playlist: PlaylistType, newFlashcard: FlashCardType) => void;
  updateFlashcard: (
    playlist: PlaylistType,
    flashcardId: number,
    updatedFlashcard: FlashCardType
  ) => void;
  updatePlaylist: (
    playlistId: string,
    updatedPlaylistData: Partial<PlaylistType>
  ) => void;
  updatePlaylistTitle: (playlist: PlaylistType, newTitle: string) => void;
  deleteFlashcard: (playlist: PlaylistType, flashcardId: number) => void;
  deletePlaylist: (playlistId: string) => void;
  profileImage: string | null;
  setProfileImage: Dispatch<SetStateAction<string | null>>;
  refreshLibrary: () => Promise<void>
}

// The default state for the PlaylistContext when it is first created.
const defaultState: PlaylistContextType = {
  user: null,
  handleLogout: () => {},
  currPlaylist: null, // Since currPlaylist can be null now
  setCurrPlaylist: () => {},
  library: {}, // Initialize library as an empty object
  setLibrary: () => {},
  addPlaylist: () => {
    throw new Error("failed to add playlist");
  },
  addFlashcard: () => {},
  updatePlaylist: () => {},
  updatePlaylistTitle: () => {},
  updateFlashcard: () => {},
  deleteFlashcard: () => {},
  deletePlaylist: () => {},
  refreshLibrary: () => {throw new Error("failed to refreshLibrary")}
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
  const refreshLibrary = async () => {
    if (user && user.uid) {
      const data = await getAllDecksByUID(user.uid);
      setLibrary(data);
      console.log("refreshed", data);
    }
  };

  const [user, setUser] = useState<User | null>(null);
  onAuthStateChanged(auth, (user) => setUser(user));
  useEffect(() => {
    refreshLibrary();
  }, [user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out successfully");

        setUser(null);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  // Initialize currPlaylist as null because there might not be a current playlist selected
  const [currPlaylist, setCurrPlaylist] = useState<PlaylistType | null>(null);

  // Initialize the library as an empty object
  const [library, setLibrary] = useState<LibraryState>({});
  


  /**
   * Adds a new playlist to the library state.
   * @param newPlaylist - The new playlist to be added.
   */
  const addPlaylist = async () => {
    const newDeckId = await addNewDeck(user!.uid, "New Playlist");
    const newDeck = (await getOneDeckByDID(newDeckId)) as PlaylistType;
    return newDeck;
  };

  /**
   * Adds a new flashcard to the specified playlist.
   * @param playlistId - The ID of the playlist to which the flashcard will be added.
   * @param newFlashcard - The flashcard to be added.
   */
  const addFlashcard = (
    playlist: PlaylistType,
    newFlashcard: FlashCardType
  ) => {
    const playlistToUpdate = playlist;
    if (playlistToUpdate) {
      playlistToUpdate.playlist.push(newFlashcard);

      addNewCardToDeck(
        playlist.id,
        newFlashcard.term,
        newFlashcard.definition
      );

      // Update the library with the new playlist that includes the new flashcard
      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        [playlist.id]: playlistToUpdate,
      }));

      // Update currPlaylist if it's the one being modified
      if (currPlaylist && currPlaylist.id === playlist.id) {
        setCurrPlaylist(playlistToUpdate);
      }
    }
  };

  const updatePlaylistTitle = (playlist: PlaylistType, newTitle: string) => {
    updateDeckTitle(playlist.id, newTitle);

    const updatedPlaylist = {
      ...playlist,
      title: newTitle
    }

    if (currPlaylist && currPlaylist.id === playlist.id) {
      setCurrPlaylist(updatedPlaylist);
    }
  }


  /**
   * Updates a flashcard in the specified playlist with new data.
   * @param playlistId - The ID of the playlist containing the flashcard.
   * @param flashcardId - The ID of the flashcard to be updated.
   * @param updatedFlashcard - The new data for the flashcard.
   */
  const updateFlashcard = (
    playlist: PlaylistType,
    flashcardId: number,
    updatedFlashcard: FlashCardType
  ) => {
    updateCardInDeck(
      playlist.id,
      flashcardId,
      updatedFlashcard.term,
      updatedFlashcard.definition
    );

    const playlistToUpdate = library[playlist.id];
    if (playlistToUpdate && playlistToUpdate.playlist[flashcardId]) {
      // Preserve the existing flashcard properties, except those that are updated
      const flashcardToUpdate = playlistToUpdate.playlist[flashcardId];
      playlistToUpdate.playlist[flashcardId] = {
        ...flashcardToUpdate, 
        term: updatedFlashcard.term, 
        definition: updatedFlashcard.definition
      };
      console.log("uP oP ", playlistToUpdate)
      console.log("uP nF ", updatedFlashcard)

      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        [playlist.id]: playlistToUpdate,
      }));

      if (currPlaylist?.id === playlist.id) {
        setCurrPlaylist(playlistToUpdate);
      }
    }
  };

  /**
   * Deletes a flashcard from the specified playlist.
   * @param playlistId - The ID of the playlist from which the flashcard will be deleted.
   * @param flashcardId - The ID of the flashcard to be removed.
   * This function updates the state to reflect the removal of the flashcard from the playlist.
   */
  const deleteFlashcard = (playlist: PlaylistType, flashcardId: number) => {
    const playlistToUpdate = library[playlist.id];
    console.log("PTU: ", playlistToUpdate, "FCID: ", flashcardId);
    if (playlistToUpdate && playlistToUpdate.playlist[flashcardId]) {
      playlistToUpdate.playlist.splice(flashcardId, 1);
      console.log(playlistToUpdate)

      const updatedPlaylist = {
        ...playlistToUpdate,
        playlist: playlistToUpdate.playlist,
      };

      setLibrary((prevLibrary) => ({
        ...prevLibrary,
        [playlist.id]: updatedPlaylist,
      }));

      if (currPlaylist?.id === playlist.id) {
        setCurrPlaylist(updatedPlaylist);
      }
    }

    deleteCardInDeck(playlist.id, flashcardId);
  };

  const updatePlaylist = (
    playlistId: string,
    updatedPlaylistData: Partial<PlaylistType>
  ) => {
    const playlistToUpdate = library[playlistId];
    console.log("3333333333333333333333333:", updatedPlaylistData);
    if (playlistToUpdate) {
      // Create a new playlist object with the updated data
      const updatedPlaylist = {
        ...playlistToUpdate,
        ...updatedPlaylistData,
        playlist: { ...playlistToUpdate.playlist }, // Ensure the flashcards remain unchanged
      };

      if (updatedPlaylist.bleedQueue)
        updateBleedQueue(playlistId, updatedPlaylist.bleedQueue);

      console.log("22222222222222222222222", updatedPlaylist);

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

  const deletePlaylist = (playlistId: string) => {
    deleteDeckByDID(playlistId);
    
    setLibrary((prevLibrary) => {
      const updatedLibrary = { ...prevLibrary };
      delete updatedLibrary[playlistId]; // Remove the playlist by ID
      return updatedLibrary;
    });

    // Update the currPlaylist if it was the one deleted
    setCurrPlaylist((current) => {
      return current?.id === playlistId ? null : current;
    });
  };

  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <LibraryContext.Provider
      value={{
        user,
        handleLogout,
        currPlaylist,
        setCurrPlaylist,
        library,
        setLibrary,
        addPlaylist,
        updatePlaylistTitle,
        addFlashcard,
        updatePlaylist,
        updateFlashcard,
        deleteFlashcard,
        deletePlaylist,
        profileImage,
        setProfileImage,
        refreshLibrary,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;
