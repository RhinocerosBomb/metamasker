import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './components/App';

firebase.initializeApp({
  apiKey: "AIzaSyDW9ywzG7tvleAJJtT5TtpppZ-DtNFOqSs",
  authDomain: "backend-52f38.firebaseapp.com",
  databaseURL: "https://backend-52f38.firebaseio.com",
  projectId: "backend-52f38",
  storageBucket: "backend-52f38.appspot.com",
  messagingSenderId: "283735325694",
  appId: "1:283735325694:web:b959ea02f814b2d1c61eaf"
});

ReactDOM.render(<App firebase={firebase}/>, document.getElementById('root'));
