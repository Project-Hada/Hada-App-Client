import React, {
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
import { FlashCardType } from "../../utils/types";
import LibraryContext from "../../utils/contexts/LibraryContext";
import flashCards from "../../Data/fakeData";
import generateId from "../../utils/idGenerator";

import { AntDesign } from '@expo/vector-icons';
  
type PlaylistItemType = {
    name: string;
    title: string;
    playlist: FlashCardType[];
};
  
type LibraryScreenProps = {
    navigation: any;
    playlistData: PlaylistItemType[];
};

const playlistData = [
    {
        "icon": 'star',
        "title": "topic"
    },
    {
        "icon": 'star',
        "title": "topic"
    },
    {
        "icon": 'star',
        "title": "topic"
    },
    {
        "icon": 'star',
        "title": "topic"
    },
    {
        "icon": 'star',
        "title": "topic"
    },
]

export default function Explore({ navigation, route }: any) {
    return (
      <SafeAreaView style={exploreStyles.container}>
            <Text style={exploreStyles.title} >Explore</Text>
            <View style={exploreStyles.searchContainer}>
                <AntDesign name="search1" style={exploreStyles.searchIcon}/>
                <TextInput
                    style={exploreStyles.searchInput}
                    // onChangeText={}
                    // value={number}
                    placeholder="Search"
                    keyboardType="numeric"/>
                </View>
            <ScrollView style={exploreStyles.deckContainer}>
                {
                    <View style={exploreStyles.playlistGrid}>
                        {playlistData.map((item, index) => (
                            <View key={index} style={exploreStyles.playlistItem}>
                                <AntDesign name={item.icon} size={24} color="black" />
                                <Text style={exploreStyles.playlistTitle}>{item.title}</Text>
                            </View>
                        ))}
                    </View>
                }
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

export const exploreStyles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 20,
        flex: 1,
        flexDirection: 'column',
        width: "100%",
        justifyContent: "center",
        backgroundColor: colors.backgroundThemeColor,
        padding: 0,
    },
    title: {
        fontFamily: "GeneralSans-Bold",
        fontSize: 30,
        textAlign: 'center'
    },
    searchContainer: {
        paddingVertical: 5,
        marginTop: 15,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.playlistColor,
        borderWidth: 1,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 20,
        borderColor: "#000000",
    },
    searchIcon: {
        paddingLeft: 10,
        fontSize: 20,
        color: '#000000'
    },
    searchInput: {
        width: '100%',
        paddingLeft: 10,
    },
    deckContainer: {
        width: '100%',
    },
    playlistGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    playlistItem: {
        width: '30%',
        padding: 10,
        marginBottom: 20,
        marginLeft: '1.66666666667%',
        marginRight: '1.66666666667%',
        alignItems: 'center',
        borderWidth: 1,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 10,
        borderColor: '#000000',
        backgroundColor: colors.playlistColor,
    },
    playlistTitle: {
        marginTop: 5,
        fontFamily: fonts.fontFamily,
        fontSize: fonts.subTextSize,
        color: colors.textColor,
    },
});
  
  
  