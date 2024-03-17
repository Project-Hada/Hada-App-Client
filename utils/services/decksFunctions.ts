import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig"

import { DeckSchema, deckConverter } from '../schemas/DeckSchema'

const decksCollectionRef = collection(db, "decks")

/* CREATE Operations */
export const addNewDeck = async (uid: String, deckInput: String) => {
  const docRef = await addDoc(
    decksCollectionRef.withConverter(deckConverter), 
    new DeckSchema(deckInput, doc(db, "/users/" + uid), [])
  );

  // TODO: when auth is set up, add deck reference to user array

  console.log("Document written with ID: ", docRef.id);
}

export const addNewCardToDeck = async (did: String, cardFront: String, cardBack: String) => {
  const currDeck = (await getOneDeckByDId(did)).data()
  
  if (currDeck) {
    currDeck.cards.push({front: cardFront, back: cardBack})
    updateDeckById(did, {cards: currDeck.cards})
  }
}

/* READ Operations */
export const getAllDecks = async (setDeckList: any) => {
  try {
    const data = await getDocs(decksCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setDeckList(filteredData);
  }
  catch (err) {
    console.log(err);
  }
}

export const getOneDeckByDId = async (did: String) => {
  return await getDoc(doc(db, "/decks/" + did))
}

/* UPDATE Operations */
export const updateDeckById = async (did: String, newData: {}) => {
  await updateDoc(doc(db, "/decks/" + did), newData)
}

export const updateCardInDeck = async (did: String, cardIndex: number, 
                                      newFront: String, newBack: String) => {
  const currDeck = (await getOneDeckByDId(did)).data();
  if (currDeck) {
    currDeck.cards[cardIndex] = {front: newFront, back: newBack};
    updateDeckById(did, {cards: currDeck.cards})
  }
}

/* DELETE Operations */
export const deleteDeckById = async (did: String) => {
  await deleteDoc(doc(db, "/decks/" + did));
}

export const deleteCardInDeck = async (did: String, cardIndex: number) => {
  const currDeck = (await getOneDeckByDId(did)).data();

  if (currDeck) {
    currDeck.cards.splice(cardIndex, 1);
    updateDeckById(did, {cards: currDeck.cards})
  }
}