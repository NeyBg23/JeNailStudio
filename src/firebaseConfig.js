import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB96XGum-RBfsyc80-B2iqYIggXCZqCGKs",
  authDomain: "jennailstudio-23.firebaseapp.com",
  projectId: "jennailstudio-23",
  storageBucket: "jennailstudio-23.firebasestorage.app",
  messagingSenderId: "304288478018",
  appId: "1:304288478018:web:d29f7711559a9e4f794edb",
  measurementId: "G-2V6377DFC8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar Firestore
export const db = getFirestore(app);
export const auth = getAuth(app);
