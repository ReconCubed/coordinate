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

const signup = ({ email, photo, username, password }) => {
  return new Promise((resolve, reject) => {
    admin.auth().createUser({
      email,
      emailVerified: false,
      password,
      photoURL: photo,
      displayName: username
    })
    .then(({ uid }) => {
      db.ref(`users/${uid}/public/info/`)
      .set({
        email,
        photo,
        username
      })
      .then(() => resolve({ id: uid, photo, username }))
      .catch(e => reject(e));
    })
    .catch((e) => {
      console.error(e);
      reject();
    });
  });
};

module.exports = { signup, verifyToken };
