const { admin, verifyToken } = require('./admin');

const db = admin.database();

const GROUP_REQUEST = 'group_request';

const addNotification = ({ userID, notification }) => {
  return new Promise((resolve, reject) => {
    db.ref(`users/${userID}/private/notifications/`)
    .push(notification)
    .then(({ key }) => resolve({ notificationID: key }))
    .catch(e => reject(e));
  });
};

const groupRequestNotification = ({ groupID, name, invitedByUser }) => {
  const time = admin.database.ServerValue.TIMESTAMP;
  return {
    title: `${invitedByUser.username} invited you to join ${name}`,
    groupID,
    received: time,
    type: GROUP_REQUEST
  };
};

const fetchNotifications = ({ token }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`users/${uid}/private/notifications/`)
      .on('value', (snapshot) => {
        const unread = snapshot.child('unread').val() || {};
        const read = snapshot.child('read').val() || {};
        const unreadArray = Array.from(Object.keys(unread)).map((id) => {
          unread[id].id = id;
          return unread[id];
        });
        const readArray = Array.from(Object.keys(read)).map((id) => {
          read[id].id = id;
          return read[id];
        });
        resolve({ read: readArray, unread: unreadArray });
      });
    })
    .catch(e => reject(e));
  });
};

module.exports = { addNotification, groupRequestNotification, fetchNotifications };
