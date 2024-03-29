import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { useState, useEffect } from 'react'
import { Button, View, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { auth } from '../../../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function LoginScreen({ navigation, route }: any) {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [error, setError] = useState('');

  const handleSubmitForLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, emailInput, passwordInput)
      console.log(response)
      navigation.navigate("LibraryScreen")
    }
    catch (error) {
      console.log(error)
      setError("Something went wrong. Try again.")
    }
  }

  return (
    <View style={{paddingHorizontal: 20}}>
      <h1> LOGIN </h1>

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

      <Button
        title="Login"
        onPress={handleSubmitForLogin}
      />
      
      {/* Custom Register */}
      <Pressable style={{ flexDirection: 'row', paddingTop: 20}} onPress={() => navigation.navigate("RegisterScreen")}>
        <AntDesign name="plussquareo" size={24} color="black" /><span>Register</span>
      </Pressable>

      {/* TESTING ONLY */}
      <Pressable style={{ flexDirection: 'row', paddingTop: 20}} onPress={() => navigation.navigate("BackendDemo")}>
        <AntDesign name="codesquareo" size={24} color="black" /><span>BackendDemo</span>
      </Pressable>
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