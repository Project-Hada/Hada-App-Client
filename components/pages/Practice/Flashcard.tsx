import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import speak from "../../../utils/tts";
import { useTheme } from "../../../utils/contexts/ThemeContext";
import { typography } from "../../theme/Typography";
import { spacing } from "../../theme/Spacing";

type FlashCardProps = {
  term: string;
  romanization: string;
  definition: string;
  onFlip: () => void;
  resetFlip: boolean;
};

export default function FlashCard({
  term,
  romanization,
  definition,
  onFlip,
  resetFlip,
}: FlashCardProps) {
  const [flipAnim, setFlipAnim] = useState(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);

  const { theme } = useTheme(); // Using theme from ThemeContext

  // Define dynamic styles here
  const styles = StyleSheet.create({
    flashCardPressableContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 5,
    },
    flashCard: {
      width: "100%",
      height: "100%",
      borderRadius: spacing.flashcard.borderRadius,
      backgroundColor: theme.colors.container,
      justifyContent: 'center',
      alignItems: 'center',
      backfaceVisibility: 'hidden',
      shadowColor: '#171717',
    },
    termContainer: {},
    term: {
      fontSize: typography.flashcard.termSize,
      fontFamily: typography.fonts.variableFont,
      color: theme.colors.text,
    },
    romanizationContainer: {},
    romanization: {
      fontSize: typography.flashcard.romanizationSize,
      fontFamily: typography.fonts.regularFont,
      color: theme.colors.subtext,
    },
    definition: {
      fontSize: typography.flashcard.definitionSize,
      color: theme.colors.text,
    },
    audioButton: {
      position: "absolute",
      top: theme.spacing.flashcard.audioButtonTop,
      right: theme.spacing.flashcard.audioButtonRight,
    },
  });

  const frontAnimatedStyle = {
    zIndex: isFlipped ? 0 : 1,
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    zIndex: isFlipped ? 1 : 0,
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["180deg", "360deg"],
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

  const reset = () => {};

  const handleAudio = () => {
    const textToSpeech = isFlipped ? definition : term;
    const language = isFlipped ? "en-US" : "ko-KR";
    speak(textToSpeech, language);
  };

  return (
    <Pressable onPress={triggerFlip} style={styles.flashCardPressableContainer}>

      <Animated.View
        style={[styles.flashCard, frontAnimatedStyle, theme.shadow.default]}
      >
        <View style={styles.termContainer}>
          <Text style={styles.term}>{term}</Text>
        </View>
        <View style={styles.romanizationContainer}>
          <Text style={styles.romanization}>{romanization}</Text>
        </View>
        <TouchableOpacity style={styles.audioButton} onPress={handleAudio}>
          <FontAwesome
            name="volume-up"
            size={36}
            color={theme.colors.audioButton}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View

        style={[
          styles.flashCard,
          backAnimatedStyle,
          theme.shadow.default,
          { position: "absolute" },
        ]}
      >
        <Text style={styles.definition}>{definition}</Text>
        <TouchableOpacity style={styles.audioButton} onPress={handleAudio}>
          <FontAwesome
            name="volume-up"
            size={36}
            color={theme.colors.audioButton}
          />
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
}

