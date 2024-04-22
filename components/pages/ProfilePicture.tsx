import React, { useContext, useState } from "react";
import { TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../utils/contexts/ThemeContext";
import LibraryContext from "../../utils/contexts/LibraryContext";

const ProfilePicture = () => {
  const { theme } = useTheme();
  const { profileImage, setProfileImage } = useContext(LibraryContext);

  const pickImage = async () => {
    let mediaLibraryPermissionResponse;
    // Request permissions to access the media library
    mediaLibraryPermissionResponse =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (mediaLibraryPermissionResponse.status !== "granted") {
      Alert.alert(
        "Permission Required",
        "This requires access to your photo library."
      );
      return;
    }
    // Choosing an image from the gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // If the operation is not canceled and an image is picked
    if (!result.canceled && result.assets) {
      setProfileImage(result.assets[0].uri);
    }
  };
  return (
    <TouchableOpacity onPress={pickImage} style={{ marginTop: -4 }}>
      {profileImage ? (
        <Image
          source={{ uri: profileImage }}
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            borderWidth: 1,
            borderColor: theme.colors.listBackground,
          }}
        />
      ) : (
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={60}
          color={theme.colors.text}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProfilePicture;
