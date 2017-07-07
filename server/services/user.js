const admin = require('./admin');
const { verifyToken } = require('./auth');

const db = admin.database();

const getUser = ({ token, targetID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then(() => {
      db.ref(`users/${targetID}/public/info/`)
      .on('value', (snapshot) => {
        const username = snapshot.child('username').val();
        const photo = snapshot.child('photo').val();
        resolve({ id: targetID, username, photo });
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

module.exports = { getUser, getPrivateUserData };
