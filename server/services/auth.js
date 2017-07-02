const admin = require('firebase-admin');
const config = require('../../app_config.js');

const { firebaseConfig } = config;
const serviceAccount = require(firebaseConfig.secretRef);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});

const db = admin.database();

const readTest = (uid) => {
  const ref = db.ref(`${uid}/test`);
  ref.on('value', (snapshot) => {
    console.log(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ', errorObject.code);
  });
};

const verifyToken = (idToken) => {
  return new Promise((resolve, reject) => {
    admin.auth().verifyIdToken(idToken)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log(uid);
      resolve(uid);
    })
    .catch((error) => {
      console.error(error);
      reject();
    });
  });
};


const login = () => {

};

const signup = () => {

};

module.exports = { verifyToken, login, signup, readTest };
