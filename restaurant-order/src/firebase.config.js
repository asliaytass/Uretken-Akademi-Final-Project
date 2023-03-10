import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyD-GmlNQgTKwoL11g7OGAxxE59iFFyeWQk",
    authDomain: "restaurantapp-4662b.firebaseapp.com",
    databaseURL: "https://restaurantapp-4662b-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-4662b",
    storageBucket: "restaurantapp-4662b.appspot.com",
    messagingSenderId: "689088712016",
    appId: "1:689088712016:web:8266792cc143f3a04bb055"
  };

  const  app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export { app, firestore, storage}