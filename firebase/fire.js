import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD6PTHb3MO0jAOJ-4vbEyvMOVHKbQG81ME",
    authDomain: "wellnus-f9ef0.firebaseapp.com",
    databaseURL: 'https://wellnus-f9ef0-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: "wellnus-f9ef0",
    storageBucket: "wellnus-f9ef0.appspot.com",
    messagingSenderId: "190429536004",
    appId: "1:190429536004:web:30a21f6bd898cc62663a51",
    measurementId: "G-FLWKVX44VX"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}



export default firebase;
