import React, {
  useContext,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity, 
} from "react-native";
import {
  MaterialCommunityIcons, 
} from "@expo/vector-icons"; 
import { FlashCardType } from "../../utils/types";
import LibraryContext from "../../utils/contexts/LibraryContext";
import flashCards from "../../Data/fakeData"; 
import AddButton from "../AddButton";
import generateId from "../../utils/idGenerator";
import { useTheme } from "../../utils/contexts/ThemeContext";
import { typography } from "../theme/Typography";

type PlaylistItemType = {
  name: string;
  title: string;
  playlist: FlashCardType[];
};

type LibraryScreenProps = {
  navigation: any;
  playlistData: PlaylistItemType[];
};
export default function LibraryScreen({ navigation, route }: any) {
  // Library Context
  const { library, setCurrPlaylist, addPlaylist } = useContext(LibraryContext);
  const flashcards = flashCards;

  const handleNavigation = (playlistId: string) => {
    const playlist = library[playlistId];
    if (playlist) {
      setCurrPlaylist(playlist);
      navigation.navigate("DeckPreview");
    }
  };

  const [playlistName, setPlaylistName] = useState("");

  const [isAddingVisible, setIsAddingVisible] = useState(false);

  const handleCancel = () => {
    setIsAddingVisible(false);
  };
  const handleOpenAdd = () => {
    // Generate a new ID for the playlist
    const newPlaylistId = generateId();

    // Create a new playlist object with the ID
    const newPlaylist = {
      id: newPlaylistId,
      title: "New Playlist",
      playlist: [],
    };

    // Add the new playlist to the context
    addPlaylist(newPlaylist);

    // Update the current playlist to the new one
    setCurrPlaylist(newPlaylist);

    // Navigate to DeckPreview with the new playlist's ID
    navigation.navigate("DeckPreview", { playlistId: newPlaylistId });
  };

  const { theme } = useTheme();
  const libStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
      justifyContent: "center",
      backgroundColor: theme.colors.backgroundColor,
      padding: 0,
      margin: 0,
    },
    headerContainer: {
      paddingVertical: 30,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
    },
    headerText: {
      fontFamily: typography.fonts.boldFont,
      fontSize: 30,
      color: theme.colors.text,
    },
    scrollView: {
      width: "100%",
      justifyContent: "center",
    },
    playlist: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.container,
      paddingVertical: 10,
      marginBottom: 15,
      marginHorizontal: 15,
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 3,
      backgroundColor: theme.colors.icons,
      marginHorizontal: 10,
      width: 55,
      height: 55,
    },
    playlistInfo: {
      flex: 5,
    },
    playlistName: {
      fontFamily: typography.fonts.boldFont,
      fontSize: typography.library.playlistTitleSize,
      color: theme.colors.text,
    },
    playlistWordCount: {
      fontFamily: typography.fonts.mediumFont,
      fontSize: typography.library.subTextSize,
      color: theme.colors.subtext,
    },
  });

  return (
    <SafeAreaView style={libStyles.container}>
      <View style={libStyles.headerContainer}>
        <View />
        <Text style={libStyles.headerText}>Library</Text>
        <TouchableOpacity onPress={handleOpenAdd}>
          <AddButton />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={libStyles.scrollView}>
        {Object.values(library).map((item, index) => {
          return (
            <TouchableOpacity
              key={`playlist-${item.id}`} // use the unique id as key
              style={[libStyles.playlist, theme.shadow.default]}
              onPress={() => handleNavigation(item.id)} // pass the id to handle navigation
            >
              <View style={libStyles.iconContainer}>
                <MaterialCommunityIcons
                  size={44}
                  name="access-point"
                  color="black"
                />
              </View>
              <View style={libStyles.playlistInfo}>
                <Text style={libStyles.playlistName}>{item.title}</Text>
                <Text style={libStyles.playlistWordCount}>
                  {Object.keys(item.playlist).length} words
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
