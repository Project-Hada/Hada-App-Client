import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated, SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import FlashCard from '@/components/Practice/FlashCard';
import FlashCardSlider from '@/components/Practice/FlashCardSlider';
import { FontAwesome6 } from '@expo/vector-icons';

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

type HistoryItem = {
  direction: string;
  currentIndex: number;
}

export default function PracticeScreen({navigation}: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dynamicIndex, setDynamicIndex] = useState(currentIndex);
  const [nextIndex, setNextIndex] = useState(1); // Next card index
  const [history, setHistory] = useState<HistoryItem[]>([]); // Track user actions for the back functionality
  const cardOffsetX = useRef(new Animated.Value(0)).current; // Animation for swiping
  const [isFlipped, setIsFlipped] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);


  const renderProgressIndicators = () => {
    return flashCards.map((card, index) => (
      <View
        key={`progress-${index}`}
        style={[
          styles.progressIndicator,
          currentIndex > index ? styles.progressIndicatorPassed : null,
          // If currentIndex is equal to index, it's the current card, we can highlight it differently
          currentIndex === index ? styles.progressIndicatorCurrent : null,
        ]}
      />
    ));
  };

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
      // Save action to history
      setHistory([...history, {direction, currentIndex}]);
      const newCurrentIndex = (currentIndex + 1) % flashCards.length;
      const newNextIndex = (nextIndex + 1) % flashCards.length;

      // Update indices
      setCurrentIndex(newCurrentIndex);
      setNextIndex(newNextIndex);
      setSliderIndex(0);
    });
  };

  // Function to handle the back action
  const bringBackCard = () => {
    if(history.length <= 0 ) return;
    const historyLen = history.length - 1;
    const moveTo = 0; // Determine direction based on 'X' or 'O'
    const offset = (history[historyLen].direction) === 'left' ? -1000 : 1000; // Determine direction based on 'X' or 'O'
    cardOffsetX.setValue(offset);
    setSliderIndex(999);
    const newCurrentIndex = history[historyLen].currentIndex;
    setCurrentIndex(newCurrentIndex);
    setNextIndex((newCurrentIndex + 1) % flashCards.length);
    setHistory(history.slice(0, historyLen))

    Animated.timing(cardOffsetX, {
      toValue: moveTo,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // After the animation, reset position and update card indices
      cardOffsetX.setValue(0);
      setDynamicIndex(newCurrentIndex);
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topNav}>
        <FontAwesome6 name="chevron-left" size={24} color="black" />
        <View style={styles.progress}>
          {renderProgressIndicators()}
        </View>
      </TouchableOpacity>
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
      
      <TouchableOpacity onPress={bringBackCard} style={styles.centerControl}>
      <FontAwesome6 name="rotate-left" size={38} color="#929292" />
      </TouchableOpacity>
      <View style={styles.bottomControls}>
        <TouchableOpacity onPress={() => moveCard('left')} style={[styles.controls, styles.left]}>
        <FontAwesome6 name="circle-xmark" size={44} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => moveCard('right')} style={[styles.controls, styles.right]}>
          <FontAwesome6 name="circle-check" size={44} color="black" />
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
  progress: {
    flexDirection: 'row',
    width: "100%"
  },
  progressIndicator: {
    flex: 1, // Each indicator will take equal space
    height: 4, // Set the height of the indicator
    backgroundColor: '#E0E0E0', // Default color for indicators
    marginHorizontal: 2, // Optional: add some spacing between indicators
  },
  progressIndicatorPassed: {
    backgroundColor: '#38DAEF', // Color for passed cards
  },
  progressIndicatorCurrent: {
    backgroundColor: '#38DAEF', // Optional: if you want to highlight the current card differently
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#F2E8E1'
  },
  topNav: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    flex: .4,
    paddingHorizontal: 26,
    paddingVertical: 28,
    gap: 16,
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
    flex: 5,
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 36,
  },
  bottomControls: {
    flex: 1.6,
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "transparent",
    alignItems: 'center',
    gap: 26,
    paddingHorizontal: 20
  },
  right: {
    backgroundColor: "#72DA4F"
  },
  left: {
    backgroundColor: "#FF454C"
  },
  controls: {
    flex: 1,
    height: 100,
    backgroundColor: '#D9D9D9',
    
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
  centerControl: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -26,
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
