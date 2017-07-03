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

const removeFriend = ({ token, friendID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      const userRef = db.ref(`users/${uid}/public/friends/${friendID}/`);
      const friendRef = db.ref(`users/${friendID}/public/friends/${uid}`);
      userRef.remove()
      .then(() => {
        friendRef.remove()
        .then(() => resolve(friendID))
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

const approveFriendRequest = ({ token, senderID, recipientID, requestID }) => {
  return new Promise((resolve, reject) => {
    removeFriendRequest({ token, senderID, recipientID, requestID })
    .then(() => {
      const userRef = db.ref('users/');
      const acceptedAt = admin.database.ServerValue.TIMESTAMP;
      const acceptPayload = { acceptedAt };
      const acceptObject = {};
      acceptObject[`${senderID}/public/friends/${recipientID}/`] = acceptPayload;
      acceptObject[`${recipientID}/public/friends/${senderID}/`] = acceptPayload;
      userRef.update(acceptObject)
      .then(() => resolve(requestID))
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

module.exports = { createFriendRequest, removeFriendRequest, approveFriendRequest, removeFriend };
