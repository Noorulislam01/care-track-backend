const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDA0HvCd0lEj2QuD_yYl9V4E8Fb1fWAhiI",
  authDomain: "mystore-eca03.firebaseapp.com",
  projectId: "mystore-eca03",
  storageBucket: "mystore-eca03.appspot.com",
  messagingSenderId: "499170427666",
  appId: "1:499170427666:web:2cca505d9be00a0e0329cb",
  measurementId: "G-SXFNSZ5VGF",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

module.exports = { auth, storage, db };
