// _layout.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import LibraryScreen from "./pages/Library";
import DeckPreview from "./pages/DeckPreview/DeckPreview";
import { PracticeScreen } from "./pages/Practice";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../utils/contexts/ThemeContext";

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Navigator
        screenOptions={{
          cardStyle: { flex: 1, backgroundColor: "transparent" },
        }}
        initialRouteName="LibraryScreen"
      >
        <Screen
          name="LibraryScreen"
          component={LibraryScreen}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Screen
          name="DeckPreview"
          component={DeckPreview}
          options={{ headerShown: false, presentation: "modal" }}
        />
        <Screen
          name="PracticeScreen"
          component={PracticeScreen}
          options={{ headerShown: false, presentation: "modal" }}
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
    backgroundColor: "transparent",
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
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
