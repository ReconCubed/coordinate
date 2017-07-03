const admin = require('./admin');

const db = admin.database();

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


const login = () => {

};

const signup = ({ email, photo, username, password }) => {
  return new Promise((resolve, reject) => {
    admin.auth().createUser({
      email,
      emailVerified: false,
      password,
      photoURL: photo,
      displayName: username
    })
    .then((record) => {
      const uid = record.uid;
      const newUserRecord = {
        email,
        username,
        photo
      };
      db.ref(`users/${uid}/`)
      .set({
        public: newUserRecord,
      })
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

module.exports = { login, signup, verifyToken };
