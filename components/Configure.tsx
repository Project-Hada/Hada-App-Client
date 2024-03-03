import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Router from './Router';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';

export default function Configure() {



  const [first, setfirst] = useState("meep")
  return (
    <View style={{backgroundColor: '#F2E8E1'}}>
      <Router meep={"skippy"} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});