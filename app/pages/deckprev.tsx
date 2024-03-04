import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import speak from '@/utils/tts';


type FlashCardType = {
  definition: string;
  romanization: string;
  translation: string;
};

type DeckPreviewProps = {
  navigation: any;
  flashCards: FlashCardType[];
}

const handleAudio = (text: string, language: string) => {
  speak(text, language);
};

export default function DeckPreview({navigation, route}: any) {
  const { flashCards } = route.params;
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back-ios" size={24} color="gray"/>
            </TouchableOpacity>
            <View style={styles.headerContent}>
                <Text style={styles.headerTitle}>Someone’s Study Set</Text>
                <View style={styles.subHeader}>
                    <MaterialCommunityIcons name="cards-variant" size={18} color="gray"/>
                    <Text style={styles.wordCount}>{flashCards.length} words</Text>
                </View>
            </View>
        </View>
        
    <FlatList
        data={flashCards}
        renderItem={({ item }) => (
        <TouchableOpacity >
            <View style={styles.listItem}>
                <View style={styles.previewBadge}>
                    <Text style={styles.previewBadgeText}>{item.definition.slice(0,1)}</Text>
                </View>
                <View style={styles.termContainer}>
                    <Text style={styles.term}>{item.definition}</Text>
                    <Text style={styles.definition}>{item.translation}</Text>
                </View>
                <TouchableOpacity style={styles.playButton} onPress={() => {
                  handleAudio(item.definition, 'ko-KR');
                  handleAudio(item.translation, 'en-US');}}>
                  <AntDesign name="play" size={36} color="#FFDF37"/>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        )}
        keyExtractor={item => `term-${item.definition}`}
      />
      
        <TouchableOpacity onPress={() => navigation.navigate('pages/practice')} style={styles.practiceButton}>
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
  backIcon: {

  },
  headerContent: {
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
  term: {
    fontSize: 20,
  },
  definition: {
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

