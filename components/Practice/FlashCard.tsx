import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Animated } from 'react-native';

type FlashCardProps = {
  definition: string;
  romanization: string;
  translation: string;
  onFlip: () => void;
};

export default function FlashCard({ definition, romanization, translation, onFlip }: FlashCardProps) {
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

  return (
    <Pressable onPress={triggerFlip} style={styles.flashCardPressableContainer}>
      <Animated.View style={[styles.flashCardFront, frontAnimatedStyle]}>
        <View style={styles.definitionContainer}>
          <Text style={styles.definition}>{definition}</Text>
        </View>
        <View style={styles.romanizationContainer}>
          <Text style={styles.romanization}>{romanization}</Text>
        </View>
      </Animated.View>
      <Animated.View style={[styles.flashCardBack, backAnimatedStyle, { position: 'absolute' }]}>
        <Text style={styles.translation}>{translation}</Text>
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
  flashCardFront: {
    width: '100%',
    height: '100%',
    borderRadius: 13 ,
    backgroundColor: '#BEBEBE',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  flashCardBack: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    backgroundColor: '#BEBEBE',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  definitionContainer: {},
  definition: {
    fontSize: 38,
  },
  romanizationContainer: {},
  romanization: {},
  translation: {
    fontSize: 34,
  },
});
