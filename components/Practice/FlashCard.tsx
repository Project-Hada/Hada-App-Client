import React from 'react';
import { Pressable, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type FlashCardProps = {
    definition: string;
    romanization: string;
    translation: string;
  };

export default function FlashCard({definition, romanization, translation}: FlashCardProps) {
  // Shared value to control the flip value
  const flip = useSharedValue(0);

  // Trigger the flip animation
  const triggerFlip = () => {
    flip.value = withTiming(flip.value === 0 ? -180 : 0, { duration: 300 });
  };

  // Animated styles for the front of the card
  const animatedStyleFront = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${flip.value}deg`
        }
      ],
      opacity: flip.value <= -90 ? 0 : 1,
    };
  });

  // Animated styles for the back of the card
  const animatedStyleBack = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: `${flip.value + 180}deg`
        }
      ],
      opacity: flip.value <= -90 ? 1 : 0,
    };
  });
  return (
    <Pressable onPress={triggerFlip} style={styles.flashCardPressableContainer}>
          <Animated.View style={[styles.flashCardFront, animatedStyleFront]}>
                <View style={styles.definitionContainer}>
                    <Text style={styles.definition}>
                        {definition}
                    </Text>
                </View>
                <View style={styles.romanizationContainer}>
                    <Text style={styles.romanization}>
                        {romanization}
                    </Text>
                </View>
          </Animated.View>
          <Animated.View style={[styles.flashCardBack, animatedStyleBack]}>
            <Text style={styles.translation}>{translation}</Text>
          </Animated.View>
        </Pressable>
  );
}

const styles = StyleSheet.create({
  flashCardPressableContainer: {
    position: 'relative',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  flashCardFront: {
    position: 'absolute',
    backgroundColor: '#BEBEBE',
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 13,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'  
  },
  flashCardBack: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#BEBEBE',
    width: '100%',
    height: '100%',
    borderRadius: 13,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  definitionContainer: {
    backgroundColor: 'transparent'
  },
  definition: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  romanizationContainer: {
    backgroundColor: 'transparent'
  },
  romanization: {
    backgroundColor: 'transparent'
  },
  translation: {
    fontSize: 34
  }
});
