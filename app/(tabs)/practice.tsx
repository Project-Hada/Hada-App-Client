import React from 'react';
import { Pressable, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function PracticeScreen() {
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
      opacity: flip.value <= -90 ? 1 : 0,
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
      opacity: flip.value <= -90 ? 0 : 1,
    };
  });
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topNav}>
            <Text> {'<'} </Text>
        </View>
        <View style={styles.flashCardContainer}>
        <Pressable onPress={triggerFlip} style={styles.flashCardPressableContainer}>
          <Animated.View style={[styles.flashCardFront, animatedStyleFront]}>
                <View style={styles.definitionContainer}>
                    <Text style={styles.definition}>
                        나무
                    </Text>
                </View>
                <View style={styles.romanizationContainer}>
                    <Text style={styles.romanization}>
                        {'(namu)'}
                    </Text>
                </View>
          </Animated.View>
          <Animated.View style={[styles.flashCardBack, animatedStyleBack]}>
            <Text>Eep</Text>
          </Animated.View>
        </Pressable>
      </View>
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.leftControl}>
            <Text>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.centerControl}>
            <Text>{'<-'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightControl}>
            <Text>O</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  topNav: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    flex: .4,
    paddingLeft: 16,
    justifyContent: 'center'
  },
  flashCardContainer: {
    flex: 6,
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  flashCardPressableContainer: {
    position: 'relative',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      { scaleX: -1 }
    ], 
    
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
  bottomControls: {
    flex: 1.4,
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "white",
    alignItems: 'center'
  },
  leftControl: {
    flex: 1,
    height: 100,
    backgroundColor: '#D9D9D9',
    width: 121,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
    
  },
  centerControl: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightControl: {
    flex: 1,
    height: 100,
    backgroundColor: '#D9D9D9',
    width: 121,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
