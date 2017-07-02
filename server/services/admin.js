const admin = require('firebase-admin');
const config = require('../../app_config.js');

const { firebaseConfig } = config;
const serviceAccount = require(firebaseConfig.secretRef);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

module.exports = admin;
