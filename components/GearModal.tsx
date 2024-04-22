import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useTheme } from '../utils/contexts/ThemeContext';

const GearModal = React.forwardRef<Modalize>((props, ref) => {
    const { theme, themeMode, toggleTheme } = useTheme();
    const modalizeRef = useRef<Modalize>(null);
    
    const styles = StyleSheet.create({
        header: {
            margin: 15,
        },
        headerText: {
            marginTop: 10,
            fontSize: theme.typography.library.playlistTitleSize,
            fontFamily: theme.typography.fonts.boldFont,
            color: theme.colors.text
        },
        modalContent: {
            flexDirection: 'row', 
            justifyContent: 'space-evenly', 
            alignItems: 'center', 
            padding: 15,
            backgroundColor: theme.colors.listBackground
        },
        displayMode: {
            flex: 1, 
            marginHorizontal: 12, 
            marginTop: 0,
            borderRadius: 10, 
            borderWidth: 2, 
            borderColor: theme.colors.border, 
            justifyContent: 'center', 
            alignItems: 'center', 
            position: 'relative',
            height: 180, 
        },
        modeText: {
            textAlign: 'center',
            color: theme.colors.text,
            
        },
        textPadding: {
            borderBottomLeftRadius: 8.5,
            borderBottomRightRadius: 8.5,
            backgroundColor: theme.colors.backgroundColor,
            width: '100%',
            paddingVertical: 5,
        },
        handle: {
            width: 100,
            backgroundColor: theme.colors.container
        },
        previewImage: {
            width: '100%',
            height: '85%', 
            borderTopLeftRadius: 8.5,
            borderTopRightRadius: 8.5,
        }
    });

  const switchTheme = (mode: 'light' | 'dark') => {
    if (themeMode !== mode) {
        toggleTheme();
    }
    modalizeRef.current?.close();
  };

  return (
    <Modalize 
      ref={ref}
      adjustToContentHeight
      modalStyle={{ backgroundColor: theme.colors.listBackground }}
      handlePosition="inside"
      handleStyle={styles.handle}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Display Settings</Text>
      </View>
      <View style={styles.modalContent}>
        <TouchableOpacity 
          style={styles.displayMode} 
          onPress={() => switchTheme('light')}
        >
        {/* preview of light mode */}
        <Image 
            source={require('../components/LightModePreview.png')}
            resizeMode="cover"
            style={styles.previewImage}
        />
        <View style={styles.textPadding}>
          <Text style={styles.modeText}>Light Mode</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.displayMode} 
          onPress={() => switchTheme('dark')}
        >
        {/* preview of dark mode */}
        <Image 
            source={require('../components/DarkModePreview.png')}
            resizeMode="cover"
            style={styles.previewImage}
        />
        <View style={styles.textPadding}>
          <Text style={styles.modeText}>Dark Mode</Text>
        </View>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
});

export default GearModal;
