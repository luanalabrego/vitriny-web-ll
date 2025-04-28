// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzx3Dfm0bTTJuf3hSaJjb0F2KK4kmEjIg",
  authDomain: "vitrinyweb11.firebaseapp.com",
  projectId: "vitrinyweb11",
  storageBucket: "vitrinyweb11.appspot.com", // <- aqui corrigido
  messagingSenderId: "1069607586521",
  appId: "1:1069607586521:web:5a77642bbb31faf15d8cc8"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
