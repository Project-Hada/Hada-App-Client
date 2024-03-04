// _layout.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import LibraryScreen from './pages/Library';
import DeckPreview from './pages/DeckPreview';
import { PracticeScreen } from './pages/Practice';
import { NavigationContainer } from '@react-navigation/native';




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
        <Navigator initialRouteName='LibraryScreen'>
            <Screen
            name="LibraryScreen"
            component={LibraryScreen}
            options={{ header: libraryHeader }}
            />
            <Screen
            name="DeckPreview"
            component={DeckPreview}
            options={{ headerShown: false }}
            />
            <Screen
            name="PracticeScreen"
            component={PracticeScreen}
            options={{ headerShown: false }}
            />
            {/* Add other screens here */}
        </Navigator>  
    )  
}

export default function Router() {

  return (
    <NavigationContainer>
        <AppStack/>
    </NavigationContainer>
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