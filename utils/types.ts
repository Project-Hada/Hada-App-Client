export interface FlashCardType {
  id: string;
  term: string;
  definition: string;
  createdAt: number;
}

export interface PlaylistType {
  id: string;
  title: string;
  playlist: FlashCardType[];
  createdAt: number; // Add this line
}

export interface LibraryState {
  [id: string]: PlaylistType;
}
