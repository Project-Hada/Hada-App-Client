import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { useState, useEffect } from 'react'
import { Button, View, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';

export function LoginScreen({ navigation, route }: any) {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleSubmitForLogin = async () => {
    // if valid credentials:
    navigation.navigate("LibraryScreen")
    
    // else:
    //    on the same page throw an error
  }

  return (
    <View style={{paddingHorizontal: 20}}>
      {/* Custom Login */}
      <TextInput
        style={styles.input}
        onChangeText={setUsernameInput}
        placeholder='username'
        placeholderTextColor="#D3D3D3" 
        value={usernameInput}
      />
      {/* TODO: Fix unsafe password input */}
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
      TESTING ONLY: Press LOGIN to immediately navigate to LibraryScreen

      {/* Custom Register */}
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