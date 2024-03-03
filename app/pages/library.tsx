import React, { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react'
import { useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import flashCards from '../fakeData';


type FlashCardType = {
    definition: string;
    romanization: string;
    translation: string;
  };
  
  type PlaylistItemType = {
    name: string;
    title: string;
    words: FlashCardType[];
  };

  type LibraryScreenProps = {
    navigation: any;
    playlistData: PlaylistItemType[];
  }

  const handleFindDeck = () => {
    console.log("find my deck");
    // Sorts the deck by search input word
    // Need to talk with Product owner how he wants to implement this
  }

  const handleCreateDeck = () => {
    console.log("I want to create deck");
    // Create new deck function
    // Need to talk with Product owner how he wants to implement this
  }

  const handleUserInfo = () => {
    console.log("I want my user profile");
    // Opens the user info
    // Need to talk with Product owner how he wants to implement this
  }

export default function LibraryScreen({navigation, route}: any) {
    const { playlistData } = route.params;

    return (
        <SafeAreaView style={libStyles.container}>
            <View style={libStyles.utilContainer}>
                <MaterialCommunityIcons size={44} name="magnify" color="#000000" onPress={handleFindDeck}/>
                <MaterialCommunityIcons size={44} name="plus-box-outline" color="#000000" onPress={handleCreateDeck}/>
                <MaterialCommunityIcons size={44} name="account-circle-outline" color="#000000" onPress={handleUserInfo}/>
            </View>
            <ScrollView contentContainerStyle={libStyles.scrollView} >
                {playlistData.map((item: any, i: any) => {
                    return(
                        <TouchableOpacity 
                            key={`playlist-${i}`} 
                            style={libStyles.playlist} 
                            onPress={() => navigation.navigate('pages/deckprev')}
                        >
                            <View style={libStyles.iconContainer}>
                                <MaterialCommunityIcons size={44} name="access-point" color="black"/>
                            </View>
                            <View style={libStyles.playlistInfo}>
                                <Text style={libStyles.playlistName} >{item.title}</Text>
                                <Text style={libStyles.playlistWordCount} >{item.words.length} words</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const colors = {
    backgroundThemeColor: '#F2E8E1',
    iconBackground: '#7F9CEF',
    playlistColor: '#FFFFFF',
    textColor: '#000000',
    subtextColor: '#A7A7A7',
};

const fonts = {
    fontFamiliy: 'GeneralSans-Regular',
    headerTitleSize: 24,
    playlistTitleSize: 18,
    subTextSize: 14,
};

export const libStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: colors.backgroundThemeColor,
        padding: 0,
        margin: 0
    },
    utilContainer: {
        width: '100%',
        paddingRight: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    scrollView: {
        width: '100%',
        justifyContent: 'center',
    },
    playlist: {
        flexDirection: 'row',
        alignItems: 'center',
        
        backgroundColor: colors.playlistColor,
        
        borderRadius: 8,
        borderWidth: 2,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderColor: colors.textColor,
        
        paddingVertical: 10,
        marginBottom: 15,
        marginHorizontal: 15,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        backgroundColor: colors.iconBackground,
        marginHorizontal: 10,
        width: 55,
        height: 55
    },
    playlistInfo: {
        flex: 5
    },

    headertitle: {
        fontFamily: fonts.fontFamiliy,
        fontSize: fonts.headerTitleSize,
        color: colors.textColor,
        fontWeight: "bold",
    },
    playlistName: {
        fontFamily: fonts.fontFamiliy,
        fontSize: fonts.playlistTitleSize,
        fontWeight: 'bold',
        color: colors.textColor
    },
    playlistWordCount: {
        fontFamily: fonts.fontFamiliy,
        fontSize: fonts.subTextSize,
        fontWeight: 'normal',
        color: colors.subtextColor
    },
});
