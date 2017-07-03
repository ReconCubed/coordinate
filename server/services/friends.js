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

module.exports = { createFriendRequest };
