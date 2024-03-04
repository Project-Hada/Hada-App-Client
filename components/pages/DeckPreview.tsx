import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView, Button, Pressable } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import FlashcardContext from '../../Utils/Contexts/LibraryContext';
import speak from '../../Utils/tts';
import { TextInput } from 'react-native-gesture-handler';


type FlashCardType = {
  term: string;
  romanization: string;
  definition: string;
};

type DeckPreviewProps = {
  navigation: any;
}

const handleAudio = (text: string, language: string) => {
    speak(text, language);
  };
  

export default function DeckPreview({navigation, route}: any) {
    const { currPlaylist } = useContext(FlashcardContext);
    const flashcards = currPlaylist.playlist;

    const [koreanWord, setKoreanWord] = useState("");
    const [englishWord, setEnglishWord] = useState("");

    const [isAddingVisible, setIsAddingVisible] = useState(false);

    const handleCancel = () => {
      setIsAddingVisible(false);
    }
    const handleOpenAdd = () => {
      setIsAddingVisible(true);
    }
    const handleAdd = () => {
      // Create a new flashcard object
      const newFlashcard = {
        term: koreanWord,
        romanization: "", // You can add romanization if you have it
        definition: englishWord
      };
    
      // Update the playlist in the context or state
      // Assuming currPlaylist is part of the context and you have a method to update it
      const updatedPlaylist = [...currPlaylist.playlist, newFlashcard];
      // call a method from your context or state update logic to update the playlist
      // updateCurrPlaylist(updatedPlaylist);
    
      // Optionally, clear the input fields
      setKoreanWord("");
      setEnglishWord("");
    };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={24} color="gray"/>
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.headerInfo}>
                <Text style={styles.headerTitle}>Someone’s Study Set</Text>
                <View style={styles.subHeader}>
                  <MaterialCommunityIcons name="cards-variant" size={18} color="gray"/>
                  <Text style={styles.wordCount}>{flashcards.length} words</Text>
                </View>
              </View>
              <MaterialCommunityIcons name="note-edit-outline" size={32} color="#000000" onPress={handleOpenAdd}/>
            </View>
        </View>
    
    {isAddingVisible && <View style={styles.addingContainer}>
      <TextInput
        style={styles.addingKoreanText}
        onChangeText={(text) => setKoreanWord(text)} 
        value={koreanWord}
        placeholder="Type Korean Word"
        keyboardType="default"
      />  
      <TextInput
        style={styles.addingEnglishText}
        onChangeText={(text) => setEnglishWord(text)}
        value={englishWord}
        placeholder="Enter English Word Here"
        keyboardType="default"
      />  
      <View style={styles.addingButtonContainer}>
        <Pressable style={styles.cancelButton} onPress={ handleCancel }><Text>Cancel</Text></Pressable>
        <Pressable style={styles.addButton} onPress={ handleAdd }><Text>Add</Text></Pressable>
      </View>
    </View>}
    <FlatList
        data={flashcards}
        renderItem={({ item }) => (
        <TouchableOpacity >
            <View style={styles.listItem}>
                <View style={styles.previewBadge}>
                    <Text style={styles.previewBadgeText}>{item.term.slice(0,1)}</Text>
                </View>
                <View style={styles.termContainer}>
                    <Text style={styles.termText}>{item.term}</Text>
                    <Text style={styles.term}>{item.definition}</Text>
                </View>
                <TouchableOpacity style={styles.playButton} onPress={() => {
                  handleAudio(item.term, 'ko-KR');
                  handleAudio(item.definition, 'en-US');}}>
                  <AntDesign name="play" size={36} color="#FFDF37"/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        )}
        keyExtractor={item => `term-${item.term}`}
      />
      
        <TouchableOpacity onPress={() => navigation.navigate('PracticeScreen')} style={styles.practiceButton}>
            <Text style={styles.practiceButtonText}>Practice</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2E8E1',
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#F2E8E1',
  },
  backIcon: {},
  headerContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingRight: 35,
  },
  headerInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordCount: {
    fontSize: 14,
    color: 'grey',
  },
  addingContainer: {
    flexDirection: 'column',
    padding: 20,
    marginVertical: 5, 
    marginHorizontal: 20,
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 5, 
    marginHorizontal: 20,
    borderWidth: 1,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderRadius: 10,
    borderColor: '#000000',
    backgroundColor: 'white',
  },
  termContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  termText: {
    fontSize: 20,
  },
  term: {
    fontSize: 16,
    color: 'grey',
  },
  previewBadge: {
    width: 48, 
    height: 48, 
    borderRadius: 10, 
    marginRight: 10,
    backgroundColor: '#7F9CEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBadgeText: {
    fontSize: 20,
    color: 'white', 
  },
  practiceButton: {
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderRadius: 10,
    borderColor: '#000000',
    backgroundColor: '#FFDF37',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  playButton: {

  }
});
