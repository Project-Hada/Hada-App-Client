import React, { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useContext, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput, Pressable } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { FlashCardType } from '../../Utils/types';
import LibraryContext from '../../Utils/Contexts/LibraryContext';
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
    
    const { library, setCurrPlaylist } = useContext(LibraryContext);
    // const { flashcards, setFlashcards } = useContext(FlashcardContext);
   const flashcards = flashCards;
    
    const handleNavigation = (key: number) => {
        setCurrPlaylist(library[key]);
        navigation.navigate('DeckPreview');
    }

    const [playlistName, setPlaylistName] = useState(""); 

    const [isAddingVisible, setIsAddingVisible] = useState(false);

    const handleCancel = () => {
      setIsAddingVisible(false);
    }
    const handleOpenAdd = () => {
      setIsAddingVisible(true);
    }
    const handleAdd = () => {
        
        //clear
        setPlaylistName(""); 
    };

    return (
        <SafeAreaView style={libStyles.container}>
            <View style={libStyles.headerContainer}> 
                <Text style={libStyles.addIcon}>    </Text>
                <Text style={libStyles.headerText}>Library</Text>
                <MaterialCommunityIcons name="note-edit-outline" style={libStyles.addIcon} color="#000000" onPress={handleOpenAdd}/>
            </View>
            <ScrollView contentContainerStyle={libStyles.scrollView} > 
                {isAddingVisible && <View style={libStyles.addingContainer}>
                <TextInput
                    style={libStyles.addingKoreanText}
                    onChangeText={(text) => setPlaylistName(text)} 
                    value={playlistName}
                    placeholder="Type Korean Word"
                    keyboardType="default"
                />
                <View style={libStyles.addingButtonContainer}>
                    <Pressable style={libStyles.cancelButton} onPress={ handleCancel }><Text>Cancel</Text></Pressable>
                    <Pressable style={libStyles.addButton} onPress={ handleAdd }><Text>Add</Text></Pressable>
                </View>
                </View>}
                {library.map((item: any, i: any) => {
                    return(
                        <TouchableOpacity 
                            key={`playlist-${i}`} 
                            style={libStyles.playlist} 
                            onPress={() => handleNavigation(i)}
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
        paddingVertical: 30,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    headerText: {
        fontSize: 30
    },
    addIcon: {
        fontSize: 32
    },
    scrollView: {
        width: '100%',
        justifyContent: 'center',
    },
    playlist: {
        flexDirection: 'row',
        alignItems: 'center',
        
        backgroundColor: colors.playlistColor,
        
        borderWidth: 1,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 10,
        borderColor: '#000000', 

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

    addingContainer: {
        flexDirection: 'column',
        padding: 20,
        marginBottom: 15,
        marginHorizontal: 15,
        borderWidth: 1,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 10,
        borderColor: '#000000',
        backgroundColor: 'white',
    },
    addingKoreanText: {
        borderWidth: 1,
        paddingVertical: 7,
        marginVertical: 5, 
        borderRadius: 4,
        textAlign: 'left',
        paddingLeft: 5,
        fontWeight: 'bold'
    },
    addingEnglishText: {
        borderWidth: 1,
        marginVertical: 5, 
        paddingVertical: 4,
        borderRadius: 4,
        textAlign: 'left',
        paddingLeft: 5,
    },
    addingButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 20, 
    },
    cancelButton: {
        width: '30%',
        backgroundColor: 'red',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 10,
        borderColor: '#000000',
    },
    addButton: {
        width: '65%',
        backgroundColor: 'green',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 1,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderRadius: 10,
        borderColor: '#000000',
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