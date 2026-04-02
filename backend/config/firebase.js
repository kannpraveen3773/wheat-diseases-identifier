const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyBHIWUDjWsskbEeE3STkEdBRiP7sgyTYM0",
  authDomain: "wheat-diseases-identifier.firebaseapp.com",
  projectId: "wheat-diseases-identifier",
  storageBucket: "wheat-diseases-identifier.firebasestorage.app",
  messagingSenderId: "554172427975",
  appId: "1:554172427975:web:c5b25b5afe5245717018e2",
  measurementId: "G-PTJVSJHQ7R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

module.exports = { app, auth, db };
