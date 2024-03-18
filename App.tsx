import React, {useEffect} from "react";
import Configure from "./components/Configure";
import { LibraryProvider } from "./utils/contexts/LibraryContext";
import { StyleSheet, Text, View, Platform, SafeAreaView } from "react-native";
import { Audio } from "expo-av";
import { ThemeProvider, useTheme } from "./utils/contexts/ThemeContext";
import { StatusBar } from 'react-native';
import { colors } from "./components/theme/Colors";


const soundObject = new Audio.Sound();
 
export default function App() {
  useEffect(() => {
    const enableSound = async () => {
      if (Platform.OS === "ios") {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });
        await soundObject.loadAsync(require("./soundFile.mp3"));
        await soundObject.playAsync();
      }
    };
    enableSound();
  });
 const {theme} = useTheme();

  return (
    <ThemeProvider>
      <LibraryProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.backgroundColor }}>
          <StatusBar barStyle="light-content" backgroundColor={theme.colors.backgroundColor} />
          <Configure />
        </SafeAreaView>
      </LibraryProvider>
    </ThemeProvider>
  );
}
