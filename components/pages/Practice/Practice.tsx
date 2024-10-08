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
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import FlashCard from "./Flashcard";
import FlashCardSlider from "./FlashcardSlider";
import Aromanize from "aromanize";
import { FlashCardType } from "../../../utils/types";
import { useTheme } from "../../../utils/contexts/ThemeContext";
import { CardNode, Session } from "./sessionAlgorithm";
import DeckPreviewModal from "../DeckPreview/DeckPreviewModal";
import GearButton from "../../GearButton";
import { Modalize } from "react-native-modalize";

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
  const modalizeRef = useRef<Modalize>(null);

  const openModal = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    if (currPlaylist) {
      if (!currentSession) {
        const session = new Session(
          currPlaylist,
          updateFlashcard,
          updatePlaylist
        );

        session.startSession();
        setSession(session);
        // console.log(session.toString());

        setDynamicHead(session.getPartitionHead());
      }
    }
  }, [currPlaylist]);

  const animateOpacity = () => {
    // Reset opacity to 1 without animation for instant change
    opacityAnim.setValue(1);

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
      let partLength = currentSession.getPartitionLength();
      let partSize = currentSession.getPartitionSizeOnCreation();
      const currIndex = partSize - partLength - 1;
      // console.log("oop", currIndex, partSize, partLength);

      // console.log(currentSession.getNumOfLoops());
      // console.log(currentSession.getHasLoopped());

      if (currentSession.getNumOfLoops() > numOfLoops) {
        setNumOfLoops(currentSession.getNumOfLoops());
        animateOpacity();
        animateOpacity();
        animateCounter();
        animateTextColor();
      }
      for (let index = 0; index < partSize; index++) {
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
    navigation.goBack();
  };

  // Function to handle the card swipe animation
  const moveCard = (direction: string) => {
    if (!currentSession) return;
    // console.log(currentSession.toString());
    if (currentSession.getPartitionHead()) {
      if (direction === "right") {
        currentSession.pass();
      } else {
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
      height: 3.5, // Set the height of the indicator
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
      marginTop: 5,
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
      marginTop: 30,
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
      marginBottom: 20,
      marginTop: -5,
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
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: 30,
      height: 30,
      borderWidth: 2.25,
      borderRadius: 100,
      borderColor: theme.colors.subtext,
      marginTop: -10,
    },
    counterText: {
      fontSize: 16,
      fontFamily: theme.typography.fonts.mediumFont,
    },
    progressInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    navContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      marginTop: 10,
    },
    centerControl: {
      flex: 1,
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: -30,
      marginTop: -10,
    },
    title: {
      fontSize: 20,
      fontFamily: theme.typography.fonts.boldFont,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    headerTitle: {
      fontFamily: theme.typography.fonts.semiboldFont,
      fontSize: theme.typography.deckPreview.deckTitleSize,
      color: theme.colors.text,
      marginLeft: -100,
    },
    gearButton: {
      marginBottom: -20,
      marginVertical: -15,
    },
    subHeader: {
      flexDirection: "row",
      alignItems: "center",
    },
    wordCountContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: -10,
    },
    wordCount: {
      fontFamily: theme.typography.fonts.regularFont,
      fontSize: theme.typography.deckPreview.wordCountSize,
      color: "#B6B6B6",
      paddingLeft: 4,
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
    // console.log(currentSession.toString());
  }

  return (
    <SafeAreaView style={styles.container}>
      {currentSession && (
        <>
          {/* <Text>{`I${isFlipped}, W${wasFlipped}`}</Text> */}
          <View style={styles.topNav}>
            <View style={styles.navContainer}>
              <TouchableOpacity onPress={handleBackPress}>
                <FontAwesome6 name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>{currPlaylist?.title}</Text>
              <View style={styles.gearButton}>
                <GearButton navigation={navigation} />
              </View>
            </View>

            <View style={styles.progress}>{renderProgressIndicators()}</View>
            <View style={styles.progressInfo}>
              <View style={styles.wordCountContainer}>
                {/* Card Icon */}
                <MaterialCommunityIcons
                  name="cards-variant"
                  size={22}
                  color="#B6B6B6"
                />
                <Text style={[styles.wordCount]}>
                  {Object.keys(currPlaylist.playlist).length} words
                </Text>
              </View>
              <Animated.View style={[styles.counter]}>
                <Animated.Text
                  style={[
                    styles.counterText,
                    counterTextStyle,
                    { color: theme.colors.subtext },
                  ]}
                >
                  {`${numOfLoops}x`}
                </Animated.Text>
              </Animated.View>
            </View>
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
          {/* <DeckPreviewModal /> */}
        </>
      )}
    </SafeAreaView>
  );
}
