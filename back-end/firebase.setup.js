const admin = require('firebase-admin')

const serviceAccount = require("./elecetric-e-commerse-firebase-adminsdk-4k1sn-33ab47a20c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'elecetric-e-commerse.appspot.com'
});

const storage = admin.storage().bucket();

module.exports = storage;
