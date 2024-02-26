// _layout.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from './pages/library'; // Update the path as needed
import DeckPreview from './pages/deckprev'; // Update the path as needed
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import PracticeScreen from './pages/practice';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/build/FontAwesome';
import flashCards from './fakeData';

const Stack = createStackNavigator();

export default function RootLayout() {
  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
    'GeneralSans-Bold': require('../assets/fonts/GeneralSans-Bold.otf'),
    'GeneralSans-BoldItalic': require('../assets/fonts/GeneralSans-BoldItalic.otf'),
    'GeneralSans-Extralight': require('../assets/fonts/GeneralSans-Extralight.otf'),
    'GeneralSans-ExtralightItalic': require('../assets/fonts/GeneralSans-ExtralightItalic.otf'),
    'GeneralSans-Italic': require('../assets/fonts/GeneralSans-Italic.otf'),
    'GeneralSans-Light': require('../assets/fonts/GeneralSans-Light.otf'),
    'GeneralSans-LightItalic': require('../assets/fonts/GeneralSans-LightItalic.otf'),
    'GeneralSans-Medium': require('../assets/fonts/GeneralSans-Medium.otf'),
    'GeneralSans-Regular': require('../assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-Semibold': require('../assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-SemiboldItalic': require('../assets/fonts/GeneralSans-SemiboldItalic.otf'),
    'GeneralSans-Variable': require('../assets/fonts/GeneralSans-Variable.ttf'),
  });
  
  function libraryHeader () {
  
    return (
      <SafeAreaView style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            Library
          </Text>
      </SafeAreaView>
    )
  }

  if (!loaded) {
    // You can return a loading indicator here if you like
    return <View style={styles.loadingContainer}></View>;
  }

  const dummyData = [
    {
        name: "access-point", 
        title: "Someone's Study Set",
        words: flashCards
    },
    {
        name: "access-point", 
        title: "Someone's Study Set",
        words: flashCards
    },
    {
        name: "access-point", 
        title: "Someone's Study Set",
        words: flashCards
    },
];
  
  return (
    <Stack.Navigator>
    <Stack.Screen 
      name="pages/library" 
      component={LibraryScreen} 
      initialParams={{ playlistData: dummyData }} // Pass initial params here
      options={{
        header: libraryHeader
      }}
    />
    <Stack.Screen 
      name="pages/deckprev" 
      component={DeckPreview} 
      initialParams={{ flashCards: flashCards }} // Pass initial params here
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen 
      name="pages/practice" 
      component={PracticeScreen} 
      initialParams={{ flashCards: flashCards }} // Pass initial params here
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
  headerTitle: {
    fontFamily: 'GeneralSans-Bold',
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 30,
    color: 'black',
    fontWeight: "bold",
    backgroundColor: "transparent"
},
loadingContainer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
});
