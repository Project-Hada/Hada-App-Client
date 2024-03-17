import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { useState, useEffect } from 'react'
import { Button, View, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { RegisterScreen } from './RegisterScreen';

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
      <h1> LOGIN </h1>

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

      <Button
        title="Login"
        onPress={handleSubmitForLogin}
      />
      TESTING ONLY: Press LOGIN to immediately navigate to LibraryScreen
      
      {/* Custom Register */}
      <Pressable style={{ flexDirection: 'row', paddingTop: 20}} onPress={() => navigation.navigate("RegisterScreen")}>
        <AntDesign name="plussquareo" size={24} color="black" /> Register
      </Pressable>

      {/* TESTING ONLY */}
      <Pressable style={{ flexDirection: 'row', paddingTop: 20}} onPress={() => navigation.navigate("BackendDemo")}>
        <AntDesign name="codesquareo" size={24} color="black" /> BackendDemo
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