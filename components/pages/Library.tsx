import React, { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlashCardType } from '../../Utils/types';
import FlashcardContext from '../../Utils/Contexts/FlashcardContext';
import flashCards from '../../Data/fakeData';

  
  type PlaylistItemType = {
    name: string;
    title: string;
    playlist: FlashCardType[];
  };

  type LibraryScreenProps = {
    navigation: any;
    playlistData: PlaylistItemType[];
  }
export default function LibraryScreen({navigation, route}: any) {
    const { playlistData } = route.params;
    // const { flashcards, setFlashcards } = useContext(FlashcardContext);
   const flashcards = flashCards;
    console.log("faeouo", flashcards)
    console.log("aeou", flashCards);
    // setFlashcards(flashCards);
    console.log("oeauaoe", flashcards);
    

    return (
        <SafeAreaView style={libStyles.container}>
            <ScrollView contentContainerStyle={libStyles.scrollView} >
                {playlistData.map((item: any, i: any) => {
                    return(
                        <TouchableOpacity 
                            key={`playlist-${i}`} 
                            style={libStyles.playlist} 
                            onPress={() => navigation.navigate('DeckPreview')}
                        >
                            <View style={libStyles.iconContainer}>
                                <MaterialCommunityIcons size={44} name="access-point" color="black"/>
                            </View>
                            <View style={libStyles.playlistInfo}>
                                <Text style={libStyles.playlistName} >{item.title}</Text>
                                <Text style={libStyles.playlistWordCount} >{item.playlist.length} words</Text>
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
        shadowColor: colors.textColor,
        shadowOffset: {width: 4, height: 4},
        
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