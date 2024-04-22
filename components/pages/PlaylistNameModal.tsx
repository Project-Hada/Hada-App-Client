import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTheme } from '../../utils/contexts/ThemeContext';

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
    const [newName, setNewName] = useState<string>(currentName || '');
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
    },
    modalContainer: {
        margin: 20,
        backgroundColor: theme.colors.listBackground,
        borderColor: theme.colors.border,
        borderRadius: 10,
        borderWidth: 1,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        padding: 25,
        paddingBottom: 0,
        paddingHorizontal: 0,
        alignItems: "center",
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold",
        color: theme.colors.text,
    },
    input: {
        height: 40,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: theme.colors.backgroundColor,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: -10,
    },
    cancelButton: {
        backgroundColor: theme.colors.redButton,
    },
    saveButton: {
        backgroundColor: theme.colors.greenButton,
    },
    newPlaylist: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flex: 1, 
        flexDirection: 'row',
        borderRadius: 10, 
        padding: 15, 
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRightWidth: 4,
        borderBottomWidth: 4,
    },
    });

    useEffect(() => {
        if (isVisible) {
          setNewName(''); 
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
            <View style={styles.newPlaylist} >
                <Text 
                style={({
                    fontFamily: theme.typography.fonts.mediumFont, 
                    fontSize: 16,  
                    color: theme.colors.text })}> 
                    New Playlist Name: 
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
                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                    <Text style={({fontFamily: theme.typography.fonts.boldFont})}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                    <Text style={({fontFamily: theme.typography.fonts.boldFont})}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PlaylistRenameModal;