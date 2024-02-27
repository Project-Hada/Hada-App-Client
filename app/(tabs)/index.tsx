import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';

import { useState, useEffect } from 'react'
import { db } from "../data/firebaseConfig"
import { doc, getDoc, getDocs, collection, query, where, DocumentReference, DocumentData, addDoc } from 'firebase/firestore';

import { UserSchema, userConverter } from '../collection/UserSchema'

export default function TabOneScreen() {
  // collection references
  const usersCollectionRef = collection(db, "users")
  const decksCollectionRef = collection(db, "decks")

  // save database collection as state
  const [deckList, setDeckList] = useState<{id: string; [key: string]: any; }[]>([]);
  const [userList, setUserList] = useState<{id: string; [key: string]: any; }[]>([]);

  // for input form
  const [text, onChangeText] = useState('');

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

  useEffect(() => {
    getUsersList();
  }, [])

  useEffect(() => {
    const getDeckList = async () => {
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

    getDeckList();
  }, [userList])



  const handleSubmit = async () => {
    console.log(text);
    const dateObj = new Date();
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const day = dateObj.getDate()

    const docRef = await addDoc(
      usersCollectionRef.withConverter(userConverter), 
      new UserSchema(text, String(`${month+1}/${day}/${year}`), [])
    );
    console.log("Document written with ID: ", docRef.id);

    getUsersList();
    onChangeText("")
  }

  return (
    <ScrollView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder='username'
        value={text}
      />
      <Button
        title="Submit"
        onPress={handleSubmit}
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

      <Text><h1>Decks</h1></Text>
      {deckList.map((deck) => 
        <Text key={deck.id}>
          deck name: {deck.deckName}
          {'\n'}
          <h3>cards:</h3>
          {deck.cards.map((c : any) => {
              return ( "front: " + c.front + "\nback: " + c.back + "\n-----------------\n" ) 
            })
          }
        </Text>
      )}
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
