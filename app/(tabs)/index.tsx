import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { useState, useEffect } from 'react'
import { db } from "../data/firebaseConfig"
import { getDocs, collection } from 'firebase/firestore';

export default function TabOneScreen() {
  const [userList, setUserList] = useState<{id: string; [key: string]: any; }[]>([]);
  const usersCollectionRef = collection(db, "users")

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const data = await getDocs(usersCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
        }));
        setUserList(filteredData);
        console.log(filteredData);
      }
      catch (err) {
        console.log(err);
      }
    }

    getUsersList();
  }, [])

  return (
    <View style={styles.container}>

      {userList.map((user) => 
        <Text style={styles.title}> 
          username: {user.username}
          {'\n'}
          dateJoined: {user.dateJoined} 
        </Text>
        
      )}
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
