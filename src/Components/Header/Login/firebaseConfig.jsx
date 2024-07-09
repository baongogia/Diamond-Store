// src/firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBI8gUVNR62q2fsKzQQYdMeUJch7HW3I08",
  authDomain: "diamond-8583b.firebaseapp.com",
  projectId: "diamond-8583b",
  storageBucket: "diamond-8583b.appspot.com",
  messagingSenderId: "730204751845",
  appId: "1:730204751845:web:bc2a404f76fe2eb365510c",
  measurementId: "G-R6M4E2F2G5",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth
export const auth = getAuth(app);
