import { initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from "firebase/auth/react-native"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCYmc3GmcK9BbNfMVKp60WU66sJ7kTHVnM",
  authDomain: "uqar-dectecteur.firebaseapp.com",
  projectId: "uqar-dectecteur",
  storageBucket: "uqar-dectecteur.appspot.com",
  messagingSenderId: "217586737321",
  appId: "1:217586737321:web:8584254d9f7daef58b09b8",
  measurementId: "G-0RMK1Y5YN3"
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});