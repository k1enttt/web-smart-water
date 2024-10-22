import {
  FirebaseApp,
  FirebaseOptions,
  initializeApp
} from "firebase/app";
import { Database, getDatabase, ref } from "firebase/database";
import { env } from "process";

// Your web app's Firebase configuration
export const firebaseConfig: FirebaseOptions = {
  projectId: "smartwater-430c8",
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  databaseURL: env.FIREBASE_DATABASE_URL,
};

// Initialize Firebase
let app: FirebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(app);
let db: Database;

const dbUrl = "https://smartwater-430c8-default-rtdb.asia-southeast1.firebasedatabase.app"

export const getPlantsRef = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  if (!db) {
    db = getDatabase(app, dbUrl);
  }
  return ref(db, "plants");
};

export const getActivityLogsRef = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  if (!db) {
    db = getDatabase(app, dbUrl);
  }
  return ref(db, "activity_logs");
};
