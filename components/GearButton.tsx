import React from "react";
import { useTheme } from "../utils/contexts/ThemeContext";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const GearButton = () => {
  const { toggleTheme } = useTheme();

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    gearButtonContainer: {
      position: "relative",
      padding: 8,
      marginLeft: 4,
    },
  });

  // Return the button element
  return (
    <View style={styles.gearButtonContainer}>
      <TouchableOpacity onPress={toggleTheme}>
        <Octicons name="gear" size={28} color={theme.colors.gearButton} />
        {/* <MaterialCommunityIcons name="theme-light-dark" size={28} color={theme.colors.gearButton} /> */}
      </TouchableOpacity>
    </View>
  );
};

export default GearButton;
