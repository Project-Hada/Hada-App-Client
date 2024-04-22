import React, { useRef } from 'react';
import { useTheme } from '../utils/contexts/ThemeContext';
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import GearModal from './GearModal';

interface GearButtonProps {
  openModal: () => void;
}

const GearButton: React.FC<GearButtonProps> = ({ openModal }) => {
  const { toggleTheme } = useTheme();
  const modalizeRef = useRef<Modalize>(null); 

  const {theme} = useTheme();
  const styles = StyleSheet.create(
  {gearButtonContainer: {
    position: 'relative',
    padding: 8,
    marginLeft: 4,
  },
});

const onOpen = () => {
  modalizeRef.current?.open();
};

  // Return the button element
  return (
    <><View style={styles.gearButtonContainer}>
      <TouchableOpacity onPress={openModal}>
        <Octicons name="gear" size={28} color={theme.colors.gearButton} />
      </TouchableOpacity>
    </View>
    <GearModal ref={modalizeRef} />
    </> 
  );
};

export default GearButton;