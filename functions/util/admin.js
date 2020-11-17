var admin = require("firebase-admin");
const firebase = require('firebase');
var firebaseConfig = require('./config');


var serviceAccount = require("../Private/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "poshangyan.appspot.com",
    databaseURL: "https://poshangyan.firebaseio.com"
});
firebase.initializeApp(firebaseConfig);

const db = admin.database();
const storageRef = admin.storage()

module.exports = { admin , db  };

