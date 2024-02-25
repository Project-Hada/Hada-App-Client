import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function PracticeScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.topNav}>
            <Text> {'<'} </Text>
        </View>
        <View style={styles.flashCardContainer}>
            <View style={styles.flashCard}>
                <View >
                    <Text style={styles.definition}>
                        나무
                    </Text>
                </View>
                <View >
                    <Text style={styles.romanization}>
                        {'(namu)'}
                    </Text>
                </View>
            </View>
        </View>
        <View style={styles.bottomControls}>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  topNav: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 16
  },
  flashCardContainer: {
    backgroundColor: 'blue',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  flashCard: {
    backgroundColor: 'green',
    width: '100%',
    height: '100%',
    borderRadius: 13,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'  
  },
  definition: {
    fontSize: 24
  },
  romanization: {

  },
  bottomControls: {

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
