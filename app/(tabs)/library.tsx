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
                            <MaterialCommunityIcons name="access-point" size={24} color="black" style={libStyles.icons}/>
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

const libStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#F2E8E1',
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
    headertitle: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',
    },
    title: {
        marginVertical: 20,
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'

    },
    scrollView: {
        width: '100%',
        justifyContent: 'center',
    },
    playlist: {
        paddingVertical: 10,
        marginBottom: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 2,
        shadowColor: '#000000',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: .8
    },
    icons: {
        flex: 1,
        maxWidth: 45,
        borderRadius: 3,
        marginHorizontal: 10,
        fontSize: 45,
        backgroundColor: '#7F9CEF'
    },
    playlistInfo: {
        flex: 5
    },
    playlistName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000'
    },
    playlistWordCount: {
        fontSize: 13,
        fontWeight: '200',
        color: '#A7A7A7'
    },
});
