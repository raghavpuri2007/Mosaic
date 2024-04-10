import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// import {...} from "firebase/database";
import { getFirestore} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwzl6f68SuJBax_9TcYi1eYjZxLojLJnQ",
  authDomain: "portfoli-u-189b8.firebaseapp.com",
  projectId: "portfoli-u-189b8",
  storageBucket: "portfoli-u-189b8.appspot.com",
  messagingSenderId: "1044343024992",
  appId: "1:1044343024992:web:4f563c43073b9e8c410205"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const db = getFirestore(FIREBASE_APP);
export const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

