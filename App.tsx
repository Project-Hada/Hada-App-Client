import React, {useEffect} from "react";
import Configure from "./components/Configure";
import { LibraryProvider } from "./utils/contexts/LibraryContext";
import * as Speech from "expo-speech";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Audio } from "expo-av";

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

  return (
    <LibraryProvider>
      <Configure />
    </LibraryProvider>
  );
}
