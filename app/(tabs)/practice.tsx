import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  RollInLeft, 
  RollOutRight
} from 'react-native-reanimated';

import FlashCard from '@/components/Practice/FlashCard';

export default function PracticeScreen() {
  // Shared values to control the animation state
  const cardOffsetX = useSharedValue(0);
  const cardRotate = useSharedValue(0);

  // Animated styles for the card
  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: cardOffsetX.value },
        { rotate: `${cardRotate.value}deg` },
      ],
    };
  });

  const speed = 400;

  const tumbleRight = () => {
    cardRotate.value = withTiming(180, { duration: speed });
    cardOffsetX.value = withTiming(1000, { duration: speed }); // Move off to the right
  };

  const tumbleCardLeft = () => {
    cardRotate.value = withTiming(-180, { duration: speed });
    cardOffsetX.value = withTiming(-1000, { duration: speed }); // Move off to the left
  };

  const recenterCard = () => {
    cardRotate.value = withTiming(0, { duration: speed });
    cardOffsetX.value = withTiming(0, { duration: speed }); // Move back to center
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ... Other components */}
      <Animated.View 
        entering={RollInLeft} 
        exiting={RollOutRight} 
        style={[styles.flashCardContainer, cardStyle]}
      >
        <FlashCard 
          definition={'나무'} 
          romanization={'(namu)'} 
          translation={'too much'} 
        />
      </Animated.View>
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.leftControl} onPress={tumbleCardLeft}>
          <Text>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerControl} onPress={recenterCard}>
          <Text>{'<-'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightControl} onPress={tumbleRight}>
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
  bottomControls: {
    flex: 1.4,
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "transparent",
    alignItems: 'center',
    zIndex: 1
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
