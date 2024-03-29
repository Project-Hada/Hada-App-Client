import React, {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { PlaylistType, FlashCardType } from "../../utils/types";
import LibraryContext from "../../utils/contexts/LibraryContext";
import flashCards from "../../Data/fakeData";
import { styles } from "./DeckPreview/DeckPreview";
import AddButton from "../AddButton";
import generateId from "../../utils/idGenerator";
import { getAllDecksByUser } from "../../utils/services/decksFunctions";
import { DeckSchema } from "../../utils/schemas/DeckSchema";

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
  const { user, library, setCurrPlaylist, addPlaylist } = useContext(LibraryContext);
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

  // TODO: TEMP save decks here; please fix----------------
  const [decks, setDecks] = useState<PlaylistType[]>([]);
  const getDecks = async () => await getAllDecksByUser(user!.uid, setDecks)
  useEffect(() => {
    getDecks();
  }, [])
  //--------------------------------------------

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
        {/* User Info */}
        <View>
          <Text>Your Email: {user?.email}</Text>
        </View>
        { decks.map( (d) => {
          return (
            <View key={d.id}>
              <Text>deck name: {d.title}</Text>
              {d.playlist?.map((c, index) => {
                return (
                  <View key={index}>
                    <Text> {c.term} ---- {c.definition}</Text>
                  </View>
                )
              })}
            </View>
          )
        }) }

        {Object.values(library).map((item, index) => {
          return (
            <TouchableOpacity
              key={`playlist-${item.id}`} // use the unique id as key
              style={libStyles.playlist}
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
                  {item.playlist.length} words
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const colors = {
  backgroundThemeColor: "#F2E8E1",
  iconBackground: "#7F9CEF",
  playlistColor: "#FFFFFF",
  textColor: "#000000",
  subtextColor: "#A7A7A7",
};

const fonts = {
  fontFamily: "GeneralSans-Regular",
  headerTitleSize: 24,
  playlistTitleSize: 18,
  subTextSize: 14,
};

export const libStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: colors.backgroundThemeColor,
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
    fontFamily: "GeneralSans-Bold",
    fontSize: 30,
  },
  scrollView: {
    width: "100%",
    justifyContent: "center",
  },
  playlist: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.playlistColor,

    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    borderColor: "#000000",

    paddingVertical: 10,
    marginBottom: 15,
    marginHorizontal: 15,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    backgroundColor: colors.iconBackground,
    marginHorizontal: 10,
    width: 55,
    height: 55,
  },
  playlistInfo: {
    flex: 5,
  },

  addingContainer: {
    flexDirection: "column",
    padding: 20,
    marginBottom: 15,
    marginHorizontal: 15,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    borderColor: "#000000",
    backgroundColor: "white",
  },
  addingKoreanText: {
    borderWidth: 1,
    paddingVertical: 7,
    marginVertical: 5,
    borderRadius: 4,
    textAlign: "left",
    paddingLeft: 5,
    fontWeight: "bold",
  },
  addingEnglishText: {
    borderWidth: 1,
    marginVertical: 5,
    paddingVertical: 4,
    borderRadius: 4,
    textAlign: "left",
    paddingLeft: 5,
  },
  addingButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    width: "30%",
    backgroundColor: "red",
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
  addButton: {
    width: "65%",
    backgroundColor: "green",
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

  playlistName: {
    fontSize: fonts.playlistTitleSize,
    fontWeight: "bold",
    color: colors.textColor,
  },
  playlistWordCount: {
    fontFamily: "GeneralSans-Medium",
    fontSize: fonts.subTextSize,
    fontWeight: "normal",
    color: colors.subtextColor,
  },
});
