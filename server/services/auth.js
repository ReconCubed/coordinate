const admin = require('firebase-admin');
const serviceAccount = require('../../../../.secret/coordinate-26851-firebase-adminsdk-342k8-0ef096b97c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coordinate-26851.firebaseio.com'
});

const verifyToken = (idToken) => {
  admin.auth().verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    // do something
    console.log(uid);
  })
  .catch((error) => {
    console.error(error);
  });
};


const login = () => {

};

const signup = () => {

};

module.exports = { login, signup };
