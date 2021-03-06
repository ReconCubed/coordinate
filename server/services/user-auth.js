const { admin, verifyToken } = require('./admin');

const db = admin.database();

const setAsLoggedIn = ({ token }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`users/${uid}/`)
      .update({ loggedIn: true })
      .then(() => {
        getUser({ token, targetID: uid })
        .then((user) => {
          resolve(user);
        })
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

const setAsLoggedOut = ({ token }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`users/${uid}/`)
      .update({ loggedIn: false })
      .then(() => {
        resolve({ id: uid });
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

const getUser = ({ token, targetID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`users/${targetID || uid}/public/info/`)
      .on('value', (snapshot) => {
        const username = snapshot.child('username').val();
        const photo = snapshot.child('photo').val();
        resolve({ id: targetID || uid, username, photo });
      });
    })
    .catch(error => reject(error));
  });
};

const getPrivateUserData = (token, targetUserId) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      const target = targetUserId === 'self' ? uid : targetUserId;
      db.ref(`users/${target}/public`)
      .on('value', (snapshot) => {
        const val = snapshot.val();
        if (val) {
          val.id = target;
          if (val.friends) {
            val.friends = Object.keys(val.friends);
          }
          resolve(val);
        } else {
          reject('You are not authorized to read this record');
        }
      }, (errorObject) => {
        console.error('The read failed: ', errorObject.code);
      });
    })
    .catch((e) => {
      console.error(e);
      reject(e);
    });
  });
};

module.exports = { signup, verifyToken, setAsLoggedIn, getUser, getPrivateUserData, setAsLoggedOut };
