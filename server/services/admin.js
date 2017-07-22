const admin = require('firebase-admin');
const config = require('../../app_config.js');
const service = require('../../coordinate-26851-firebase-adminsdk-342k8-0ef096b97c.json');


const { firebaseConfig } = config;
const serviceAccount = service;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      resolve(uid);
    })
    .catch((error) => {
      console.error(error);
      reject();
    });
  });
};

module.exports = { admin, verifyToken };
