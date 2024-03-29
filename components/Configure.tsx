import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import Router from "./Router";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import LibraryContext from "../utils/contexts/LibraryContext";
import libraryData from "../Data/fakeData";
import { Audio } from "expo-av";
import { useTheme } from "../utils/contexts/ThemeContext";

export default function Configure() {
  /**
   * VVV Always call useState at the top level VVV
   * If you get a re-render issue make sure it correctly order your useStates
   * Here it's important that setLibrary is called top level to avoid rerenders
   */

  // Calling Dummy data
  const { setLibrary } = useContext(LibraryContext);

  // Call useFonts at the top level
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    "GeneralSans-Bold": require("../assets/fonts/GeneralSans-Bold.otf"),
    "GeneralSans-BoldItalic": require("../assets/fonts/GeneralSans-BoldItalic.otf"),
    "GeneralSans-Extralight": require("../assets/fonts/GeneralSans-Extralight.otf"),
    "GeneralSans-ExtralightItalic": require("../assets/fonts/GeneralSans-ExtralightItalic.otf"),
    "GeneralSans-Italic": require("../assets/fonts/GeneralSans-Italic.otf"),
    "GeneralSans-Light": require("../assets/fonts/GeneralSans-Light.otf"),
    "GeneralSans-LightItalic": require("../assets/fonts/GeneralSans-LightItalic.otf"),
    "GeneralSans-Medium": require("../assets/fonts/GeneralSans-Medium.otf"),
    "GeneralSans-Regular": require("../assets/fonts/GeneralSans-Regular.otf"),
    "GeneralSans-Semibold": require("../assets/fonts/GeneralSans-Semibold.otf"),
    "GeneralSans-SemiboldItalic": require("../assets/fonts/GeneralSans-SemiboldItalic.otf"),
    "GeneralSans-Variable": require("../assets/fonts/GeneralSans-Variable.ttf"),
  });

  useEffect(() => {
    // This will set the library data when the component mounts
    setLibrary(libraryData);
  }, [setLibrary]); // Empty dependency array ensures this effect only runs once

  //Fixing sound bug if IOS has silent mode on
  const soundObject = new Audio.Sound();
  useEffect(() => {
    const enableSound = async () => {
      if (Platform.OS === "ios") {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });
        await soundObject.loadAsync(require("../soundFile.mp3"));
        await soundObject.playAsync();
      }
    };
    enableSound();
  });
  const { theme } = useTheme();

  // don't load if the fonts haven't loaded yet
  if (!loaded) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.backgroundColor }}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.backgroundColor}
      />
      <Router />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
