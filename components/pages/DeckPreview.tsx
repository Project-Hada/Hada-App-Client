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
import FlashcardContext from "../../utils/contexts/LibraryContext";
import speak from "../../utils/tts";
import { TextInput } from "react-native-gesture-handler";
import AddButton from "../AddButton";

type FlashCardType = {
  term: string;
  romanization: string;
  definition: string;
};

type DeckPreviewProps = {
  navigation: any;
};

const handleAudio = (text: string, language: string) => {
  speak(text, language);
};

export default function DeckPreview({ navigation, route }: any) {
  const { currPlaylist } = useContext(FlashcardContext);
  const flashcards = currPlaylist.playlist;

  const [koreanWord, setKoreanWord] = useState("");
  const [englishWord, setEnglishWord] = useState("");

  const [isAddingVisible, setIsAddingVisible] = useState(false);

  const handleCancel = () => {
    setIsAddingVisible(false);
  };
  const handleOpenAdd = () => {
    setIsAddingVisible(true);
  };
  const handleAdd = () => {
    // Create a new flashcard object
    const newFlashcard = {
      term: koreanWord,
      romanization: "", // You can add romanization if you have it
      definition: englishWord,
    };

    // Update the playlist in the context or state
    // Assuming currPlaylist is part of the context and you have a method to update it
    const updatedPlaylist = [...currPlaylist.playlist, newFlashcard];
    // call a method from your context or state update logic to update the playlist
    // updateCurrPlaylist(updatedPlaylist);

    // Optionally, clear the input fields
    setKoreanWord("");
    setEnglishWord("");
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={28} color="#777777" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Someone’s Study Set</Text>
            <View style={styles.subHeader}>
              <MaterialCommunityIcons
                name="cards-variant"
                size={22}
                color="#B6B6B6"
              />
              <Text style={styles.wordCount}>{flashcards.length} words</Text>
            </View>
          </View>
          {/* <TouchableOpacity onPress={handleOpenAdd}>
            <AddButton />
          </TouchableOpacity> further discussion needed on adding this with the other add option*/}
        </View>
      </View>

      {/* Adding new card modal */}
      {isAddingVisible && (
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
            <Pressable style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
          </View>
        </View>
      )}
      {/* List of cards display */}
      <FlatList
        data={flashcards}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.listItem}>
              <View style={styles.previewBadge}>
                <Text style={styles.previewBadgeText}>
                  {item.term.slice(0, 1)}
                </Text>
              </View>
              <View style={styles.termContainer}>
                <Text style={styles.termText}>{item.term}</Text>
                <Text style={styles.term}>{item.definition}</Text>
              </View>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => {
                  handleAudio(item.term, "ko-KR");
                  handleAudio(item.definition, "en-US");
                }}
              >
                <View style={styles.playButtonContainer}>
                  <Feather name="play" size={24} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `term-${item.term}`}
        ListHeaderComponent={AddCardButton} // Add the AddCardButton as the header component
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

export const styles = StyleSheet.create({
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
    marginVertical: 5,
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
