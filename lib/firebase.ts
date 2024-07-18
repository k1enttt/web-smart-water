// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { child, getDatabase, ref } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyCqobRCffrHsdPFopt2GqYJTE1cRwUq2mI",
  authDomain: "smartwater-fe007.firebaseapp.com",
  databaseURL: "https://smartwater-fe007-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartwater-fe007",
  storageBucket: "smartwater-fe007.appspot.com",
  messagingSenderId: "67769590855",
  appId: "1:67769590855:web:636451210f5520cd64bd62"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getDatabase(firebaseApp);

const dbRef = ref(db);

export const plantsRef = child(dbRef, "plants");
export const activityLogsRef = child(dbRef, "activity_logs");
