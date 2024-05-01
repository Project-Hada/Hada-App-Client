import React, { useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import DeckPreview from "./DeckPreview";
import { useTheme } from "../../../utils/contexts/ThemeContext";

const DeckPreviewModal = () => {
  const modalizeRef = useRef<Modalize>(null);
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    handle: {
      width: 100,
      backgroundColor: theme.colors.container,
    },
    container: {
      backgroundColor: theme.colors.listBackground,
      paddingTop: 30,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
  });

  return (
    <>
      {/* Modal component for sliding panel */}
      <Modalize
        ref={modalizeRef}
        modalHeight={450}
        alwaysOpen={35}
        handlePosition="inside"
        handleStyle={styles.handle}
        panGestureEnabled={true}
        closeOnOverlayTap={true}
        modalStyle={styles.container}
      >
        <DeckPreview withinModal={true} />
      </Modalize>
    </>
  );
};

export default DeckPreviewModal;
