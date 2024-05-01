// _layout.tsx
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import LibraryScreen from "./pages/Library";
import DeckPreview from "./pages/DeckPreview/DeckPreview";
import { PracticeScreen } from "./pages/Practice";
import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "../utils/contexts/ThemeContext";
import { LoginScreen } from "./pages/UserAuth/LoginScreen";
import { RegisterScreen } from "./pages/UserAuth/RegisterScreen";
import SettingsScreen from "./pages/Settings";

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  const options = {
    headerShown: false,
    presentation:
      Platform.OS === "ios" ? ("card" as const) : ("modal" as const),
  };

  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Navigator
        screenOptions={{
          cardStyle: { flex: 1, backgroundColor: "transparent" },
        }}
        initialRouteName="LoginScreen"
      >
        <Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
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
    paddingTop: Platform.OS === "android" ? 0 : 0,
  },
});
