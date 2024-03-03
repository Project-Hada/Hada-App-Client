// _layout.tsx
import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import LibraryScreen from '../pages/library';
import DeckPreview from '../pages/deckprev';
import PracticeScreen from '../pages/practice';
import flashCards from './fakeData';

const playlistData = [
    {
        title: "Someone's Study Set",
        playlist: flashCards
    },
    {
        title: "Someone's Study Set",
        playlist: flashCards
    },
    {
        title: "Someone's Study Set",
        playlist: flashCards
    },
];

const libraryHeader = () => {
    return (
      <SafeAreaView style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            Library
          </Text>
      </SafeAreaView>
    )
}

const {Navigator, Screen} = createStackNavigator();

const AppStack = () => {
    return (
        <Navigator>
            <Screen
            name="pages/library"
            component={LibraryScreen}
            initialParams={{ playlistData }} // Pass the playlist data with flashcards from context
            options={{ header: libraryHeader }}
            />
            <Screen
            name="pages/deckprev"
            component={DeckPreview}
            options={{ headerShown: false }}
            />
            <Screen
            name="pages/practice"
            component={PracticeScreen}
            options={{ headerShown: false }}
            />
            {/* Add other screens here */}
        </Navigator>  
    )  
}

export default function Router({meep}: any) {

  return (
    <AppStack/>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#F2E8E1",
  },
  headerTitle: {
    fontFamily: 'GeneralSans-Bold',
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 30,
    color: 'black',
    fontWeight: "bold",
    backgroundColor: "transparent"
    },
});
