import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from "../data/firebaseConfig"

import { DeckSchema, deckConverter } from '../collection/DeckSchema'

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

/* UPDATE Operations */
export const updateDeckById = async (did: String, newData: {}) => {
  await updateDoc(doc(db, "/decks/" + did), newData)
}

/* DELETE Operations */
export const deleteDeckById = async (did: String) => {
  await deleteDoc(doc(db, "/decks/" + did));
}