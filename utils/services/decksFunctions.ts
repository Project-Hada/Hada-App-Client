import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc, query, where } from 'firebase/firestore';
import { db } from "../firebaseConfig"
import { CardNode } from '../../components/pages/Practice/sessionAlgorithm';
import { useState } from 'react';
import { LibraryState, PlaylistType } from '../types';

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
  console.log("New Deck added with ID: ", docRef.id);
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
  let res : LibraryState = {}
  const q = await query(decksCollectionRef, where("author", "==", doc(db, "/users/", uid)));
  const querySnapshot = await getDocs(q);
  querySnapshot.docs.map((doc) => (res[doc.id] = {
    id: doc.id,
    title: doc.data().title,
    playlist: doc.data().playlist,
    bleedQueue: doc.data().bleedQueue, 
    bleedQueueLength: doc.data().bleedQueueLength
  }));

  return res;
}

export const testFunction = async (uid : string) => {
  const q = await query(decksCollectionRef, where("author", "==", doc(db, "/users/", uid)));
  const querySnapshot = await getDocs(q);
  let res = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    playlist: doc.data().playlist
  }));
  
  return res;
}


export const getOneDeckByDID = async (did: String) => {
  const newDoc = await getDoc(doc(db, "/decks/" + did))
  if (newDoc) {
    return {
      id: newDoc.id,
      playlist: newDoc.data()!.playlist,
      ...newDoc.data()
    };
  }
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

/**
 * Updates the bleed queue of the current playlist.
 * @param {string} playlistId - The ID of the playlist to update.
 * @param {string[]} newBleedQueue - The new bleed queue array.
 */
export const updateBleedQueue = async (playlistId: string, newBleedQueue: string) => {
  // Ensure the playlist ID and the new bleed queue are valid
  if (!playlistId || !newBleedQueue) {
    throw new Error('Invalid playlist ID or bleed queue');
  }

  try {
    // Fetch the current state of the playlist
    const currentPlaylist = await getOneDeckByDID(playlistId);

    // If the playlist exists, update the bleed queue
    if (currentPlaylist) {
      const updatedData = { ...currentPlaylist, bleedQueue: newBleedQueue };
      await updateDeckByDID(playlistId, updatedData);

      // You may want to return the updated playlist or just a success message
      console.log(`Bleed queue updated for playlist ${playlistId}`);
      return updatedData; // Or just return true;
    } else {
      throw new Error(`Playlist with ID ${playlistId} not found`);
    }
  } catch (error) {
    console.error('Failed to update bleed queue:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


/* DELETE Operations */
export const deleteDeckByDID = async (did: String) => {
  await deleteDoc(doc(db, "/decks/" + did));
}

export const deleteCardInDeck = async (did: String, cardIndex: number) => {
  const currDeck = await getOneDeckByDID(did);

  if (currDeck) {
    currDeck.playlist.splice(cardIndex, 1);
    updateDeckByDID(did, {playlist: currDeck.playlist})
  }
}

