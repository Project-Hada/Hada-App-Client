import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { PlaylistType } from "../types";

export interface PlaylistContextType {
  currPlaylist: PlaylistType;
  setCurrPlaylist: React.Dispatch<React.SetStateAction<PlaylistType>>;
  library: PlaylistType[];
  setLibrary: React.Dispatch<React.SetStateAction<PlaylistType[]>>;
  addPlaylist: (newPlaylist: PlaylistType) => void;
}

const defaultState: PlaylistContextType = {
  currPlaylist: {
    title: "",
    playlist: [],
  },
  setCurrPlaylist: () => {},
  library: [],
  setLibrary: () => {},
  addPlaylist: () => {},
};

const LibraryContext = React.createContext<PlaylistContextType>(defaultState);

export const LibraryProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}: any) => {
  const [library, setLibrary] = useState<PlaylistType[]>([]);
  const [currPlaylist, setCurrPlaylist] = useState<PlaylistType>({
    title: "",
    playlist: [],
  });

  const addPlaylist = (newPlaylist: PlaylistType) => {
    setLibrary((prevLibrary) => [...prevLibrary, newPlaylist]);
  };

  return (
    <LibraryContext.Provider
      value={{
        currPlaylist,
        setCurrPlaylist,
        library,
        setLibrary,
        addPlaylist,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export default LibraryContext;
