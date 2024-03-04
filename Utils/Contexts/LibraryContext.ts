import React, { Dispatch, SetStateAction } from 'react';
import { PlaylistType } from '../types';

export interface PlaylistContextType {
  currPlaylist: PlaylistType;
  setCurrPlaylist: Dispatch<SetStateAction<PlaylistType>>;
  library: PlaylistType[];
  setLibrary: React.Dispatch<React.SetStateAction<PlaylistType[]>>;
}

const LibraryContext = React.createContext<PlaylistContextType>({
  currPlaylist: {
    title: '',
    playlist: []
  },
  setCurrPlaylist: () => {},
  library: [],
  setLibrary: () => {},
})



export default LibraryContext;