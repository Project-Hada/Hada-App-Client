import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from "../data/firebaseConfig"

import { UserSchema, userConverter } from '../collection/UserSchema'

const usersCollectionRef = collection(db, "users")

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

export const updateUserById = async (uid: String, newData: {}) => {
  await updateDoc(doc(db, "/users/" + uid), newData)
}

export const deleteUserById = async (uid: String) => {
  await deleteDoc(doc(db, "/users/" + uid));
}