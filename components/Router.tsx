// _layout.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import LibraryScreen from "./pages/Library";
import DeckPreview from "./pages/DeckPreview/DeckPreview";
import { PracticeScreen } from "./pages/Practice";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./LoginScreen";

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Navigator initialRouteName="LoginScreen">
        <Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Screen
          name="LibraryScreen"
          component={LibraryScreen}
          options={{ headerShown: false }}
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
    </SafeAreaView>
  );
};

export default function Router() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2E8E1",
  },
  headerTitle: {
    fontFamily: "GeneralSans-Bold",
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 30,
    color: "black",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: "#F2E8E1",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
