import React from "react";
import { StyleSheet, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

import { useTheme } from "../utils/contexts/ThemeContext";

export default function AddButton() {
  const { theme } = useTheme();
  return (
    <View style={styles.addIconContainer}>
      <View style={[styles.addIconOutline, theme.shadow.addBtn]} />
      <Octicons
        style={styles.addIcon}
        name="diff-added"
        size={30}
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addIconContainer: {
    position: "relative",
    paddingRight: 4,
  },
  addIcon: {},
  addIconOutline: {
    backgroundColor: "#FFFFFF",
    width: 26,
    height: 26,
    top: 5,
    left: 3,
    position: "absolute",
  },
});
