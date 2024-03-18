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

export interface LibraryState {
  [id: string]: PlaylistType;
}

export interface PlaylistContextType {
  user: User | null
  currPlaylist: PlaylistType | null;
  setCurrPlaylist: Dispatch<SetStateAction<PlaylistType | null>>;
  library: LibraryState;
  setLibrary: Dispatch<SetStateAction<LibraryState>>;
  addPlaylist: (newPlaylist: PlaylistType) => void;
  addFlashcard: (playlistId: string, newFlashcard: FlashCardType) => void;
}

const defaultState: PlaylistContextType = {
  user: null,
  currPlaylist: null, // Since currPlaylist can be null now
  setCurrPlaylist: () => {},
  library: {}, // Initialize library as an empty object
  setLibrary: () => {},
  addPlaylist: () => {},
  addFlashcard: () => {},
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

  const [user, setUser] = useState<User | null>(null);
  onAuthStateChanged(auth, (user) => { setUser(user) })

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
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;
