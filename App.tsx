import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Configure from './components/Configure';

export default function App() {
  return (
    <View style={{backgroundColor: '#F2E8E1'}}>
      <Configure />
    </View>
  );
}
