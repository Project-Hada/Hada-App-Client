//Type for flashcards
export interface FlashCardType {
  term: string;
  definition: string;
}
  
export interface PlaylistType {
  title: string,
  playlist: FlashCardType[]
}

