const admin = require("firebase-admin");
const serviceAccount = require("../../../keys/ionic-firebase-messaging-firebase-adminsdk-8qkn2-2beb223f45.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ionic-firebase-messaging.firebaseio.com"
});
