import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useTheme } from "../../utils/contexts/ThemeContext";

type PlaylistRenameModalProps = {
  isVisible: boolean;
  onClose: () => void;
  currentName: string;
  onSave: (newName: string) => void;
};

const PlaylistRenameModal: React.FC<PlaylistRenameModalProps> = ({
  isVisible,
  onClose,
  currentName,
  onSave,
}) => {
  const [newName, setNewName] = useState<string>(currentName || "");
  const inputRef = useRef(null);

  const handleSave = () => {
    onSave(newName); // Save new name
    onClose();
  };

  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      paddingHorizontal: 32,
    },
    modalContainer: {
      margin: 20,
      backgroundColor: "white",
      borderColor: theme.colors.border,
      borderRadius: 10,
      borderWidth: 1,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      padding: 25,
      paddingBottom: 20,
      paddingHorizontal: 18,
      alignItems: "center",
      width: "100%",
    },
    modalTitle: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 24,
      fontFamily: theme.typography.fonts.boldFont,
      color: "black",
    },
    input: {
      height: 46,
      marginTop: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: "white",
      width: "100%",
      borderColor: "black",
      borderWidth: 1,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: -10,
      marginTop: 16,
      width: "100%",
    },
    cancelButton: {
      backgroundColor: theme.colors.redButton,
    },
    saveButton: {
      backgroundColor: theme.colors.greenButton,
    },
    newPlaylist: {
      width: "100%",
    },
    button: {
      flex: 1,
      flexDirection: "row",
      borderRadius: 10,
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      paddingVertical: 20,
      maxWidth: 134,
    },
    prevCont: {
      width: "100%",
      paddingHorizontal: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.backgroundColor,
      height: 46,
      marginBottom: 16,
      justifyContent: "center",
      marginTop: 8,
      borderColor: "black",
      borderWidth: 1,
    },
  });

  useEffect(() => {
    if (isVisible) {
      setNewName("");
    }
  }, [isVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Rename Playlist</Text>
            <View style={styles.newPlaylist}>
              <Text
                style={{
                  fontFamily: theme.typography.fonts.mediumFont,
                  fontSize: 16,
                  color: theme.colors.text,
                  marginRight: 5,
                }}
              >
                Previous Name
              </Text>
              <View style={styles.prevCont}>
                <Text> {currentName}</Text>
              </View>
            </View>
            <View style={styles.newPlaylist}>
              <Text
                style={{
                  fontFamily: theme.typography.fonts.mediumFont,
                  fontSize: 16,
                  color: theme.colors.text,
                  marginRight: 5,
                }}
              >
                New Name
              </Text>
              <TextInput
                style={styles.input}
                ref={inputRef}
                onChangeText={setNewName}
                value={newName}
                autoFocus={true}
                placeholder={currentName}
                placeholderTextColor={theme.colors.subtext}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text
                  style={{
                    fontFamily: theme.typography.fonts.boldFont,
                    fontSize: 16,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text
                  style={{
                    fontFamily: theme.typography.fonts.boldFont,
                    fontSize: 16,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PlaylistRenameModal;
