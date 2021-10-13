import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref } from 'firebase/database';
import { useState, useEffect } from 'react';

const firebaseConfig = {
    apiKey: "AIzaSyAoE2nkTPuTCFsicLx6-i2RqrMb2Ylxkvs",
    authDomain: "printf-yzhang-react.firebaseapp.com",
    databaseURL: "https://printf-yzhang-react-default-rtdb.firebaseio.com",
    projectId: "printf-yzhang-react",
    storageBucket: "printf-yzhang-react.appspot.com",
    messagingSenderId: "101537966749",
    appId: "1:101537966749:web:d55fbe27382f3a8b3d0274",
    measurementId: "G-6YH2S39RL5"
  };
  
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };