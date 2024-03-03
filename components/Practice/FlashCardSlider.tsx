import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

type FlashCardProps = {
  term: string;
  romanization: string;
  definition: string;
  isFlipped: boolean;
};

// Renamed function from FlashCard to FlashCardSlider
export default function FlashCardSlider({ term, romanization, definition, isFlipped }: FlashCardProps) {
  // Removed animated logic and state

  return (
    <View style={styles.flashCardContainer}>
        {
            (!isFlipped)? 
            <View style={[styles.flashCardFront]}>
            <View style={styles.termContainer}>
              <Text style={styles.term}>{term}</Text>
            </View>
            <View style={styles.romanizationContainer}>
              <Text style={styles.romanization}>{romanization}</Text>
            </View>
          </View> 
          :
            
      <View style={[styles.flashCardBack, { position: 'absolute' }]}>
      <Text style={styles.definition}>{definition}</Text>
    </View>
        }
      
    </View>
  );
}

{/* <View style={{backgroundColor: 'red', opacity: 0.5, width: '100%', height: '100%', pointerEvents: 'none'}}>

</View> */}

const styles = StyleSheet.create({
  flashCardContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  flashCardFront: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashCardBack: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termContainer: {},
  term: {
    fontSize: 38,
    fontFamily: 'GeneralSans-Variable',
  },
  romanizationContainer: {},
  romanization: {
    fontSize: 28,
    fontFamily: 'GeneralSans-Regular',
    color: "#A7A7A7"
  },
  definition: {
    fontSize: 34,
  },
});
