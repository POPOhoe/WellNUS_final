import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDs-KO6tliYucnKpBhuBK80alHhwEPwBkY",
  authDomain: "wellnus-8a6dc.firebaseapp.com",
  databaseURL:
    "https://wellnus-f9ef0-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "wellnus-8a6dc",
  storageBucket: "wellnus-8a6dc.appspot.com",
  messagingSenderId: "15146717621",
  appId: "1:15146717621:web:57c6e0cdad0615bf3bc9fc",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
