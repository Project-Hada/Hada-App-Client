import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig"

import { UserSchema, userConverter } from '../schemas/UserSchema'

const usersCollectionRef = collection(db, "users")

/* CREATE Operations */
export const addNewUser = async (userInput : String) => {
  const dateObj = new Date();
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()
  const day = dateObj.getDate()

  const docRef = await addDoc(
    usersCollectionRef.withConverter(userConverter), 
    new UserSchema(userInput, String(`${month+1}/${day}/${year}`), [])
  );

  console.log("Document written with ID: ", docRef.id);
}

export const addNewUserWithID = async (uid : string, usernameInput : String) => {
  const dateObj = new Date();
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()
  const day = dateObj.getDate()

  const docRef = await setDoc(doc(db, "users", uid), {
    username: usernameInput,
    dateJoined: String(`${month+1}/${day}/${year}`),
    ownedDecks: []
  });
}

/* READ Operations */
export const getAllUsers = async (setUserList: any) => {
  try {
    const data = await getDocs(usersCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    // console.log("users\n", filteredData);
    setUserList(filteredData);
  }
  catch (err) {
    console.log(err);
  }
}

/* UPDATE Operations */
export const updateUserById = async (uid: String, newData: {}) => {
  await updateDoc(doc(db, "/users/" + uid), newData)
}

/* DELETE Operations */
export const deleteUserById = async (uid: String) => {
  await deleteDoc(doc(db, "/users/" + uid));
}