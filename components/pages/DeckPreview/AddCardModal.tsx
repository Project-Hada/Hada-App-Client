// AddCardModal.js
import React, { useContext, useState } from "react";
import { Pressable, View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "../../../utils/contexts/ThemeContext";
import { FlashCardType, PlaylistType } from "../../../utils/types";
import FlashcardContext from "../../../utils/contexts/LibraryContext";

interface AddCardModalProps {
  isVisible: boolean;
  onAdd: (koreanWord: string, englishWord: string) => void;
  onUpdate?: (
    playlist: PlaylistType,
    flashcardId: number,
    updatedFlashcard: FlashCardType
  ) => void;
  onDelete?: (playlist: PlaylistType, flashcardId: number) => void;
  onCancel: () => void;
  koreanWordInitial: string;
  englishWordInitial: string;
  isEditMode: boolean;
  flashcardId?: string;
  createdAt?: string;
  flashcardIndex?:number
}

const AddCardModal: React.FC<AddCardModalProps> = ({
  isVisible,
  onAdd,
  onCancel,
  onUpdate,
  onDelete,
  koreanWordInitial,
  englishWordInitial,
  isEditMode = false,
  flashcardId,
  createdAt,
  flashcardIndex
}) => {
  const { theme } = useTheme(); // this needs to be at the top

  const [koreanWord, setKoreanWord] = useState(koreanWordInitial);
  const [englishWord, setEnglishWord] = useState(englishWordInitial);

  const { currPlaylist } = useContext(FlashcardContext);

  const handleConfirm = () => {
    console.log("ID: ", flashcardId, "Index: ", flashcardIndex, koreanWord, englishWord);
    if (isEditMode && flashcardIndex != null) {
      // Construct the updated flashcard object
      const updatedFlashcard: FlashCardType = {
        // id: flashcardId,
        term: koreanWord,
        definition: englishWord,
        createdAt,
      };
      // Assuming the playlist ID is available in this scope as `playlistId`
      onUpdate!(currPlaylist!, flashcardIndex, updatedFlashcard);
    } else {
      onAdd(koreanWord, englishWord);
      setKoreanWord("");
      setEnglishWord("");
    }
  };

  const handleDelete = () => {
    if (isEditMode && flashcardIndex != null) {
      onDelete!(currPlaylist!, flashcardIndex);
    }
    // Close modal
    isVisible = false
  };

  if (!isVisible) {
    return null;
  }

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
      backgroundColor: theme.colors.container,
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
      color: theme.colors.text,
    },
    subHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    wordCount: {
      fontFamily: "GeneralSans-Regular",
      fontSize: 14,
      color: "#B6B6B6",
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
      borderColor: theme.colors.subtext,
      paddingVertical: 9,
      marginVertical: 5,
      borderRadius: 4,
      textAlign: "left",
      paddingLeft: 13,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    addingEnglishText: {
      borderWidth: 1,
      borderColor: theme.colors.subtext,
      marginVertical: 5,
      paddingVertical: 7,
      borderRadius: 4,
      textAlign: "left",
      paddingLeft: 13,
      color: theme.colors.subtext,
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
    },
    termText: {
      fontSize: 22,
      fontFamily: "GeneralSans-Bold",
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
      backgroundColor: theme.colors.icons,
      alignItems: "center",
      justifyContent: "center",
    },
    previewBadgeText: {
      paddingTop: 4,
      fontFamily: "GeneralSans-Bold",
      fontSize: 26,
      color: "white",
    },
    practiceButton: {
      margin: 20,
      padding: 20,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.accent,
      alignItems: "center",
      justifyContent: "center",
    },
    practiceButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "GeneralSans-Bold",
    },
    playButton: {},
    addCardText: {
      fontFamily: "GeneralSans-Semibold",
      fontSize: 20,
    },
  });

  return (
    <View style={styles.addingContainer}>
      <TextInput
        style={styles.addingKoreanText}
        onChangeText={(text) => setKoreanWord(text)}
        value={koreanWord}
        placeholder="Type Korean Word"
        placeholderTextColor={"#000"}
        keyboardType="default"
      />
      <TextInput
        style={styles.addingEnglishText}
        onChangeText={(text) => setEnglishWord(text)}
        value={englishWord}
        placeholder="Enter English Word Here"
        keyboardType="default"
      />
      <View style={styles.addingButtonContainer}>
        <Pressable
          style={styles.cancelButton}
          onPress={!isEditMode ? onCancel : handleDelete}
        >
          <Text style={styles.cancelButtonText}>
            {isEditMode ? "Delete" : "Cancel"}
          </Text>
        </Pressable>
        <Pressable style={styles.addButton} onPress={handleConfirm}>
          <Text style={styles.addButtonText}>
            {isEditMode ? "Update" : "Add"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddCardModal;
