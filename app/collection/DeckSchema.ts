import { DocumentReference } from 'firebase/firestore'

export class DeckSchema {
  deckName: String
  author: DocumentReference
  cards: []

  constructor ( deckName : String, author : DocumentReference, cards : [] ) {
    this.deckName = deckName;
    this.author = author;
    this.cards = cards;
  }
}

export const deckConverter = {
  toFirestore: (deck : DeckSchema) => {
      return {
        deckName: deck.deckName,
        author: deck.author,
        cards: deck.cards
      };
  },
  fromFirestore: (snapshot : any, options : any) => {
    const data = snapshot.data(options);
    return new DeckSchema(data.deckName, data.author, data.cards);
  }
};