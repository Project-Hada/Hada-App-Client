import React, { Dispatch, SetStateAction } from 'react';
import { PlaylistType } from '../types';


interface IContext {
  library: PlaylistType[];
  setLibrary: Dispatch<SetStateAction<PlaylistType[]>>;
}

const LibraryContext = React.createContext<IContext>({
  library: [],
  setLibrary: () => {},
})

export interface PlaylistContextType {
  library: PlaylistType[];
  setLibrary: React.Dispatch<React.SetStateAction<PlaylistType[]>>;
}

export default LibraryContext;