import { AntDesign } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react'
import { Button, View, ScrollView, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import { auth } from '../../../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LibraryContext from '../../../utils/contexts/LibraryContext';

import { useTheme } from "../../../utils/contexts/ThemeContext";



export function LoginScreen({ navigation, route }: any) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  const [error, setError] = useState('');
  
  const { user } = useContext(LibraryContext);
  useEffect(() => { 
    if (user) 
      navigation.navigate("LibraryScreen")
  }, [user]);
  
  const handleSubmitForLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, emailInput, passwordInput)
      console.log("sign in as ", response)
      navigation.navigate("LibraryScreen")
    }
    catch (error) {
      console.log(error)
      setError("Something went wrong. Try again.")
    }
  }

  const {theme} = useTheme();
  const loginStyle = StyleSheet.create({
    mainContainer: {
      width: "100%",
      height: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.backgroundColor
    },
    loginContainer: {
      width:'90%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
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
      width: '80%',
      fontSize: 16,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: 'black',
      marginTop: 25,
    },
    loginForgotContainer: {
      width: '80%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      fontSize: 11,
      marginTop: 10,
      marginBottom: 30,
    },
    loginForgotText: {
      textDecorationLine: 'underline',
      fontSize: 11,
    },
    loginRegisterContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    loginRegisterText: {
      fontSize: 13,
    },
    loginRegisterLink: {
      textDecorationLine: 'underline',
      fontSize: 13,
      fontWeight: "bold",
    },
    loginSignInBtn: {
      marginBottom: 40,
      fontSize: 16,
      fontWeight: "bold",
      color: '#FFFFFF',
      backgroundColor: 'black',
      paddingHorizontal: 70,
      paddingVertical: 15, 
      borderRadius: 11,
    },
  })
  
  return (
    <View style={loginStyle.mainContainer}>
      <View style={loginStyle.loginContainer}>
        <Text style={loginStyle.loginTitle}> LOGIN </Text>

        {(error !== "") && <Text>{error}</Text>}

        {/* Custom Login */}
        <TextInput
          style={loginStyle.loginInput}
          onChangeText={setEmailInput}
          placeholder='Username'
          placeholderTextColor="#D3D3D3" 
          value={emailInput}
        />

        <TextInput
          secureTextEntry={true}
          style={loginStyle.loginInput}
          onChangeText={setPasswordInput}
          placeholder='Password'
          placeholderTextColor="#D3D3D3" 
          value={passwordInput}
        />

        <View style={loginStyle.loginForgotContainer}>
          <Pressable >
            <Text style={loginStyle.loginForgotText}>Forgot Password</Text>
          </Pressable>
        </View>

        {/* Custom Register */}
        <Pressable style={loginStyle.loginRegisterContainer} onPress={() => navigation.navigate("RegisterScreen")}>
            <Text style={loginStyle.loginRegisterText}>Don't have an account?&nbsp;</Text>
            <Text style={loginStyle.loginRegisterLink}>Register Here</Text>
        </Pressable>

        <Pressable onPress={handleSubmitForLogin}>
          <Text style={loginStyle.loginSignInBtn}>Sign In</Text>
        </Pressable>
      </View>
    </View>
  )
}
