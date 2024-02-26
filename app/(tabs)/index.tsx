import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

import { useState, useEffect } from 'react'
import { db } from "../data/firebaseConfig"
import { doc, getDoc, getDocs, collection, DocumentReference, DocumentData } from 'firebase/firestore';

export default function TabOneScreen() {
  const [deckList, setDeckList] = useState<{id: string; [key: string]: any; }[]>([]);
  const [userList, setUserList] = useState<{id: string; [key: string]: any; }[]>([]);
  const usersCollectionRef = collection(db, "users")
  const decksCollectionRef = collection(db, "decks")

  useEffect(() => {
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

    getUsersList();
  }, [])

  useEffect(() => {
    const getDeckList = async () => {
      try {
        const data = await getDocs(decksCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));

        setDeckList(filteredData);
        // console.log("users\n", filteredData);
      }
      catch (err) {
        console.log(err);
      }
    }

    getDeckList();
  }, [userList])

  return (
    <View style={styles.container}>

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
        <Text key={deck.id}> fi
          deck name: {deck.deckName}
          {'\n'}
          
          <h3>cards:</h3>
          {deck.cards.map((c : any) => {
              return (
                  "front: " + c.front + "\nback: " + c.back + "\n-------------------\n"
              )
            })
          }
        </Text>
      )}
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
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
});
