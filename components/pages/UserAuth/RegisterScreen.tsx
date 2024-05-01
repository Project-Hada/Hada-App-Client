import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Pressable, Text, ImageBackground } from "react-native";
import { auth } from "../../../utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addNewUserWithID } from "../../../utils/services/usersFunctions";
import { useTheme } from "../../../utils/contexts/ThemeContext";

export function RegisterScreen({ navigation, route }: any) {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const [error, setError] = useState("");
  const emailTest = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  const handleSubmitForRegister = async () => {
    try {
      if (usernameInput === "") setError("name cannot be empty");
      else if (emailInput === "") setError("email cannot be empty");
      else if (!emailTest.test(emailInput))
        setError("email format: abc@xyz.com");
      else if (passwordInput === "" || confirmPasswordInput === "")
        setError("password cannot be empty");
      else if (passwordInput != confirmPasswordInput)
        setError("password mismatch");
      else if (passwordInput.length < 9 || confirmPasswordInput.length < 9)
        setError("must be at least 9 characters");
      else {
        createUserWithEmailAndPassword(auth, emailInput, passwordInput).then(
          (response) => {
            console.log("register as ", response);
            addNewUserWithID(response.user.uid, usernameInput);
          }
        );

        navigation.navigate("LibraryScreen");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { theme } = useTheme();
  const registerStyle = StyleSheet.create({
    mainContainer: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.backgroundColor,
    },
    loginContainer: {
      width: "90%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderWidth: 1,
      borderRightWidth: 4,
      borderBottomWidth: 4,
      borderRadius: 20,
      borderColor: theme.colors.border,
    },
    loginTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 40,
      marginBottom: 15,
    },
    loginInput: {
      width: "80%",
      fontSize: 16,
      borderBottomWidth: 1,
      borderStyle: "solid",
      borderBottomColor: "black",
      marginTop: 25,
    },
    loginForgotContainer: {
      width: "80%",
      flexDirection: "row",
      justifyContent: "flex-end",
      fontSize: 11,
      marginTop: 10,
      marginBottom: 30,
    },
    loginForgotText: {
      textDecorationLine: "underline",
      fontSize: 11,
    },
    loginRegisterContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 40,
    },
    loginRegisterText: {
      fontSize: 13,
    },
    loginRegisterLink: {
      textDecorationLine: "underline",
      fontSize: 13,
      fontWeight: "bold",
    },
    loginSignInBtn: {
      marginBottom: 40,
      fontSize: 16,
      fontWeight: "bold",
      color: "#FFFFFF",
      backgroundColor: "black",
      paddingHorizontal: 70,
      paddingVertical: 15,
      borderRadius: 11,
    },
  });

  return (
    <ImageBackground source={require('./background.png')} style={registerStyle.mainContainer}>
      <View style={registerStyle.loginContainer}>
        <Text style={registerStyle.loginTitle}>Sign Up</Text>

        {/* Custom Login */}
        <TextInput
          style={registerStyle.loginInput}
          onChangeText={setUsernameInput}
          placeholder="Name"
          placeholderTextColor="#D3D3D3"
          value={usernameInput}
        />

        {error === "name cannot be empty" && (
          <Text
            style={{
              width: "80%",
              justifyContent: "flex-start",
              color: "#FF454C",
              marginBottom: -21,
            }}
          >
            {error}
          </Text>
        )}

        <TextInput
          style={registerStyle.loginInput}
          onChangeText={setEmailInput}
          placeholder="Email"
          placeholderTextColor="#D3D3D3"
          value={emailInput}
        />

        {(error === "email cannot be empty" ||
          error === "email format: abc@xyz.com") && (
          <Text
            style={{
              width: "80%",
              justifyContent: "flex-start",
              color: "#FF454C",
              marginBottom: -21,
            }}
          >
            {error}
          </Text>
        )}

        <TextInput
          secureTextEntry={true}
          style={registerStyle.loginInput}
          onChangeText={setPasswordInput}
          placeholder="Password"
          placeholderTextColor="#D3D3D3"
          value={passwordInput}
        />

        {(error === "password mismatch" ||
          error === "password cannot be empty" ||
          error === "must be at least 9 characters") && (
          <Text
            style={{
              width: "80%",
              justifyContent: "flex-start",
              color: "#FF454C",
              marginBottom: -21,
            }}
          >
            {error}
          </Text>
        )}

        <TextInput
          secureTextEntry={true}
          style={registerStyle.loginInput}
          onChangeText={setConfirmPasswordInput}
          placeholder="Confirm Password"
          placeholderTextColor="#D3D3D3"
          value={confirmPasswordInput}
        />

        {(error === "password mismatch" ||
          error === "password cannot be empty" ||
          error === "must be at least 8 characters") && (
          <Text
            style={{
              width: "80%",
              justifyContent: "flex-start",
              color: "#FF454C",
            }}
          >
            {error}
          </Text>
        )}

        <View style={registerStyle.loginForgotContainer}>
          {/* <Pressable >
          <Text style={registerStyle.loginForgotText}>Forgot Password</Text>
        </Pressable> */}
        </View>

        {/* Custom Register */}
        <Pressable
          style={registerStyle.loginRegisterContainer}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={registerStyle.loginRegisterText}>
            Have an account?&nbsp;
          </Text>
          <Text style={registerStyle.loginRegisterLink}>Login Here</Text>
        </Pressable>

        <Pressable onPress={handleSubmitForRegister}>
          <Text style={registerStyle.loginSignInBtn}>Register</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}
