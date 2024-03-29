import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc, query, where } from 'firebase/firestore';
import { db } from "../firebaseConfig"

// import { DeckSchema, deckConverter } from '../schemas/DeckSchema'

const decksCollectionRef = collection(db, "decks")

/* CREATE Operations */
export const addNewDeck = async (uid: String, titleInput: String) => {
  const docRef = await addDoc(decksCollectionRef, {
    author: doc(db, "/users/" + uid),
    title: titleInput,
    playlist: []
  }
  );

  console.log("Document written with ID: ", docRef.id);
}

export const addNewCardToDeck = async (did: String, cardFront: String, cardBack: String) => {
  const currDeck = (await getOneDeckByDID(did)).data()
  
  if (currDeck) {
    currDeck.cards.push({term: cardFront, definition: cardBack})
    updateDeckByDID(did, {playlist: currDeck.cards})
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

export const getAllDecksByUID = async (uid : string, setDecks : any) => {
  const q = await query(decksCollectionRef, where("author", "==", doc(db, "/users/", uid)));
  const querySnapshot = await getDocs(q);
  const filteredData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  setDecks(filteredData);
}

export const getOneDeckByDID = async (did: String) => {
  return await getDoc(doc(db, "/decks/" + did))
}

/* UPDATE Operations */
export const updateDeckByDID = async (did: String, newData: {}) => {
  await updateDoc(doc(db, "/decks/" + did), newData)
}

export const updateCardInDeck = async (did: String, cardIndex: number, 
                                      newTerm: String, newDefinition: String) => {
  const currDeck = (await getOneDeckByDID(did)).data();
  if (currDeck) {
    currDeck.playlist[cardIndex] = {term: newTerm, definition: newDefinition};
    updateDeckByDID(did, {play: currDeck.cards})
  }
}

/* DELETE Operations */
export const deleteDeckByDID = async (did: String) => {
  await deleteDoc(doc(db, "/decks/" + did));
}

export const deleteCardInDeck = async (did: String, cardIndex: number) => {
  const currDeck = (await getOneDeckByDID(did)).data();

  if (currDeck) {
    currDeck.playlist.splice(cardIndex, 1);
    updateDeckByDID(did, {playlist: currDeck.playlist})
  }
}