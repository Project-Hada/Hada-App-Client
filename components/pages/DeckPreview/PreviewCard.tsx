import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import speak from "../../../utils/tts";
import { useTheme } from "../../../utils/contexts/ThemeContext";

interface PreviewCardProps {
  term: string;
  definition: string;
  onPress: () => void;
}

const handleAudio = (text: string, language: string) => {
  speak(text, language);
};

const PreviewCard: React.FC<PreviewCardProps> = ({
  term,
  definition,
  onPress,
}) => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    playButtonContainer: {
      width: 41,
      height: 41,
      backgroundColor: theme.colors.accent,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 100,
      paddingLeft: 4,
    }, 
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 20,
      backgroundColor: theme.colors.container,
    },
    termContainer: {
      flexDirection: "column",
      flex: 1,
    },
    termText: {
      fontSize: 22,
      fontFamily: "GeneralSans-Bold",
      color: theme.colors.text,
    },
    term: {
      fontSize: 16,
      color: theme.colors.subtext,
      fontFamily: "GeneralSans-Medium",
      marginTop: -4,
    },
    previewBadge: {
      width: 48,
      height: 48,
      borderRadius: 10,
      marginRight: 16,
      backgroundColor: "#7F9CEF",
      alignItems: "center",
      justifyContent: "center",
    },
    previewBadgeText: {
      paddingTop: 4,
      fontFamily: "GeneralSans-Bold",
      fontSize: 26,
      color: "white",
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.listItem, theme.shadow.default]}>
        <View style={styles.previewBadge}>
          <Text style={styles.previewBadgeText}>{term.slice(0, 1)}</Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termText}>{term}</Text>
          <Text style={styles.term}>{definition}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleAudio(term, "ko-KR");
            handleAudio(definition, "en-US");
          }}
        >
          <View style={styles.playButtonContainer}>
            <Feather name="play" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PreviewCard;
