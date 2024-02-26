import React from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function library() {
    const [playlistData, setPlaylistData] = useState(
        [
            {name: "access-point", title: "Someone's Study Set", wordCount: "1", key:"1"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "2", key:"2"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "21", key:"3"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "6", key:"4"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "9", key:"5"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "4", key:"6"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "20", key:"7"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "9", key:"8"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "10", key:"9"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "21", key:"10"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "6", key:"11"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "9", key:"12"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "4", key:"13"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "20", key:"14"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "9", key:"15"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "10", key:"16"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "21", key:"17"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "6", key:"18"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "9", key:"19"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "4", key:"20"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "20", key:"21"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "9", key:"22"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "10", key:"23"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "21", key:"24"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "6", key:"25"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "9", key:"26"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "7", key:"27"},
            {name: "access-point", title: "Someone's Study Set", wordCount: "77", key:"28"},
        ]
    );

    return (
        <View style={libStyles.container}>
            <View style={libStyles.headerContainer}>
                <Text style={libStyles.headertitle}>Library</Text>
            </View>
            {/* add addition features in the future here */}
            <ScrollView contentContainerStyle={libStyles.scrollView} >
                {playlistData.map((item) => {
                    return(
                        <View key={item.key} style={libStyles.playlist} >
                            <MaterialCommunityIcons name="access-point" color="black" style={libStyles.icons}/>
                            <View style={libStyles.playlistInfo}>
                                <Text style={libStyles.playlistName} >{item.title}</Text>
                                <Text style={libStyles.playlistWordCount} >{item.wordCount} words</Text>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
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
    fontFamiliy: 'General Sans',
    headerTitleSize: 24,
    playlistTitleSize: 18,
    subTextSize: 14,
};

const libStyles = StyleSheet.create({
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
    icons: {
        flex: 1,
        maxWidth: 55,
        borderRadius: 3,
        marginHorizontal: 10,
        fontSize: 55,
        backgroundColor: colors.iconBackground
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
