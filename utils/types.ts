export interface FlashCardType {
  id: string;
  term: string;
  definition: string;
}

export interface PlaylistType {
  id: string;
  title: string;
  playlist: {
    [key: string]: FlashCardType;
  };
  createdAt?: number;
}

export interface LibraryState {
  [id: string]: PlaylistType;
}
