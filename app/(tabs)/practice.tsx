import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import FlashCard from '@/components/Practice/FlashCard';
import FlashCardSlider from '@/components/Practice/FlashCardSlider';

const flashCards = [
  {
    "definition": "나무",
    "romanization": "(namu)",
    "translation": "tree"
  },
  {
    "definition": "사과",
    "romanization": "(sagwa)",
    "translation": "apple"
  },
  {
    "definition": "바다",
    "romanization": "(bada)",
    "translation": "sea"
  },
  {
    "definition": "햇볕",
    "romanization": "(haetbyeot)",
    "translation": "sunlight"
  },
  {
    "definition": "비",
    "romanization": "(bi)",
    "translation": "rain"
  },
  {
    "definition": "바람",
    "romanization": "(baram)",
    "translation": "wind"
  },
  {
    "definition": "하늘",
    "romanization": "(haneul)",
    "translation": "sky"
  },
  {
    "definition": "별",
    "romanization": "(byeol)",
    "translation": "star"
  },
  {
    "definition": "눈",
    "romanization": "(nun)",
    "translation": "snow"
  },
  {
    "definition": "구름",
    "romanization": "(gureum)",
    "translation": "cloud"
  },
  {
    "definition": "빗물",
    "romanization": "(bitmul)",
    "translation": "rainwater"
  },
  {
    "definition": "번개",
    "romanization": "(baen   gae)",
    "translation": "lightning"
  },
  {
    "definition": "무지개",
    "romanization": "(mujigae)",
    "translation": "rainbow"
  },
  {
    "definition": "바람막이",
    "romanization": "(barammaki)",
    "translation": "windbreaker"
  },
  {
    "definition": "태양",
    "romanization": "(taeyang)",
    "translation": "sun"
  }
]


export default function PracticeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dynamicIndex, setDynamicIndex] = useState(currentIndex);
  const [nextIndex, setNextIndex] = useState(1); // Next card index
  const [history, setHistory] = useState<string[]>([]); // Track user actions for the back functionality
  const cardOffsetX = useRef(new Animated.Value(0)).current; // Animation for swiping
  const [isFlipped, setIsFlipped] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);



  // Function to handle the card swipe animation
  const moveCard = (direction: string) => {
    const moveTo = direction === 'left' ? -1000 : 1000; // Determine direction based on 'X' or 'O'
    setSliderIndex(999);
    setDynamicIndex(nextIndex);

    Animated.timing(cardOffsetX, {
      toValue: moveTo,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // After the animation, reset position and update card indices
      cardOffsetX.setValue(0); // Reset position
      const newCurrentIndex = (currentIndex + 1) % flashCards.length;
      const newNextIndex = (nextIndex + 1) % flashCards.length;

      // Save action to history
      setHistory([...history, direction ]);

      // Update indices
      setCurrentIndex(newCurrentIndex);
      setNextIndex(newNextIndex);
      setSliderIndex(0);
    });
  };

  // Function to handle the back action
  const bringBackCard = () => {
    if(currentIndex <= 0 ) return;
    const moveTo = 0; // Determine direction based on 'X' or 'O'
    const offset = (history[history.length - 1]) === 'left' ? -1000 : 1000; // Determine direction based on 'X' or 'O'
    cardOffsetX.setValue(offset);
    setSliderIndex(999);
    setHistory(history.slice(0, history.length - 1))
    setCurrentIndex(currentIndex - 1);
    setNextIndex(nextIndex - 1);

    Animated.timing(cardOffsetX, {
      toValue: moveTo,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // After the animation, reset position and update card indices
      cardOffsetX.setValue(0);
      setDynamicIndex(currentIndex - 1);
      // Update indices
      setSliderIndex(0);
    });
  };
  

  // Use Animated style for the swiping card
  const cardStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
    transform: [{ translateX: cardOffsetX }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flashCardContainer}>
        <FlashCard
          definition={flashCards[dynamicIndex].definition}
          romanization={flashCards[dynamicIndex].romanization}
          translation={flashCards[dynamicIndex].translation}
          onFlip={() => setIsFlipped(!isFlipped)}
        />

        <View style={[styles.flashCardAnimated, {zIndex: sliderIndex, opacity: sliderIndex}]}>
          <Animated.View style={[cardStyle]}>
            <FlashCardSlider
              definition={flashCards[currentIndex].definition}
              romanization={flashCards[currentIndex].romanization}
              translation={flashCards[currentIndex].translation} 
              isFlipped={isFlipped}            
              />
          </Animated.View>
        </View>
        
      </View>
      <View style={styles.bottomControls}>
        <TouchableOpacity onPress={() => moveCard('left')} style={styles.leftControl}>
          <Text>X</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={bringBackCard} style={styles.centerControl}>
          <Text>{'<-'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveCard('right')} style={styles.rightControl}>
          <Text>O</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    position: 'relative',
    flex: 6,
    width: "100%",
  },
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
  flashCardAnimated: {
    backgroundColor: 'transparent',
    position: 'absolute',
    zIndex: 9999, 
    height: '100%', 
    width: '100%', 
    alignSelf: 'center', 
    justifyContent: 'center',
    pointerEvents: 'none'
  },
  nextFlashCard: {
    position: 'absolute',
    flex: 6,
    backgroundColor: 'white',
    width: '100%',
  },
  flashCardContainer: {
    position: 'relative',
    flex: 6,
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 20,
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
