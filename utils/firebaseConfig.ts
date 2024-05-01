import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence, Auth, User, updateProfile } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage();

export async function upload(user: User, file: ImagePicker.ImagePickerAsset) {
  const blob : Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", file.uri, true);
    xhr.send(null);
  });

  const fileRef = ref(storage, user.uid + "_" + file.fileName);
  const snapshot = await uploadBytes(fileRef, blob);
  const photoURL = await getDownloadURL(fileRef);
  updateProfile(user, {photoURL: photoURL})
}

// Initialize Firebase Auth with AsyncStorage persistence
export let auth : Auth;
if (Platform.OS === "ios" || Platform.OS === 'android') {
   auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}
else {
  auth = getAuth(app);
}