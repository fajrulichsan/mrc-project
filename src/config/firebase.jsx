
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD5enIIPOVJV7Rj8J3GVyu761PrZMc26gw",
  authDomain: "mrc-database-41042.firebaseapp.com",
  projectId: "mrc-database-41042",
  storageBucket: "mrc-database-41042.appspot.com",
  messagingSenderId: "63805078199",
  appId: "1:63805078199:web:7644f466436b562dd6eb32",
  measurementId: "G-5GMRMLPWGS"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);