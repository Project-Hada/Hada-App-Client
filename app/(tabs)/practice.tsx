import React from 'react';
import { Pressable, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import FlashCard from '@/components/Practice/FlashCard';

export default function PracticeScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topNav}>
            <Text> {'<'} </Text>
        </View>
        <View style={styles.flashCardContainer}>
        <FlashCard definition={'나무'} romanization={'(namu)'} translation={'too much'} />
      </View>
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.leftControl}>
          <Text>X</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerControl}>
          <Text>{'<-'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightControl}>
          <Text>O</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  topNav: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    flex: .4,
    paddingLeft: 16,
    justifyContent: 'center'
  },
  flashCardContainer: {
    flex: 6,
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  bottomControls: {
    flex: 1.4,
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "white",
    alignItems: 'center'
  },
  leftControl: {
    flex: 1,
    height: 100,
    backgroundColor: '#D9D9D9',
    width: 121,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
    
  },
  centerControl: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightControl: {
    flex: 1,
    height: 100,
    backgroundColor: '#D9D9D9',
    width: 121,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
