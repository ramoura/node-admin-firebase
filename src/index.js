var admin = require("firebase-admin");

var serviceAccount = require("../keys/ionic-firebase-messaging-firebase-adminsdk-8qkn2-2beb223f45.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ionic-firebase-messaging.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("push/listDevices");
ref.once("value", function (snapshot) {
    const tokens = [];
    snapshot.forEach(token => {
        tokens.push(token.key);
    })

    if(tokens.length === 0) return

    var message = {
        data: {
            score: '850',
            time: '2:45',
        },
        notification: {
            title: 'Meu prime',
            body: 'E nesse é meu primeiro push',
        },
        tokens: tokens
    };

// Send a message to the device corresponding to the provided
// registration token.
    admin.messaging().sendMulticast(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            console.log('Qtde error:', response.failureCount);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });


});


