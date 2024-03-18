import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { useState, useEffect } from 'react'
import { Button, View, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { auth } from '../../../utils/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export function RegisterScreen({ navigation, route }: any) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const [error, setError] = useState('');

  const handleSubmitForRegister = async () => {
    try {
      if (passwordInput != confirmPasswordInput) throw new Error("password mismatch")

      const response = await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
      console.log(response)
      navigation.navigate("LibraryScreen")
    }
    catch (error) {
      console.log(error)
      if (error instanceof Error) {
        setError("Passwords are mismatched. Try again.")
      }
      else {
        setError("Something went wrong. Try again.")
      }
    }
  }

  return (
    <View style={{paddingHorizontal: 20}}>
      <h1> REGISTER </h1>

      {(error !== "") && <p>{error}</p>}

      {/* Custom Login */}
      <TextInput
        style={styles.input}
        onChangeText={setEmailInput}
        placeholder='email'
        placeholderTextColor="#D3D3D3" 
        value={emailInput}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setPasswordInput}
        placeholder='password'
        placeholderTextColor="#D3D3D3" 
        value={passwordInput}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.input}
        onChangeText={setConfirmPasswordInput}
        placeholder='confirm your password'
        placeholderTextColor="#D3D3D3" 
        value={confirmPasswordInput}
      />

      <Button
        title="Register"
        onPress={handleSubmitForRegister}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: "white"
  }
})