import React from "react";
import { StyleSheet, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

export default function AddButton() {
  return (
    <View style={styles.addIconContainer}>
      <View style={styles.addIconOutline} />
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
    backgroundColor: "#fff",
    width: 26,
    height: 26,
    top: 5,
    left: 3,
    position: "absolute",
    borderColor: "#000",
    borderWidth: 5,
    borderRadius: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
});
