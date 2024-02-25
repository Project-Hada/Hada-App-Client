import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons';

interface WordItem {
  id: string;
  term: string;
  definition: string;
}

const dummyData: WordItem[] = [
  {
    id: '1',
    term: '안녕하세요',
    definition: 'hello',
  },
  {
    id: '2',
    term: '녕하세요',
    definition: 'ello',
  },
  {
    id: '3',
    term: '하세요',
    definition: 'llo',
  },
  {
    id: '4',
    term: '세요',
    definition: 'lo',
  },
  {
    id: '5',
    term: '요',
    definition: 'o',
  },
  
];

export default function DeckPreview() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcons name="arrow-back-ios" size={24} color="black"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Someone’s Study Set</Text>
        <View style={styles.subHeader}>
          <MaterialCommunityIcons name="cards-variant" size={18} color="gray"/>
          <Text style={styles.wordCount}>{dummyData.length} words</Text>
        </View>
      </View>
    
      <FlatList
        data={dummyData}
        renderItem={({ item }) => (
        <TouchableOpacity>
          <View style={styles.listItem}>
            <View style={styles.previewBadge}>
              <Text style={styles.previewBadgeText}>{item.term[0]}</Text>
            </View>
            <View style={styles.termContainer}>
              <Text style={styles.term}>{item.term}</Text>
              <Text style={styles.definition}>{item.definition}</Text>
            </View>
              <Octicons name="dot-fill" size={48} color="gray"/>
          </View>
        </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
      
      <TouchableOpacity style={styles.practiceButton}>
        <Text style={styles.practiceButtonText}>Practice</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
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
    backgroundColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBadgeText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold', 
  },
  practiceButton: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

