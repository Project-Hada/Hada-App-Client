import React, { useState, useRef, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  Easing,
  TextStyle,
} from "react-native";
import FlashcardContext from "../../../utils/contexts/LibraryContext";
import { FontAwesome6 } from "@expo/vector-icons";
import FlashCard from "./Flashcard";
import FlashCardSlider from "./FlashcardSlider";
import Aromanize from "aromanize";
import { FlashCardType } from "../../../utils/types";
import { useTheme } from "../../../utils/contexts/ThemeContext";
import { CardNode, Session } from "./sessionAlgorithm";

type PracticeScreenProps = {
  navigation: any;
  flashCards: FlashCardType[];
};

type HistoryItem = {
  direction: string;
};

export default function PracticeScreen({ navigation, route }: any) {
  const { currPlaylist, updateFlashcard, updatePlaylist } =
    useContext(FlashcardContext);
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity
  const cardOffsetX = useRef(new Animated.Value(0)).current; // Animation for swiping
  const [isFlipped, setIsFlipped] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [dynamicHead, setDynamicHead] = useState<CardNode | null>(null);
  const [wasFlipped, setWasFlipped] = useState(false);
  const [resetFlip, setResetFlip] = useState(false);
  const [currentSession, setSession] = useState<Session | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [numOfLoops, setNumOfLoops] = useState(0);
  const counterColorAnim = useRef(new Animated.Value(0)).current;
  const counterScaleAnim = useRef(new Animated.Value(1)).current;
  const textColorAnim = useRef(new Animated.Value(0)).current; // Initial value for text color animation
  const [indicatorIndex, setIndicatorIndex] = useState(-1);

  useEffect(() => {
    if (currPlaylist) {
      const session = new Session(currPlaylist);
      session.startSession();
      setSession(session);
      // console.log(session.toString());

      setDynamicHead(session.getPartitionHead());
    }
  }, [currPlaylist]);

  const animateOpacity = () => {
    // Reset opacity to 1 without animation for instant change
    opacityAnim.setValue(1);

    console.log(opacityAnim);
    // Animate the opacity to 0
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const animateCounter = () => {
    // Sequence of two animations
    Animated.sequence([
      // First: spring to green
      Animated.spring(counterColorAnim, {
        toValue: 1,
        useNativeDriver: false, // Background color animation doesn't support native driver
        // You can adjust speed, bounciness, etc. here
      }),
      // Second: spring back to black
      Animated.spring(counterColorAnim, {
        toValue: 0,
        useNativeDriver: false, // Background color animation doesn't support native driver
        // You can adjust speed, bounciness, etc. here
      }),
    ]).start();

    // Spring animation for scaling up and then down the text
    counterScaleAnim.setValue(1.5); // Start at scaled down value
    Animated.spring(counterScaleAnim, {
      toValue: 1, // Scale back to normal

      tension: 5,
      useNativeDriver: false, // This is supported for scale transform
    }).start();
  };

  const animateTextColor = () => {
    Animated.sequence([
      Animated.timing(textColorAnim, {
        toValue: 1,
        duration: 500, // Duration of the color change to green
        useNativeDriver: false, // Must be false for color animations
      }),
      Animated.timing(textColorAnim, {
        toValue: 0,
        duration: 500, // Duration of the color change back to black
        useNativeDriver: false, // Must be false for color animations
      }),
    ]).start();
  };

  // const partitionLength = currentSession.getPartitionLength(); // This should be fine now
  //     const currentIndex = currentSession.getBleedLength();
  //     for (
  //       let index = 0;
  //       index < Object.keys(currPlaylist!.playlist).length;
  //       index++
  //     ) {

  const renderProgressIndicators = () => {
    const indicators = [];
    if (currentSession) {
      const currIndex =
        (currentSession.getNumOfStudiedInSession() %
          currentSession.getCurrPlaylistLength()) -
        1;

      if (currentSession.getNumOfLoops() > numOfLoops) {
        setNumOfLoops(currentSession.getNumOfLoops());
        animateOpacity();
        animateOpacity();
        animateCounter();
        animateTextColor();
      }
      for (
        let index = 0;
        index < currentSession.getCurrPlaylistLength();
        index++
      ) {
        indicators.push(
          <View
            key={`progress-${index}`}
            style={[
              styles.progressIndicator,
              currIndex > index ? styles.progressIndicatorPassed : null,
              currIndex === index ? styles.progressIndicatorCurrent : null,
            ]}
          >
            <Animated.View
              style={{
                backgroundColor: "#98FF5D",
                width: "100%",
                height: "100%",
                opacity: opacityAnim,
              }}
            />
          </View>
        );
      }
    }

    return indicators;
  };

  const handleBackPress = () => {
    if (currentSession && currPlaylist) {
      // Assuming currentSession can give us the updated cards and bleedQueue
      const updatedFlashcards = currentSession.getAllFlashcards();
      const newBleedQueue = currentSession.getBleedQueue();
      const newBleedQueueLength = currentSession.getBleedLength();

      updatedFlashcards.forEach((card) => {
        // Update each card with new passes and fails count
        updateFlashcard(currPlaylist.id, card.id, {
          ...card,
          passes: card.passes,
          fails: card.fails,
        });
      });

      updatePlaylist(currPlaylist.id, {
        bleedQueue: newBleedQueue,
        bleedQueueLength: newBleedQueueLength,
      });

      navigation.goBack();
    }
  };

  // Function to handle the card swipe animation
  const moveCard = (direction: string) => {
    if (!currentSession) return;
    // console.log(currentSession.toString());
    if (currentSession.getPartitionHead()) {
      if (direction === "right") {
        console.log("PASS");
        currentSession.pass();
      } else {
        console.log("FAIL");
        currentSession.fail();
      }

      const newFlippedValue = isFlipped;
      setWasFlipped(newFlippedValue);
      setResetFlip(!resetFlip);
      const moveTo = direction === "left" ? -1000 : 1000; // Determine direction based on 'X' or 'O'
      setSliderIndex(999);
      if (currentSession.getPartitionHead()?.next) {
        setDynamicHead(currentSession.getPartitionHead()!.next);
      }

      Animated.timing(cardOffsetX, {
        toValue: moveTo,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setWasFlipped(false);
        setIsFlipped(false);
        // After the animation, reset position and update card indices
        cardOffsetX.setValue(0); // Reset position
        setHistory([...history, { direction }]);
        setSliderIndex(0);
      });
    }
  };

  // Function to handle the back action
  const bringBackCard = () => {
    setIsFlipped(false);
    setWasFlipped(false);
    if (history.length <= 0 || !currentSession) return;
    //session manipulation
    currentSession.undoLastAction();
    // console.log(currentSession.toString());

    const historyLen = history.length - 1;
    const moveTo = 0; // Determine direction based on 'X' or 'O'
    const offset = history[historyLen].direction === "left" ? -1000 : 1000; // Determine direction based on 'X' or 'O'
    cardOffsetX.setValue(offset);
    setSliderIndex(999);
    setHistory(history.slice(0, historyLen));

    Animated.timing(cardOffsetX, {
      toValue: moveTo,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setResetFlip(!resetFlip);
      // After the animation, reset position and update card indices
      cardOffsetX.setValue(0);
      setDynamicHead(currentSession.getPartitionHead());
      // Update indices
      setSliderIndex(0);
    });
  };

  // Use Animated style for the swiping card
  const cardStyle: Animated.WithAnimatedValue<StyleProp<ViewStyle>> = {
    transform: [{ translateX: cardOffsetX }],
  };

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    slideContainer: {
      position: "relative",
      flex: 6,
      width: "100%",
    },
    progress: {
      flexDirection: "row",
      width: "100%",
    },
    progressIndicator: {
      flex: 1, // Each indicator will take equal space
      height: 4, // Set the height of the indicator
      backgroundColor: theme.colors.inactiveProgessBar, // Default color for indicators
      marginHorizontal: 2, // Optional: add some spacing between indicators
    },
    progressIndicatorPassed: {
      backgroundColor: theme.colors.progressBar, // Color for passed cards
    },
    progressIndicatorCurrent: {
      backgroundColor: "#38DAEF", // Optional: if you want to highlight the current card differently
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      backgroundColor: theme.colors.backgroundColor,
    },
    topNav: {
      backgroundColor: "transparent",
      display: "flex",
      alignItems: "flex-start",
      width: "100%",
      flex: 0.4,
      paddingHorizontal: 26,
      paddingVertical: 28,
      gap: 16,
      justifyContent: "center",
    },
    flashCardAnimated: {
      backgroundColor: "transparent",
      position: "absolute",
      zIndex: 9999,
      height: "100%",
      width: "100%",
      alignSelf: "center",
      justifyContent: "center",
      pointerEvents: "none",
    },
    FlashCard: {
      position: "absolute",
      flex: 6,
      backgroundColor: theme.colors.container,
      width: "100%",
    },
    flashCardContainer: {
      position: "relative",
      flex: 5,
      backgroundColor: "transparent",
      width: "100%",
      paddingHorizontal: 36,
    },
    bottomControls: {
      flex: 1.6,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "transparent",
      alignItems: "center",
      gap: 26,
      paddingHorizontal: 20,
    },
    right: {
      backgroundColor: theme.colors.greenButton,
    },
    left: {
      backgroundColor: theme.colors.redButton,
    },
    controls: {
      flex: 1,
      height: 100,
      backgroundColor: theme.colors.inactiveProgessBar,

      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      shadowColor: theme.colors.border,
      shadowOffset: {
        width: 4, // X offset
        height: 4, // Y offset
      },
      shadowOpacity: 1, // Transparency (0 to 1)
      shadowRadius: 0, // Blur radius
      elevation: 5, // Android-specific elevation
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    counter: {
      justifyContent: "center",
      alignItems: "center",
      width: 36,
      height: 36,
      borderWidth: 3,
      borderRadius: 100,
      padding: 4,
    },
    counterText: {
      fontSize: 18,
      fontFamily: theme.typography.fonts.mediumFont,
    },
    navContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    centerControl: {
      flex: 1,
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: -26,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });
  // Background color animation
  const counterBackgroundColor = counterColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, "#98FF5D"], // Change colors as needed
  });

  // Text scale animation
  const counterTextStyle: Animated.WithAnimatedValue<StyleProp<TextStyle>> = {
    transform: [{ scale: counterScaleAnim }],
  };

  const animatedTextColor = textColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border, "#98FF5D"], // Colors for the animation
  });

  if (currentSession) {
    console.log(currentSession.toString());
  }

  return (
    <SafeAreaView style={styles.container}>
      {currentSession && (
        <>
          {/* <Text>{`I${isFlipped}, W${wasFlipped}`}</Text> */}
          <View style={styles.topNav}>
            <View style={styles.navContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome6 name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
              <Animated.View
                style={[
                  styles.counter,
                  { borderColor: counterBackgroundColor },
                ]}
              >
                <Animated.Text
                  style={[
                    styles.counterText,
                    counterTextStyle,
                    { color: animatedTextColor },
                  ]}
                >
                  {`${numOfLoops}x`}
                </Animated.Text>
              </Animated.View>
            </View>
            <View style={styles.progress}>{renderProgressIndicators()}</View>
          </View>
          <View style={styles.flashCardContainer}>
            <FlashCard
              term={dynamicHead!.card!.term}
              romanization={`(${Aromanize.hangulToLatin(dynamicHead!.card!.term, "rr-translit")})`}
              definition={dynamicHead!.card!.definition}
              onFlip={() => setIsFlipped(!isFlipped)}
              resetFlip={resetFlip}
            />
            {Object.keys(currPlaylist!.playlist).length > 1 && (
              <View
                style={[
                  styles.flashCardAnimated,
                  { zIndex: sliderIndex, opacity: sliderIndex },
                ]}
              >
                <Animated.View style={[cardStyle]}>
                  <FlashCardSlider
                    term={currentSession.getPartitionHead()!.card!.term}
                    romanization={`(${Aromanize.hangulToLatin(currentSession.getPartitionHead()!.card!.term, "rr-translit")})`}
                    definition={
                      currentSession.getPartitionHead()!.card!.definition
                    }
                    isFlipped={wasFlipped || isFlipped}
                  />
                </Animated.View>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={bringBackCard}
            style={styles.centerControl}
          >
            <FontAwesome6 name="rotate-left" size={38} color="#929292" />
          </TouchableOpacity>
          <View style={styles.bottomControls}>
            <TouchableOpacity
              onPress={() => moveCard("left")}
              style={[styles.controls, styles.left]}
            >
              <FontAwesome6 name="circle-xmark" size={44} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => moveCard("right")}
              style={[styles.controls, styles.right]}
            >
              <FontAwesome6 name="circle-check" size={44} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
// const styles = StyleSheet.create({
//   slideContainer: {
//     position: "relative",
//     flex: 6,
//     width: "100%",
//   },
//   progress: {
//     flexDirection: "row",
//     width: "100%",
//   },
//   progressIndicator: {
//     flex: 1, // Each indicator will take equal space
//     height: 4, // Set the height of the indicator
//     backgroundColor: "#E0E0E0", // Default color for indicators
//     marginHorizontal: 2, // Optional: add some spacing between indicators
//   },
//   progressIndicatorPassed: {
//     backgroundColor: "#38DAEF", // Color for passed cards
//   },
//   progressIndicatorCurrent: {
//     backgroundColor: "#38DAEF", // Optional: if you want to highlight the current card differently
//   },
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//     backgroundColor: "#F2E8E1",
//   },
//   topNav: {
//     backgroundColor: "transparent",
//     display: "flex",
//     alignItems: "flex-start",
//     width: "100%",
//     flex: 0.4,
//     paddingHorizontal: 26,
//     paddingVertical: 28,
//     gap: 16,
//     justifyContent: "center",
//   },
//   flashCardAnimated: {
//     backgroundColor: "transparent",
//     position: "absolute",
//     zIndex: 9999,
//     height: "100%",
//     width: "100%",
//     alignSelf: "center",
//     justifyContent: "center",
//     pointerEvents: "none",
//   },
// FlashCard: {
//     position: "absolute",
//     flex: 6,
//     backgroundColor: "white",
//     width: "100%",
//   },
//   flashCardContainer: {
//     position: "relative",
//     flex: 5,
//     backgroundColor: "transparent",
//     width: "100%",
//     paddingHorizontal: 36,
//   },
//   bottomControls: {
//     flex: 1.6,
//     width: "100%",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "transparent",
//     alignItems: "center",
//     gap: 26,
//     paddingHorizontal: 20,
//   },
//   right: {
//     backgroundColor: "#72DA4F",
//   },
//   left: {
//     backgroundColor: "#FF454C",
//   },
//   controls: {
//     flex: 1,
//     height: 100,
//     backgroundColor: "#D9D9D9",

//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 8,
//     shadowColor: "#171717",
//     shadowOffset: {
//       width: 4, // X offset
//       height: 4, // Y offset
//     },
//     shadowOpacity: 1, // Transparency (0 to 1)
//     shadowRadius: 0, // Blur radius
//     elevation: 5, // Android-specific elevation
//     borderWidth: 1,
//     borderColor: "black",
//   },
//   centerControl: {
//     flex: 1,
//     backgroundColor: "transparent",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: -26,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });
