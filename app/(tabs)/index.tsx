import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';

import { useState, useEffect } from 'react'
import { db } from "../data/firebaseConfig"
import { doc, getDoc, getDocs, collection, query, where, DocumentReference, DocumentData, addDoc } from 'firebase/firestore';

import { UserSchema, userConverter } from '../collection/UserSchema'
import { DeckSchema, deckConverter } from '../collection/DeckSchema'

export default function TabOneScreen() {
  // collection references
  const usersCollectionRef = collection(db, "users")
  const decksCollectionRef = collection(db, "decks")

  // save database collection as state
  const [deckList, setDeckList] = useState<{id: string; [key: string]: any; }[]>([]);
  const [userList, setUserList] = useState<{id: string; [key: string]: any; }[]>([]);

  // for input form
  const [userInput, setUserInput] = useState('');
  const [deckInput, setDeckInput] = useState('');

  const getUsersList = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));

      setUserList(filteredData);
      // console.log("users\n", filteredData);
    }
    catch (err) {
      console.log(err);
    }
  }

  const getDecksList = async () => {
    try {
      const data = await getDocs(decksCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDeckList(filteredData);
      console.log("decks\n", filteredData);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsersList();
    getDecksList();
  }, [])


  // writes to user
  const handleSubmitForUserInput = async () => {
    console.log(userInput);
    const dateObj = new Date();
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const day = dateObj.getDate()

    const docRef = await addDoc(
      usersCollectionRef.withConverter(userConverter), 
      new UserSchema(userInput, String(`${month+1}/${day}/${year}`), [])
    );
    console.log("Document written with ID: ", docRef.id);

    getUsersList();
    setUserInput("")
  }

  const handleSubmitForDeckInput = async () => {
    console.log(deckInput);

    const testUserId = userList[0].id;
    const docRef = await addDoc(
      decksCollectionRef.withConverter(deckConverter), 
      new DeckSchema(deckInput, doc(db, "/users/" + testUserId), [])
    );
    console.log("Document written with ID: ", docRef.id);

    getDecksList();
    setDeckInput("")
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView style={styles.leftView}>
        <TextInput
          style={styles.input}
          onChangeText={setUserInput}
          placeholder='username'
          placeholderTextColor="#D3D3D3" 
          value={userInput}
        />
        <Button
          title="Submit"
          onPress={handleSubmitForUserInput}
        />

        <Text><h1>Users</h1></Text>
        {userList.map((user) => 
          <Text key={user.id}> 
            <h3>username:</h3> {user.username}
            {'\n'}
            <h3>dateJoined:</h3> {user.dateJoined} 
            {"\n-------------------"}
          </Text>
        )}
      </ScrollView>

      
      <ScrollView style={styles.rightView}>
        <TextInput
          style={styles.input}
          onChangeText={setDeckInput}
          placeholder='deck name'
          placeholderTextColor="#D3D3D3" 
          value={deckInput}
        />
        <Button
          title="Submit"
          onPress={handleSubmitForDeckInput}
        />

        <Text><h1>Decks</h1></Text>
        {deckList.map((deck) => 
          <Text key={deck.id}>
            {'-------------------------------------------------------\n'}
            deck name: {deck.deckName}
            {'\n'}
            <h3>cards:</h3>
            {deck.cards.map((c : any) => {
                return ( "front: " + c.front + "\nback: " + c.back + "\n-----------------\n" ) 
              })
            }
          </Text>
        )}
      </ScrollView>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
  },
  leftView: {
    flex: 1,
    backgroundColor: "#FF7F7F",
    borderWidth: 1,
  },
  rightView: {
    flex: 1,
    backgroundColor: 'skyblue',
    borderWidth: 1,
    
  }
});
