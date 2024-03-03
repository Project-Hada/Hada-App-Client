import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';

type FlashCardProps = {
  term: string;
  romanization: string;
  definition: string;
  onFlip: () => void;
  resetFlip: boolean;
};

export default function FlashCard({ term, romanization, definition, onFlip, resetFlip }: FlashCardProps) {
  const [flipAnim, setFlipAnim] = useState(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const triggerFlip = () => {
    onFlip(); //notifies the parent
    Animated.timing(flipAnim, {
      toValue: isFlipped ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  useEffect(() => {
      flipAnim.setValue(0); // Resets to face up without animation
      setIsFlipped(false);
  }, [resetFlip]);

  const reset = () => {

  }

  return (
    <Pressable onPress={triggerFlip} style={styles.flashCardPressableContainer}>
      <Animated.View style={[styles.flashCard, frontAnimatedStyle]}>
        <View style={styles.termContainer}>
          <Text style={styles.term}>{term}</Text>
        </View>
        <View style={styles.romanizationContainer}>
          <Text style={styles.romanization}>{romanization}</Text>
        </View>
      </Animated.View>
      <Animated.View style={[styles.flashCard, backAnimatedStyle, { position: 'absolute' }]}>
        <Text style={styles.definition}>{definition}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flashCardPressableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    
  },
  flashCard: {
    width: '100%',
    height: '100%',
    borderRadius: 14 ,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
        shadowColor: '#171717',
    shadowOffset: {
      width: 4, // X offset
      height: 4, // Y offset
    },
    shadowOpacity: 1, // Transparency (0 to 1)
    shadowRadius: 0, // Blur radius
    elevation: 5, // Android-specific elevation
    borderWidth: 1,
    borderColor: 'black'
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
