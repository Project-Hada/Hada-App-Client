// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from './_layout';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={{backgroundColor: '#F2E8E1'}}>
        <NavigationContainer>
            <RootLayout />
        </NavigationContainer>
    </View>
  );
}
