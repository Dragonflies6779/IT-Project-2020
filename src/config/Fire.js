import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBLlvZgg2_Y9RC9mKZv2_c1mXMZvgQK5Cw",
    authDomain: "my-portfolio-system.firebaseapp.com",
    databaseURL: "https://my-portfolio-system.firebaseio.com",
    projectId: "my-portfolio-system",
    storageBucket: "my-portfolio-system.appspot.com",
    messagingSenderId: "586112178261",
    appId: "1:586112178261:web:afb7cf74be000c74475cdc",
    measurementId: "G-QWS5FB22EG"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;