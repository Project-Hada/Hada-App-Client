import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { SafeAreaFrameContext, SafeAreaView } from 'react-native-safe-area-context';

export default function PracticeScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topNav}>
            <Text> {'<'} </Text>
        </View>
        <View style={styles.flashCardContainer}>
            <View style={styles.flashCard}>
                <View style={styles.definitionContainer}>
                    <Text style={styles.definition}>
                        나무
                    </Text>
                </View>
                <View style={styles.romanizationContainer}>
                    <Text style={styles.romanization}>
                        {'(namu)'}
                    </Text>
                </View>
            </View>
        </View>
        <View style={styles.bottomControls}>
          <View style={styles.leftControl}>
            <Text>X</Text>
          </View>
          <View style={styles.centerControl}>
            <Text>{'<-'}</Text>
          </View>
          <View style={styles.rightControl}>
            <Text>O</Text>
          </View>
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
  flashCard: {
    flex: 1,
    backgroundColor: '#BEBEBE',
    width: '100%',
    borderRadius: 13,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'  
  },
  definitionContainer: {
    backgroundColor: 'transparent'
  },
  definition: {
    fontSize: 38,
    backgroundColor: 'transparent'
  },
  romanizationContainer: {
    backgroundColor: 'transparent'
  },
  romanization: {
    backgroundColor: 'transparent'
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
