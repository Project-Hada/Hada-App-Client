import React, { useContext, useRef, useState } from "react";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text, Image, Alert} from "react-native";
import { useTheme } from "../../utils/contexts/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import LibraryContext from "../../utils/contexts/LibraryContext";
import * as ImagePicker from "expo-image-picker";

interface SettingsScreenProps {
  openModal: () => void;
  navigation: any;
  profileImage: any;
  setProfileImage: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  openModal,
  navigation,
}) => {
  const { theme, themeMode, toggleTheme } = useTheme();

  const { user, handleLogout, profileImage, setProfileImage } =
    useContext(LibraryContext);

  const switchTheme = (mode: "light" | "dark") => {
    if (themeMode !== mode) {
      toggleTheme();
    }
  };

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

  const handleUserSignOut = () => {
    handleLogout();
    navigation.navigate("LoginScreen");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.backgroundColor,
      justifyContent: "space-between",
    },
    header: {
      flexDirection: "row",
      position: "relative",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      height: 80,
    },
    headerText: {
      fontFamily: theme.typography.fonts.boldFont,
      alignSelf: "center",
      justifyContent: "center",
      height: 25,
      fontSize: 20,
      color: theme.colors.text,
    },
    backArrowContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 7,
      padding: 6,
      borderColor: "black",
      borderWidth: 2,
      position: "absolute",
      left: 4,
    },
    pfpContainer: {
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    creds: { marginBottom: 12 },
    credContainer: {
      gap: 5,
      marginBottom: 12,
    },
    credTitle: {
      fontFamily: theme.typography.fonts.boldFont,
      fontSize: 14,
      color: theme.colors.text,
    },
    credTextContainer: {
      backgroundColor: "white",
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderColor: "black",
      borderWidth: 1,
    },
    credText: {},
    themeConainer: {},
    displayMode: {
      flex: 1,
      marginHorizontal: 12,
      marginTop: 0,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      height: 200,
    },
    modeText: {
      textAlign: "center",
      color: "black",
    },
    textPadding: {
      borderBottomLeftRadius: 8.5,
      borderBottomRightRadius: 8.5,
      backgroundColor: "white",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      width: "100%",
      paddingVertical: 5,
    },
    handle: {
      width: 100,
      backgroundColor: theme.colors.container,
    },
    previewImage: {
      width: "100%",
      height: "85%",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 6,
    },
    themeContainer: {},
    themeSelect: {
      flexDirection: "row",
    },
    signout: {
      width: "100%",
      borderRadius: 6,
      backgroundColor: "#FF454C",
      borderWidth: 1,
      paddingVertical: 10,
      alignItems: "center",
      marginBottom: 20
    },
    signoutText: {
      fontFamily: theme.typography.fonts.semiboldFont,
      fontSize: 22,
    },
    headerTextContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    edit: {
      fontFamily: theme.typography.fonts.mediumFont,
    },
    editContainer: {
      marginTop: -16,
      backgroundColor: "white",
      padding: 5,
      paddingHorizontal: 24,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 8,
    },
    themeText: {
      fontFamily: theme.typography.fonts.boldFont,
      fontSize: 16,
      marginBottom: 12,
      color: theme.colors.text,
    },
    top: {
      paddingHorizontal: 16,
    },
    signoutContainer: {
      backgroundColor: theme.colors.listBackground,
      paddingTop: 10,
      borderTopColor: theme.colors.border,
      paddingHorizontal: 16,
      borderTopWidth: 1,
    }
  });
  //navigation.goBack();
  // Return the button element
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 0,
              justifyContent: "center",
              width: 100,
              height: 100,
            }}
            onPress={() => navigation.goBack()}
          >
            <View style={[theme.shadow.default, styles.backArrowContainer]}>
              <AntDesign name="arrowleft" size={26} color="black" />
            </View>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}> Settings </Text>
          </View>
        </View>

        <View style={styles.pfpContainer}>
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={[
                  {
                    width: 94,
                    height: 94,
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: "black",
                  },
                ]}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-circle-outline"
                size={94}
                color={theme.colors.text}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            style={[styles.editContainer, theme.shadow.default]}
          >
            <Text style={styles.edit}>edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.creds}>
          <View style={styles.credContainer}>
            <Text style={styles.credTitle}>Username</Text>
            <View style={[styles.credTextContainer, theme.shadow.default]}>
              <Text style={styles.credText}>{user?.email}</Text>
            </View>
          </View>

          <View style={styles.credContainer}>
            <Text style={styles.credTitle}>Password</Text>
            <View style={[styles.credTextContainer, theme.shadow.default]}>
              <Text style={styles.credText}>*********</Text>
            </View>
          </View>
        </View>
        <View style={styles.themeContainer}>
          <Text style={styles.themeText}>Theme</Text>
          <View style={styles.themeSelect}>
            <TouchableOpacity
              style={[styles.displayMode, theme.shadow.default]}
              onPress={() => switchTheme("light")}
            >
              {/* preview of light mode */}

              <Image
                source={require("../../components/LightModePreview.png")}
                resizeMode="cover"
                style={styles.previewImage}
              />
              <View style={styles.textPadding}>
                <Text style={styles.modeText}>Light Mode</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.displayMode, theme.shadow.default]}
              onPress={() => switchTheme("dark")}
            >
              {/* preview of dark mode */}
              <Image
                source={require("../../components/DarkModePreview.png")}
                resizeMode="cover"
                style={styles.previewImage}
              />
              <View style={styles.textPadding}>
                <Text style={styles.modeText}>Dark Mode</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.signoutContainer}>
        <TouchableOpacity
          style={[styles.signout, theme.shadow.default]}
          onPress={handleUserSignOut}
        >
          <Text style={styles.signoutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
