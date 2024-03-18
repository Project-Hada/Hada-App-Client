export interface FlashCardType {
  id: string;
  term: string;
  definition: string;
  romanization: string;
}

export interface PlaylistType {
  id: string;
  title: string;
  playlist: FlashCardType[];
}
