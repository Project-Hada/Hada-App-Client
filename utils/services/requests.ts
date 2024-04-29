import { 
    collection, 
    getDocs, 
    addDoc, 
    deleteDoc, 
    doc, 
    updateDoc, 
    getDoc, 
    query, 
    where
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const decksCollectionRef = collection(db, "decks");

// This is the user id for main account (temp usage only)
const uid = 'RKAN67mg53Tr5uDt0xxwrGsxSBt2';

export const retrieveDecks = async (uid: String, setDecks: {}) => {
const q = await query(decksCollectionRef, where("author", "==", doc(db, "/users/", uid)));
  const querySnapshot = await getDocs(q);
  const filteredData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  setDecks(filteredData);
}