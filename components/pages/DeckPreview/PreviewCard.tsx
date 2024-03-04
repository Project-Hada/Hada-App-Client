// PreviewCard.tsx
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import speak from "../../../utils/tts";

interface PreviewCardProps {
  term: string;
  definition: string;
}

const handleAudio = (text: string, language: string) => {
  speak(text, language);
};

const PreviewCard: React.FC<PreviewCardProps> = ({ term, definition }) => {
  return (
    <TouchableOpacity>
      <View style={styles.listItem}>
        <View style={styles.previewBadge}>
          <Text style={styles.previewBadgeText}>{term.slice(0, 1)}</Text>
        </View>
        <View style={styles.termContainer}>
          <Text style={styles.termText}>{term}</Text>
          <Text style={styles.term}>{definition}</Text>
        </View>
        <TouchableOpacity
          style={styles.playButton}
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

// Add your styles here
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

export default PreviewCard;
