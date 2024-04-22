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
  const { theme } = useTheme();

  const previewColors = [
    // TBD
    "#90CF8E",
    "#A7DCA5",
    "#C6EDC3",
    "#E4FDE1",
    "#EFFDEE",
  ];

  // This is just for some different colors for each icon (Future: icons should correspond to how well the user knows the word)
  const getColorForTerm = (term: string) => {
    const index = term.charCodeAt(0);
    return previewColors[index % previewColors.length];
  };

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
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      paddingHorizontal: 4,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: 20,
      backgroundColor: "transparent",
    },
    backIcon: {
      paddingTop: 4,
    },
    headerContent: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingRight: 35,
    },
    headerInfo: {
      flexDirection: "column",
      justifyContent: "center",
    },
    headerTitle: {
      fontFamily: "GeneralSans-Semibold",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
    },
    subHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    wordCount: {
      fontFamily: "GeneralSans-Regular",
      fontSize: 14,
      color: theme.colors.subtext,
      paddingLeft: 4,
    },
    addingContainer: {
      flexDirection: "column",
      padding: 20,
      marginBottom: 5,
      marginHorizontal: 20,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.container,
    },
    addingKoreanText: {
      fontSize: 16,
      borderWidth: 1,
      paddingVertical: 9,
      marginVertical: 5,
      borderRadius: 4,
      textAlign: "left",
      paddingLeft: 13,
      fontWeight: "bold",
    },
    addingEnglishText: {
      borderWidth: 1,
      marginVertical: 5,
      paddingVertical: 7,
      borderRadius: 4,
      textAlign: "left",
      paddingLeft: 13,
    },
    addingButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      marginTop: 20,
    },
    cancelButtonText: {
      fontFamily: "GeneralSans-Bold",
    },
    cancelButton: {
      width: "30%",
      backgroundColor: theme.colors.redButton,
      textAlign: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
    },
    addButtonText: {
      fontFamily: "GeneralSans-Bold",
    },
    addButton: {
      width: "65%",
      backgroundColor: theme.colors.greenButton,
      textAlign: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 10,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
    },

    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 20,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.container,
    },
    termContainer: {
      flexDirection: "column",
      flex: 1,
      marginLeft: 55,
    },
    termText: {
      fontSize: 22,
      fontFamily: theme.typography.fonts.boldFont,
      color: theme.colors.text,
    },
    term: {
      fontSize: 16,
      color: theme.colors.subtext,
      fontFamily: theme.typography.fonts.mediumFont,
      marginTop: -4,
    },
    previewBadge: {
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: theme.spacing.library.iconMarginHorizontal,
      marginLeft: 0,
      borderTopLeftRadius: 9,
      borderBottomLeftRadius: 6,
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 60,
      backgroundColor: theme.colors.icons,
    },
    previewBadgeText: {
      paddingTop: 4,
      fontFamily: theme.typography.fonts.boldFont,
      fontSize: theme.typography.deckPreview.previewTextSize,
      color: "black",
    },
    practiceButton: {
      margin: 20,
      padding: 20,
      borderWidth: theme.spacing.borderWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.accent,
      alignItems: "center",
      justifyContent: "center",
    },
    practiceButtonText: {
      fontSize: theme.typography.deckPreview.practiceButtonSize,
      fontFamily: theme.typography.fonts.boldFont,
    },
    playButton: {},
    addCardText: {
      fontFamily: theme.typography.fonts.semiboldFont,
      fontSize: theme.typography.deckPreview.addCardtextSize,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.listItem, theme.shadow.default]}>
        <View
          style={[
            styles.previewBadge,
            { backgroundColor: getColorForTerm(term) },
          ]}
        >
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
