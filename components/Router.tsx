// _layout.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LibraryScreen from "./pages/Library";
import DeckPreview from "./pages/DeckPreview/DeckPreview";
import { PracticeScreen } from "./pages/Practice";
import { LoginScreen } from "./pages/UserAuth/LoginScreen";
import { RegisterScreen } from "./pages/UserAuth/RegisterScreen";
import { BackendDemo } from "./pages/demoIndex"
import { useTheme } from "../utils/contexts/ThemeContext";


const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  const options = {
    headerShown: false,
    presentation:
      Platform.OS === "ios" ? ("card" as const) : ("modal" as const),
  };

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Navigator initialRouteName="LoginScreen">
        <Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="BackendDemo"
          component={BackendDemo}
          options={{ headerShown: false }}
        />


<!--       <Navigator
        screenOptions={{
          cardStyle: { flex: 1, backgroundColor: "transparent" },
        }}
        initialRouteName="LibraryScreen"
      > -->
        <Screen
          name="LibraryScreen"
          component={LibraryScreen}
          options={options}
        />
        <Screen name="DeckPreview" component={DeckPreview} options={options} />
        <Screen
          name="PracticeScreen"
          component={PracticeScreen}
          options={options}
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
