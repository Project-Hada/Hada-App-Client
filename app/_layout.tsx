// _layout.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from './pages/library'; // Update the path as needed
import DeckPreview from './pages/deckprev'; // Update the path as needed
import SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Stack = createStackNavigator();
function libraryHeader () {
  return (
    <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.headertitle}>
          Library
        </Text>
    </SafeAreaView>
  )
}

export default function RootLayout() {

  return (
      <Stack.Navigator>
        <Stack.Screen 
          name="pages/library" 
          component={LibraryScreen} 
          options={{
            header: libraryHeader
          }}
        />
        <Stack.Screen 
          name="pages/deckprev" 
          component={DeckPreview} 
          options={{
            headerShown: false
          }}
        />
        {/* Add other screens here */}
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#F2E8E1",
  },
  headertitle: {
    fontFamily: 'GeneralSans-Bold',
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 30,
    color: 'black',
    fontWeight: "bold",
    backgroundColor: "transparent"
},
});
