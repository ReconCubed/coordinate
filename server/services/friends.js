const admin = require('./admin');
const { verifyToken } = require('./auth');

const db = admin.database();

const createFriendRequest = ({ token, friendID, message }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      const senderRef = db.ref(`users/${uid}/private/friends/pending/sent/`);
      const serverTime = admin.database.ServerValue.TIMESTAMP;
      const friendRequestObj = {
        requestedAt: serverTime,
        sender: uid,
        recipient: friendID,
        message
      };
      senderRef.push(friendRequestObj)
      .then(({ key }) => {
        const recipientRef = db.ref(`users/${friendID}/private/friends/pending/received/${key}/`);
        recipientRef.set(friendRequestObj)
        .then(() => resolve(key))
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};


const validateFriendRequest = ({ token, senderID, recipientID, requestID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      if (uid === senderID || uid === recipientID) {
        const senderRef = db.ref(`users/${senderID}/private/friends/pending/sent/`);
        const recipientRef = db.ref(`users/${recipientID}/private/friends/pending/received/`);
        senderRef.once('value', (senderSnapshot) => {
          if (senderSnapshot.hasChild(requestID)) {
            recipientRef.once('value', (recipientSnapshot) => {
              if (recipientSnapshot.hasChild(requestID)) {
                resolve();
              } else {
                reject('Request not found');
              }
            });
          } else {
            reject('Request not found');
          }
        });
      } else {
        reject('You are not authorized to perform this operation');
      }
    })
    .catch(e => reject(e));
  });
};

const removeFriendRequest = ({ token, senderID, recipientID, requestID }) => {
  return new Promise((resolve, reject) => {
    validateFriendRequest({ token, senderID, recipientID, requestID })
    .then(() => {
      const senderRef = db.ref(`users/${senderID}/private/friends/pending/sent/${requestID}/`);
      const recipientRef = db.ref(`users/${recipientID}/private/friends/pending/received/${requestID}/`);
      senderRef.remove()
      .then(() => {
        recipientRef.remove()
        .then(() => resolve(requestID))
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

module.exports = { createFriendRequest, removeFriendRequest };
