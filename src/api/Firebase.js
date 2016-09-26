import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAMxf4nQ_LaQtz9iybuv5RaNNUUwsF4uLw",
    authDomain: "tungtung-141004.firebaseapp.com",
    databaseURL: "https://tungtung-141004.firebaseio.com",
    storageBucket: "tungtung-141004.appspot.com",
    messagingSenderId: "124852232304"
};

firebase.initializeApp(config);

export default firebase;