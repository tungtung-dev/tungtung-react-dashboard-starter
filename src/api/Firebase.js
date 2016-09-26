import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB8U6q2Hv-GG7LGMHS8tuGhsJEhfEcytkw",
    authDomain: "checkit-dev-3cb9b.firebaseapp.com",
    databaseURL: "https://checkit-dev-3cb9b.firebaseio.com",
    storageBucket: "checkit-dev-3cb9b.appspot.com",
    messagingSenderId: "360715996915"
};

firebase.initializeApp(config);

export default firebase;