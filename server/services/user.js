const admin = require('./admin');
const { verifyToken } = require('./auth');

const db = admin.database();

const genUserType = (user) => {
  return {
    username: user.displayName,
    photo: user.photoURL,
    id: user.uid
  };
};


const getUser = ({ token, targetID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then(() => {
      admin.auth().getUser(targetID)
      .then((user) => {
        resolve(genUserType(user));
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
      .once('value', (snapshot) => {
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

module.exports = { getUser, getPrivateUserData };
