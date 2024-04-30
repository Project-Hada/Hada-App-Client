import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import FlashcardContext from "../../../utils/contexts/LibraryContext";
import AddButton from "../../AddButton";
import generateId from "../../../utils/idGenerator";
import AddCardModal from "./AddCardModal";
import PreviewCard from "./PreviewCard";
import { FlashCardType, PlaylistType } from "../../../utils/types";
import { useTheme } from "../../../utils/contexts/ThemeContext";

import Search from "./Search";

// For Korean regex
import * as Hangul from "hangul-js";
import GearButton from "../../GearButton";
import LibraryScreen from "../Library";

type DeckPreviewProps = {
  navigation: any;
};

export default function DeckPreview({
  navigation,
  route,
  withinModal = false,
}: any) {
  const { currPlaylist, addFlashcard, updatePlaylistTitle, updateFlashcard, deleteFlashcard } =
    useContext(FlashcardContext);

  const flashcards = currPlaylist ? currPlaylist.playlist : [];

  // State to track the selected card for editing
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [isAddingVisible, setIsAddingVisible] = useState(false);

  useEffect(() => {
    // Ensure that currPlaylist is not null before proceeding
    if (currPlaylist) {
      const playlist = currPlaylist.playlist;

      Object.keys(playlist).forEach((flashcardKey) => {
        const flashcard = playlist[flashcardKey];

        // Check if the flashcard has an empty or undefined id
        if (!flashcard.id || flashcard.id === "") {
          // The flashcard doesn't have an ID, generate a new one
          const newId = generateId();
          const updatedFlashcard = { ...flashcard, id: newId };

          // Update the flashcard using the provided updateFlashcard function
          updateFlashcard(currPlaylist, flashcardKey, updatedFlashcard);
        }
      });
    }
  }, [currPlaylist]);

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
        passes: 0,
        fails: 0,
      };

      addFlashcard(currPlaylist, newFlashcard);

      // Close the modal and reset the form fields
      setIsAddingVisible(false);
    }
    setSelectedCardId(null);
  };

  const handleUpdateFlashcard = (
    playlist: PlaylistType,
    flashcardIndex: number,
    updatedFlashcard: FlashCardType
  ) => {
    updateFlashcard(currPlaylist!, flashcardIndex, updatedFlashcard);
    setIsAddingVisible(false);
    setSelectedCardId(null);
  }

  const handleDeleteFlashcard = (playlist: PlaylistType, flashcardIndex: number) => {
    deleteFlashcard(currPlaylist!, flashcardIndex);
    setIsAddingVisible(false);
    setSelectedCardId(null);
  }

    // TODO: FIX THIS WITH PROPER NAME
    const handleUpdateTitle = async () => {
      updatePlaylistTitle(currPlaylist!, "cool, fancy name");
    }

  // Storing the search term
  const [searchTerm, setSearchTerm] = useState("");

  // set thing the search word
  const handleSearchWord = (term: string) => {
    {
      /* Search word feature here */
    }
    setSearchTerm(term);
  };

  const flashcardsArray = Object.values(currPlaylist!.playlist);
    // ? Object.values(currPlaylist!.playlist).sort(
    //     (a, b) => b.createdAt - a.createdAt
    //   )
    // : [];
  // console.log("flashcardsArray: ", flashcardsArray)

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
  // console.log("filtered fc: ", filteredFlashcards)

  const AddCardButton = () => {
    return (
      <TouchableOpacity onPress={handleOpenAdd}>
        <View style={[styles.listItem, theme.shadow.default]}>
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

  // Function to handle card press
  const handleCardPress = (cardId: number) => {
    setSelectedCardId(selectedCardId === cardId ? null : cardId);
    setIsAddingVisible(false);
  };

  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      paddingHorizontal: 4,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.colors.listBackground,
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
      fontFamily: theme.typography.fonts.semiboldFont,
      fontSize: theme.typography.deckPreview.deckTitleSize,
      marginBottom: 4,
      color: theme.colors.text,
    },
    subHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    wordCount: {
      fontFamily: theme.typography.fonts.regularFont,
      fontSize: theme.typography.deckPreview.wordCountSize,
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
      fontSize: theme.typography.deckPreview.addKoreanSize,
      borderWidth: 1,
      paddingVertical: 9,
      marginVertical: 5,
      borderRadius: 4,
      textAlign: "left",
      paddingLeft: 13,
      fontFamily: theme.typography.fonts.boldFont,
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
      fontFamily: theme.typography.fonts.boldFont,
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
      fontFamily: theme.typography.fonts.boldFont,
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
      borderRadius: theme.spacing.borderRadius,
      marginRight: 16,
      backgroundColor: theme.colors.icons,
      alignItems: "center",
      justifyContent: "center",
    },

    previewBadgeText: {
      paddingTop: 4,
      fontFamily: theme.typography.fonts.boldFont,
      fontSize: theme.typography.deckPreview.previewTextSize,
      color: theme.colors.text,
    },
    practiceButtonContainer: {
      backgroundColor: theme.colors.listBackground,
      marginHorizontal: -5,
      marginBottom: -20,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
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
      fontSize: theme.typography.deckPreview.practiceButtonSize,
      fontFamily: theme.typography.fonts.boldFont,
    },
    addCardText: {
      fontFamily: theme.typography.fonts.semiboldFont,
      fontSize: theme.typography.deckPreview.addCardtextSize,
    },
    createAddCardButton: {
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
      backgroundColor: theme.colors.accent,
    },
    rightControls: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  // Use in DeckPreviewModal to prevent VirtualizedLists error
  if (withinModal == true) {
    return (
      <SafeAreaView style={styles.modalContainer}>
        {/* Search word input */}
        <Search handleSearchWord={handleSearchWord} searchTerm={searchTerm} />

        {/* Adding new card modal */}
        <AddCardModal
          isVisible={isAddingVisible}
          onAdd={handleAdd}
          onCancel={handleCancel}
          koreanWordInitial={""}
          englishWordInitial={""}
          isEditMode={false}
        />

        {/* List of cards display in ScrollView instead of Flatlist */}
        <ScrollView>
          <TouchableOpacity
            onPress={handleOpenAdd}
            style={styles.createAddCardButton}
          >
            <Text style={styles.addCardText}>Add Card +</Text>
          </TouchableOpacity>

          {filteredFlashcards.map((item, index) => (
            <View key={item.id}>
              <PreviewCard
                term={item.term}
                definition={item.definition}
                onPress={() => handleCardPress(index)}
              />
              {selectedCardId === index && (
                <AddCardModal
                  isVisible={selectedCardId !== null}
                  onAdd={handleAdd}
                  onUpdate={handleUpdateFlashcard}
                  onDelete={handleDeleteFlashcard}
                  onCancel={handleCancel}
                  createdAt={item.createdAt}
                  koreanWordInitial={item.term}
                  englishWordInitial={item.definition}
                  flashcardId={item.id}
                  isEditMode={true}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Back arrow */}
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={28} color="black" />
        </TouchableOpacity>
        {/* Header */}
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            {/* Playlist Name */}
            <Text style={styles.headerTitle}>{currPlaylist?.title}</Text>
            <Pressable onPress={handleUpdateTitle}><Text>change</Text></Pressable>
            {/* Playlist Info container */}
            <View style={styles.subHeader}>
              {/* Card Icon */}
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
          {/* AddButton container */}
          <View style={styles.rightControls}>
            <TouchableOpacity onPress={handleOpenAdd}>
              <AddButton />
            </TouchableOpacity>
            <GearButton navigation={navigation} />
          </View>
          {/* further discussion needed on adding this with the other add option */}
        </View>
      </View>

      {/* Search word input */}
      <Search handleSearchWord={handleSearchWord} searchTerm={searchTerm} />

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
        renderItem={({ item, index }) => (
          // The modal is now tied to the selectedCardId state.
          // It will open for the card that was last pressed.

          <View>
            <PreviewCard
              // key={item.id}
              key={index}
              term={item.term}
              definition={item.definition}
              // onPress={() => handleCardPress(item.id)}
              onPress={() => handleCardPress(index)}
            />

            {/* {selectedCardId === item.id && ( */}
            {selectedCardId === index && (
              <AddCardModal
                isVisible={selectedCardId !== null}
                onAdd={handleAdd} // Used for adding a new card
                onUpdate={handleUpdateFlashcard}
                onDelete={handleDeleteFlashcard}
                onCancel={handleCancel}
                createdAt={item.createdAt}
                koreanWordInitial={item.term}
                englishWordInitial={item.definition}
                flashcardId={item.id}
                flashcardIndex={index}
                isEditMode={true}
              />
            )}
          </View>
        )}
        keyExtractor={(item, index) => `key-${index}`}
        ListHeaderComponent={AddCardButton}
        extraData={selectedCardId} // Ensure FlatList re-renders when selectedCardId changes
      />

      {/* Practice Button */}
      <View style={styles.practiceButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (Object.keys(flashcards).length > 0) {
              navigation.navigate("PracticeScreen");
            } else {
              handleOpenAdd();
            }
          }}
          style={[styles.practiceButton, theme.shadow.default]}
        >
          <Text style={styles.practiceButtonText}>Practice</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
