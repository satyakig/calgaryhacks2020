import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

let firebase;

export function initializeApp() {
  firebase = app.initializeApp({
    apiKey: 'AIzaSyCTJmJ3NahGEZmycTOFoUldDolb2xznGAw',
    authDomain: 'calgaryhacks2020.firebaseapp.com',
    databaseURL: 'https://calgaryhacks2020.firebaseio.com',
    projectId: 'calgaryhacks2020',
    storageBucket: 'calgaryhacks2020.appspot.com',
    messagingSenderId: '812265596927',
    appId: '1:812265596927:web:6ccb0ef695b60b0e48a9ca',
    measurementId: 'G-1M9ELQWNSX',
  });
}

export function getDb() {
  return firebase.firestore();
}

export function getAuth() {
  return firebase.auth();
}
