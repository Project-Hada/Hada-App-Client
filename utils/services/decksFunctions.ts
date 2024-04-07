import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc, query, where } from 'firebase/firestore';
import { db } from "../firebaseConfig"
import { CardNode } from '../../components/pages/Practice/sessionAlgorithm';
import { useState } from 'react';

// import { DeckSchema, deckConverter } from '../schemas/DeckSchema'

const decksCollectionRef = collection(db, "decks")

/* CREATE Operations */
export const addNewDeck = async (uid: String, titleInput: String) => {
  const docRef = await addDoc(decksCollectionRef, {
    author: doc(db, "/users/" + uid),
    title: titleInput,
    playlist: [],
    // bleedQueue: CardNode,
    // bleedQueueLength: 0
  }
  );
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
}

export const addNewCardToDeck = async (did: String, cardFront: String, cardBack: String) => {
  const currDeck = await getOneDeckByDID(did)
  
  if (currDeck) {
    currDeck.playlist.push({term: cardFront, definition: cardBack})
    updateDeckByDID(did, {playlist: currDeck.playlist})
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

export const getAllDecksByUID = async (uid : string) => {
  // {"id": "DePKSv183KzhlhTSoDBC", "playlist":[], "title": "cookingCards"}
  // [{{}, {}}]
  let res : any[] = []

  // {title, playlist (length), id}
  const q = await query(decksCollectionRef, where("author", "==", doc(db, "/users/", uid)));
  const querySnapshot = await getDocs(q);
  querySnapshot.docs.map((doc) => res.push({
    id: doc.id,
    title: doc.data().title,
    playlist: doc.data().playlist
  }));
  return res;
}

export const getOneDeckByDID = async (did: String) => {
  const newDoc = await getDoc(doc(db, "/decks/" + did))
  if (newDoc)
    return newDoc.data();
}

/* UPDATE Operations */
export const updateDeckByDID = async (did: String, newData: {}) => {
  await updateDoc(doc(db, "/decks/" + did), newData)
}

export const updateCardInDeck = async (did: String, cardIndex: number, 
                                      newTerm: String, newDefinition: String) => {
  const currDeck = await getOneDeckByDID(did)
  if (currDeck) {
    currDeck.playlist[cardIndex] = {term: newTerm, definition: newDefinition};
    updateDeckByDID(did, {playlist: currDeck.playlist})
  }
}

/* DELETE Operations */
export const deleteDeckByDID = async (did: String) => {
  await deleteDoc(doc(db, "/decks/" + did));
}

export const deleteCardInDeck = async (did: String, cardIndex: number) => {
  const currDeck = await getOneDeckByDID(did)

  if (currDeck) {
    currDeck.playlist.splice(cardIndex, 1);
    updateDeckByDID(did, {playlist: currDeck.playlist})
  }
}