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
  const ref = db.ref(`users/${uid}/`);
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

const signup = ({ email, photo, username, password }) => {
  return new Promise((resolve, reject) => {
    admin.auth().createUser({
      email,
      emailVerified: false,
      password
    })
    .then((record) => {
      const uid = record.uid;
      const newUserRecord = {
        email,
        username,
        photo
      };
      db.ref(`users/${uid}/`)
      .set(newUserRecord)
      .then(() => {
        newUserRecord.id = uid;
        resolve(newUserRecord);
      })
      .catch((e) => {
        console.error(e);
        reject();
      });
    })
    .catch((e) => {
      console.error(e);
      reject();
    });
  });
};

module.exports = { verifyToken, login, signup, readTest };
