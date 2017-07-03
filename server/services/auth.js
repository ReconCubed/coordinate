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


const getUser = ({ token, targetID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then(() => {
      admin.auth().getUser(targetID)
      .then((user) => {
        console.log(user);
        resolve({ username: user.displayName, photo: user.photoURL });
      })
      .catch(error => reject(error));
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
          console.log(val);
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

module.exports = { login, signup, getUser, getPrivateUserData, verifyToken };
