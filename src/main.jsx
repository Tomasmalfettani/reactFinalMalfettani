import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAQslpNWu7HamwkMGBbUE02p-cV-6ijcdg",
  authDomain: "reactfinalmalfettani.firebaseapp.com",
  projectId: "reactfinalmalfettani",
  storageBucket: "reactfinalmalfettani.appspot.com",
  messagingSenderId: "918721089348",
  appId: "1:918721089348:web:8bcb56f7fcbbfbf2fa1111"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
