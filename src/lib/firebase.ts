// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoVVRf6UMK-e6uGUkmNvnnp7HZz0iSClQ",
  authDomain: "vitriny-web.firebaseapp.com",
  projectId: "vitriny-web",
  storageBucket: "vitriny-web.firebasestorage.app",
  messagingSenderId: "343502550145",
  appId: "1:343502550145:web:a3ccccbc8fd5a5bee14980"
};

const app = initializeApp(firebaseConfig);

// adiciona estas duas linhas:
export const auth = getAuth(app);
export const storage = getStorage(app);
