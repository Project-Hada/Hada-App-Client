import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Animated,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { PlaylistType, FlashCardType } from "../../utils/types";
import LibraryContext from "../../utils/contexts/LibraryContext";
import flashCards from "../../Data/fakeData";
import AddButton from "../AddButton";
import generateId from "../../utils/idGenerator";
import { useTheme } from "../../utils/contexts/ThemeContext";
import { typography } from "../theme/Typography";
import GearButton from "../GearButton";
import ProfilePicture from "./ProfilePicture";
import {
  addNewDeck,
  getAllDecksByUID,
  getOneDeckByDID,
} from "../../utils/services/decksFunctions";
import { Modalize } from "react-native-modalize";
import PlaylistRenameModal from "./PlaylistNameModal";
import { Swipeable } from "react-native-gesture-handler";
import GearModal from "../GearModal";

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
  // remove test library
  const {
    user,
    handleLogout,
    setCurrPlaylist,
    addPlaylist,
    library,
    deletePlaylist,
    updatePlaylist,
  } = useContext(LibraryContext);
  // console.log("library: ", library);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const modalizeRef = useRef<Modalize>(null);

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const flashcards = flashCards;

  const [searchSet, setSearchSet] = useState("");

  const handleSearch = (set: string) => {
    setSearchSet(set);
  };

  const filteredLibrary =
    searchSet.trim() === ""
      ? Object.values(library)
      : Object.values(library).filter((playlist) =>
          playlist.title.toLowerCase().includes(searchSet.toLowerCase())
        );
  // console.log(filteredLibrary)

  const handleNavigation = async (playlist: PlaylistType) => {
    if (playlist) {
      setCurrPlaylist(playlist);
      navigation.navigate("DeckPreview");
    }
  };

  const handleUserSignOut = () => {
    handleLogout();
    navigation.navigate("LoginScreen");
  };

  const [playlistName, setPlaylistName] = useState("");

  const [isAddingVisible, setIsAddingVisible] = useState(false);

  const handleCancel = () => {
    setIsAddingVisible(false);
  };
  const handleOpenAdd = async () => {
    // Add the new playlist to the context
    const newPlaylist = await addPlaylist();

    // Update the current playlist to the new one
    setCurrPlaylist(newPlaylist);

    // Navigate to DeckPreview with the new playlist's ID
    navigation.navigate("DeckPreview", { playlistId: newPlaylist.id });
  };

  const profileColors = [
    "#D27FEF",
    "#38DAEF",
    "#FF454C",
    "#7F9CEF",
    "#FD9960",
    "#F3E565",
  ];
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
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingHorizontal: 15,
      paddingVertical: 30,
      paddingTop: 30,
      paddingBottom: 10,
    },
    headerText: {
      fontFamily: theme.typography.fonts.boldFont,
      fontSize: 26,
      color: theme.colors.text,
      marginRight: 100,
    },
    headerTextT: { fontSize: 20, marginBottom: -2 },
    scrollView: {
      width: "100%",
      justifyContent: "center",
      backgroundColor: theme.colors.listBackground,
    },
    playlist: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.container,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
      paddingVertical: theme.spacing.library.verticalPadding,
      paddingLeft: 76,
      marginBottom: theme.spacing.library.marginBottom,
      marginHorizontal: theme.spacing.library.marginHorizontal,
      height: 76,
    },
    iconContainer: {
      // justifyContent: "center",
      // alignItems: "center",
      // borderRadius: theme.spacing.borderRadius,
      // backgroundColor: theme.colors.icons,
      marginHorizontal: theme.spacing.library.iconMarginHorizontal,
      marginLeft: 0,
      borderTopLeftRadius: 9,
      borderBottomLeftRadius: 6,
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: 64,
      // height: 60,
    },
    playlistInfo: {
      flex: 5,
    },

    addingContainer: {
      flexDirection: "column",
      padding: 20,
      marginBottom: theme.spacing.library.marginBottom,
      marginHorizontal: theme.spacing.library.marginHorizontal,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.container,
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
      borderWidth: theme.spacing.borderRadius,
      marginVertical: theme.spacing.library.marginVertical,
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
      marginTop: theme.spacing.library.marginTop,
    },
    cancelButton: {
      width: "30%",
      backgroundColor: theme.colors.redButton,
      textAlign: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: theme.spacing.library.verticalPadding,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
    },
    addButton: {
      width: "65%",
      backgroundColor: theme.colors.greenButton,
      textAlign: "center",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: theme.spacing.library.verticalPadding,
      borderWidth: theme.spacing.borderWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderBottomWidth: theme.spacing.borderRightWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
    },
    playlistName: {
      fontFamily: theme.typography.fonts.semiboldFont,
      fontSize: theme.typography.library.playlistTitleSize,
      color: theme.colors.text,
      paddingBottom: 2,
    },
    playlistWordCount: {
      fontFamily: theme.typography.fonts.mediumFont,
      fontSize: theme.typography.library.subTextSize,
      color: theme.colors.subtext,
    },
    searchContainer: {
      paddingVertical: 5,
      margin: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderRadius: 20,
      borderColor: theme.colors.border,
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
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    createPlaylistButton: {
      margin: theme.spacing.library.playlistPadding,
      marginTop: theme.spacing.library.marginTop,
      padding: theme.spacing.library.playlistPadding,
      borderWidth: theme.spacing.borderWidth,
      borderBottomWidth: theme.spacing.borderBottomWidth,
      borderRightWidth: theme.spacing.borderRightWidth,
      borderRadius: theme.spacing.borderRadius,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.accent,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    createPlaylistText: {
      fontSize: theme.typography.library.createPlaylistSize,
      fontFamily: theme.typography.fonts.boldFont,
    },
    bottomSection: {
      flex: 1,
      backgroundColor: theme.colors.listBackground,
    },
    topSection: {
      backgroundColor: theme.colors.backgroundColor,
    },
    deleteContainer: {
      backgroundColor: theme.colors.redButton,
      borderColor: theme.colors.border,
      justifyContent: "center",
    },
    deleteText: {
      color: theme.colors.text,
      fontFamily: theme.typography.fonts.boldFont,
      padding: 20,
    },
    leftSwipe: {
      flex: 1,
      marginBottom: 15,
      marginRight: 10,
      marginLeft: -5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderBottomWidth: 4,
      borderRightWidth: 4,
      backgroundColor: theme.colors.redButton,
    },
  });

  // Delete Playlist
  const handleDelete = (playlistId: string) => {
    deletePlaylist(playlistId);
  };

  const renderSwipe = (progress: any, item: PlaylistType) => {
    const translateX = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <Animated.View style={{ transform: [{ translateX }] }}>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={libStyles.leftSwipe}
        >
          <Text style={libStyles.deleteText}>DELETE</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  // Long press for playlist name change
  const handleLongPress = (playlistId: string) => {
    const currentPlaylistName = library[playlistId]?.title;
    setSelectedPlaylistId(playlistId);
    setNewPlaylistName(currentPlaylistName);
    setModalVisible(true);
  };

  const handleNameChange = (newName: string) => {
    if (selectedPlaylistId && newName.trim()) {
      updatePlaylist(selectedPlaylistId, { title: newName });
      setNewPlaylistName(newName);
      setModalVisible(false);
    } else {
      alert("Name cannot be empty.");
    }
  };

  return (
    <SafeAreaView style={libStyles.container}>
      <View style={libStyles.topSection}>
        <View style={libStyles.headerContainer}>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <ProfilePicture />
            <View>
              <Text style={libStyles.headerTextT}>Your</Text>
              <Text style={libStyles.headerText}>Library</Text>
            </View>
          </View>
          <View style={libStyles.buttonGroup}>
            <TouchableOpacity onPress={handleOpenAdd}>
              <AddButton />
            </TouchableOpacity>
            <GearButton navigation={navigation} />
          </View>
        </View>
        <View style={libStyles.searchContainer}>
          <AntDesign name="search1" style={libStyles.searchIcon} />
          <TextInput
            style={libStyles.searchInput}
            onChangeText={handleSearch}
            value={searchSet}
            placeholder="Search"
            keyboardType="default"
          />
        </View>
      </View>

      <PlaylistRenameModal // Pop up for renaming playlist
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        currentName={newPlaylistName}
        onSave={(newName: string) => handleNameChange(newName)}
      />

      <ScrollView
        style={libStyles.bottomSection}
        contentContainerStyle={libStyles.scrollView}
      >
        <TouchableOpacity
          onPress={handleOpenAdd}
          style={libStyles.createPlaylistButton}
        >
          <Text style={libStyles.createPlaylistText}>Create Playlist +</Text>
        </TouchableOpacity>
        {filteredLibrary.map((item, index) => {
          const itemColor = profileColors[index % profileColors.length];
          return (
            <Swipeable // Swipe to delete
              key={`playlist-${item.id}`}
              renderRightActions={(progress) => renderSwipe(progress, item)}
            >
              <TouchableOpacity
                key={`playlist-${item.id}`} // use the unique id as key
                style={[libStyles.playlist, theme.shadow.default]}
                onPress={() => handleNavigation(library[item.id])} // pass the id to handle navigation
                onLongPress={() => handleLongPress(item.id)} // long press for pop-up to appear
              >
                <View
                  style={[
                    libStyles.iconContainer,
                    { backgroundColor: itemColor },
                  ]}
                ></View>

                <View style={libStyles.playlistInfo}>
                  <Text style={libStyles.playlistName}>{item.title}</Text>
                  <Text style={libStyles.playlistWordCount}>
                    {Object.keys(item.playlist).length} words
                  </Text>
                </View>
              </TouchableOpacity>
            </Swipeable>
          );
        })}
      </ScrollView>
      <GearModal ref={modalizeRef} />
    </SafeAreaView>
  );
}
