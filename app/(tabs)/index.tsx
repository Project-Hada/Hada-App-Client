import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';

import { useState, useEffect } from 'react'

import { addNewUser, getAllUsers, updateUserById, deleteUserById } from '../services/usersFunctions';
import { addNewDeck, getAllDecks, updateDeckById, deleteDeckById, addNewCardToDeck, deleteCardInDeck, updateCardInDeck } from '../services/decksFunctions';

export default function TabOneScreen() {
  // save database collection as state
  const [deckList, setDeckList] = useState<{id: string; [key: string]: any; }[]>([]);
  const [userList, setUserList] = useState<{id: string; [key: string]: any; }[]>([]);

  // for input form
  const [userInput, setUserInput] = useState('');
  const [deckInput, setDeckInput] = useState('');
  const [userUpdateInput, setUserUpdateInput] = useState('');
  const [deckUpdateInput, setDeckUpdateInput] = useState('');

  // READ function and set them locally 
  const getUsersList = async () => await getAllUsers(setUserList); 
  const getDecksList = async () => await getAllDecks(setDeckList);

  useEffect(() => {
    getUsersList();
    getDecksList();
  }, [])


  const handleSubmitForUserInput = async () => {
    await addNewUser(userInput);

    getUsersList();
    setUserInput("")
  }

  const handleSubmitForDeckInput = async () => {
    // TODO: when auth is set up, add proper user
    const testUserId = userList[0].id;  // TEST:: get the first user
    await addNewDeck(testUserId, deckInput);
    
    getDecksList();
    setDeckInput("")
  }

  const handleUpdateUsername = async (uid: String) => {
    await updateUserById(uid, {username: userUpdateInput});

    setUserUpdateInput("")
    getUsersList();
  }

  const handleUpdateDeckName = async (did: String) => {
    await updateDeckById(did, {deckName: deckUpdateInput});

    setDeckUpdateInput("")
    getDecksList();
  }

  const handleDeleteUser = async ( uid: String ) => {
    await deleteUserById(uid);
    getUsersList();
  }

  const handleDeleteDeck = async ( did: String ) => {
    await deleteDeckById(did);
    getDecksList();
  }

  // TODO: update the inputs
  const handleAddNewCard = async (did: String) => {
    await addNewCardToDeck(did, "hereisthefront", "hereistheback");
    getDecksList();
  }

  const handleDeleteCard = async (did: String, cardIndex: number) => {
    await deleteCardInDeck(did, cardIndex);
    getDecksList();
  }

  // TODO: update the inputs
  const handleUpdateCard = async (did: String, cardIndex: number) => {
    await updateCardInDeck(did, cardIndex, "thisIsNewFront", "thisIsNewBack");
    getDecksList();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView style={styles.leftView} showsVerticalScrollIndicator={false}>
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
          <View key={user.id}>
            {/* delete */}
            <Button
              title="Delete"
              color="red"
              onPress={() => handleDeleteUser(user.id)}
            />
            
            {/* update eg. -- updating username */}
            <TextInput
              style={styles.input}
              onChangeText={setUserUpdateInput}
              placeholder='new username'
              placeholderTextColor="#D3D3D3" 
              value={userUpdateInput}
            />
            <Button
              title="Update"
              color="#f0e800"
              onPress={() => handleUpdateUsername(user.id)}
            />


            <Text> 
              <h3>username:</h3> {user.username}
              {'\n'}
              <h3>dateJoined:</h3> {user.dateJoined} 
              {"\n-------------------"}
            </Text>
          </View>
        )}
      </ScrollView>

      
      <ScrollView style={styles.rightView} showsVerticalScrollIndicator={false}>
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
          <View key={deck.id}>
            {/* delete */}
            <Button
              title="Delete"
              color="red"
              onPress={() => handleDeleteDeck(deck.id)}
            />

            {/* update -- eg. updating deck name */}
            <TextInput
              style={styles.input}
              onChangeText={setDeckUpdateInput}
              placeholder='new deck name'
              placeholderTextColor="#D3D3D3" 
              value={deckUpdateInput}
            />
            <Button
              title="Update"
              color="#f0e800"
              onPress={() => handleUpdateDeckName(deck.id)}
            />
            <Button
              title="Add Test Card"
              color="green"
              onPress={() => handleAddNewCard(deck.id)}
            />
            <Button
              title="Update Last Card"
              color="green"
              onPress={() => handleUpdateCard(deck.id, deck.cards.length-1)}
            />
            <Button
              title="Delete Last Card"
              color="green"
              onPress={() => handleDeleteCard(deck.id, -1)}
            />
            <Text>
              {'-------------------------------------------------------\n'}
              deck name: {deck.deckName}
              {'\n'}
              <h3>cards:</h3>
              {deck.cards.map((c : any) => {
                  return ( "front: " + c.front + "\nback: " + c.back + "\n-----------------\n" ) 
                })
              }
            </Text>
          </View>
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
    backgroundColor: "white"
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
