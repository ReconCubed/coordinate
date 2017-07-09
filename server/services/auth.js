const admin = require('./admin');
const userFuncs = require('./user');


console.log(admin)
console.log(userFuncs);

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

const setAsLoggedIn = ({ token }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`users/${uid}/`)
      .update({ loggedIn: true })
      .then(() => {
        userFuncs.getUser({ token, targetID: uid })
        .then(user => resolve(user))
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
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

module.exports = { signup, verifyToken, setAsLoggedIn };
