import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { useState, useEffect } from 'react'
import { Button, View, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';

export function RegisterScreen({ navigation, route }: any) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const handleSubmitForRegister = async () => {
    // if valid credentials:
    navigation.navigate("LoginScreen")
    
    // else:
    //    on the same page throw an error
  }

  return (
    <View style={{paddingHorizontal: 20}}>
      <h1> REGISTER </h1>

      {/* Custom Login */}
      <TextInput
        style={styles.input}
        onChangeText={setUsernameInput}
        placeholder='username'
        placeholderTextColor="#D3D3D3" 
        value={usernameInput}
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