import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

type FlashCardProps = {
  definition: string;
  romanization: string;
  translation: string;
  isFlipped: boolean;
};

// Renamed function from FlashCard to FlashCardSlider
export default function FlashCardSlider({ definition, romanization, translation, isFlipped }: FlashCardProps) {
  // Removed animated logic and state

  return (
    <View style={styles.flashCardContainer}>
        {
            (!isFlipped)? 
            <View style={[styles.flashCardFront]}>
            <View style={styles.definitionContainer}>
              <Text style={styles.definition}>{definition}</Text>
            </View>
            <View style={styles.romanizationContainer}>
              <Text style={styles.romanization}>{romanization}</Text>
            </View>
          </View> 
          :
            
      <View style={[styles.flashCardBack, { position: 'absolute' }]}>
      <Text style={styles.translation}>{translation}</Text>
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
  definitionContainer: {},
  definition: {
    fontSize: 38,
    fontFamily: 'General Sans Variable Bold',
    fontWeight: 'bold',
  },
  romanizationContainer: {},
  romanization: {},
  translation: {
    fontSize: 34,
  },
});
