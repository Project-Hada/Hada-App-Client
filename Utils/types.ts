//Type for flashcards
export interface FlashCardType {
  term: string;
  definition: string;
  romanization: string;
}
  
export interface PlaylistType {
  title: string,
  playlist: FlashCardType[]
}

