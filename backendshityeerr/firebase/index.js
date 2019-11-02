var admin = require("firebase-admin");
var serviceAccount = require("../backend-52f38-firebase-adminsdk-tgh4d-cacd358897.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://backend-52f38.firebaseio.com"
});

module.exports = admin;
