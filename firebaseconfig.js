import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from "firebase/auth/react-native"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "your-key",
  authDomain: "project.firebaseapp.com",
  projectId: "project",
  storageBucket: "project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});