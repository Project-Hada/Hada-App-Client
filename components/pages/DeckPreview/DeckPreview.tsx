import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Feather,
  Foundation,
} from "@expo/vector-icons";
import FlashcardContext from "../../../utils/contexts/LibraryContext";
import speak from "../../../utils/tts";
import { TextInput } from "react-native-gesture-handler";
import AddButton from "../../AddButton";
import generateId from "../../../utils/idGenerator";
import AddCardModal from "./AddCardModal";
import PreviewCard from "./PreviewCard";
import { FlashCardType } from "../../../utils/types";
import { useTheme } from "../../../utils/contexts/ThemeContext";

// For Korean regex
import * as Hangul from "hangul-js";

type DeckPreviewProps = {
  navigation: any;
};

export default function DeckPreview({ navigation, route }: any) {
  const { currPlaylist, addFlashcard, updateFlashcard, deleteFlashcard } =
    useContext(FlashcardContext);

  const flashcards = currPlaylist ? currPlaylist.playlist : [];

  // State to track the selected card for editing
  const [selectedCard, setSelectedCard] = useState<FlashCardType | null>(null);
  const [isAddingVisible, setIsAddingVisible] = useState(false);

  const handleCancel = () => {
    setIsAddingVisible(false);
    setSelectedCardId(null);
  };
  const handleOpenAdd = () => {
    setIsAddingVisible(true);
    setSelectedCardId(null);
  };
  const handleAdd = (koreanWord: string, englishWord: string) => {
    if (currPlaylist && currPlaylist.id) {
      const newFlashcard = {
        id: generateId(), // Generate a unique ID for the new flashcard
        term: koreanWord,
        definition: englishWord,
      };

      addFlashcard(currPlaylist.id, newFlashcard);

      // Close the modal and reset the form fields
      setIsAddingVisible(false);
    }
    setSelectedCardId(null);
  };

  // Storing the search term
  const [searchTerm, setSearchTerm] = useState("");

  // set thing the search word
  const handleSearchWord = (term: string) => {
    {
      /* Search word feature here */
    }
    setSearchTerm(term);
  };

  const flashcardsArray = currPlaylist
    ? Object.values(currPlaylist.playlist).sort(
        (a, b) => b.createdAt - a.createdAt
      )
    : [];

  // Filtering Flashcard by korean / english search term
  const filterFlashcards = (flashcards: FlashCardType[]) => {
    return flashcards.filter((flashcard) => {
      const koreanMatch = Hangul.search(flashcard.term, searchTerm) >= 0;
      const englishMatch = flashcard.definition
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return koreanMatch || englishMatch;
    });
  };

  // Use this filtered array for your FlatList:
  const filteredFlashcards = filterFlashcards(flashcardsArray);

  const AddCardButton = () => {
    return (
      <TouchableOpacity onPress={handleOpenAdd}>
        <View style={styles.listItem}>
          <View style={styles.previewBadge}>
            <MaterialCommunityIcons name="plus-thick" size={30} color="white" />
          </View>
          <View style={styles.termContainer}>
            <Text style={styles.addCardText}> Add Card </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Function to handle card press
  const handleCardPress = (cardId: string) => {
    setSelectedCardId(selectedCardId === cardId ? null : cardId);
    setIsAddingVisible(false);
  };

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    pressableArea: {
      flex: 1,
    },
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
      borderWidth: 1,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderRadius: 10,
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
      borderWidth: 1,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderRadius: 10,
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
      borderWidth: 1,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderRadius: 10,
      borderColor: theme.colors.border,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 20,
      borderWidth: 1,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderRadius: 10,
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
      borderWidth: 1,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      borderRadius: 10,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>{currPlaylist?.title}</Text>
            <View style={styles.subHeader}>
              <MaterialCommunityIcons
                name="cards-variant"
                size={22}
                color="#B6B6B6"
              />
              <Text style={styles.wordCount}>
                {Object.keys(flashcards).length} words
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleOpenAdd}>
            <AddButton />
          </TouchableOpacity>
          {/* further discussion needed on adding this with the other add option */}
        </View>
      </View>

      {/* Search word input */}
      <View style={OldStyles.searchContainer}>
        <AntDesign name="search1" style={OldStyles.searchIcon} />
        <TextInput
          style={OldStyles.searchInput}
          onChangeText={handleSearchWord}
          value={searchTerm}
          placeholder="Search"
          keyboardType="default"
        />
      </View>

      {/* Adding new card modal */}
      <AddCardModal
        isVisible={isAddingVisible}
        onAdd={handleAdd}
        onCancel={handleCancel}
        koreanWordInitial={""}
        englishWordInitial={""}
        isEditMode={false}
      />
      {/* List of cards display */}

      <FlatList
        // Filtering word using filter()
        data={filteredFlashcards}
        renderItem={({ item }) => (
          // The modal is now tied to the selectedCardId state.
          // It will open for the card that was last pressed.
          <View>
            <PreviewCard
              term={item.term}
              definition={item.definition}
              onPress={() => handleCardPress(item.id)}
            />

            {selectedCardId === item.id && (
              <AddCardModal
                isVisible={selectedCardId !== null}
                onAdd={handleAdd} // Used for adding a new card
                onUpdate={() => updateFlashcard}
                onDelete={() => deleteFlashcard}
                onCancel={handleCancel}
                koreanWordInitial={selectedCard?.term || ""}
                englishWordInitial={selectedCard?.definition || ""}
                isEditMode={true}
              />
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={AddCardButton}
        extraData={selectedCardId} // Ensure FlatList re-renders when selectedCardId changes
      />

      {/* Practice Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("PracticeScreen")}
        style={styles.practiceButton}
      >
        <Text style={styles.practiceButtonText}>Practice</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

{
  /* {selectedCardId === item.id && (
              <AddCardModal
                isVisible={true}
                onAdd={handleAdd}
                onCancel={handleCancel}
                koreanWordInitial={item.term}
                englishWordInitial={item.definition}
                isEditMode={true}
              />
            )} */
}
export const OldStyles = StyleSheet.create({
  searchContainer: {
    paddingVertical: 5,
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 20,
    borderColor: "#000000",
  },
  searchIcon: {
    paddingLeft: 10,
    fontSize: 20,
    color: "#000000",
  },
  searchInput: {
    width: "100%",
    paddingLeft: 10,
  },
  pressableArea: {
    flex: 1,
  },
  playButtonContainer: {
    width: 41,
    height: 41,
    backgroundColor: "#FFDF37",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    paddingLeft: 4,
  },
  container: {
    flex: 1,
    backgroundColor: "#F2E8E1",
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
    color: "#B6B6B6",
    paddingLeft: 4,
  },
  addingContainer: {
    flexDirection: "column",
    padding: 20,
    marginBottom: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    borderColor: "#000000",
    backgroundColor: "white",
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
    backgroundColor: "#FF454C",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    borderColor: "#000000",
  },
  addButtonText: {
    fontFamily: "GeneralSans-Bold",
  },
  addButton: {
    width: "65%",
    backgroundColor: "#72DA4F",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    borderColor: "#000000",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 5,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    borderColor: "#000000",
    backgroundColor: "white",
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
    color: "#A7A7A7",
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
  practiceButton: {
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 10,
    borderColor: "#000000",
    backgroundColor: "#FFDF37",
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
