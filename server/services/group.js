const admin = require('./admin');
const { verifyToken } = require('./auth');

const db = admin.database();

// needs to create a new group w/ key, add this key to user record
const createGroup = ({ token, name, targetLocation }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      const serverTime = admin.database.ServerValue.TIMESTAMP;
      const initMembers = { accepted: {} };
      initMembers.accepted[uid] = { acceptedAt: serverTime };
      targetLocation.updatedAt = serverTime;
      db.ref('groups/').push({
        name,
        targetLocation,
        createdBy: uid,
        createdAt: serverTime,
        members: initMembers
      })
      .then(({ key }) => {
        const groupToAdd = {};
        groupToAdd[key] = true;
        db.ref(`users/${uid}/private/groups/`).update(groupToAdd)
        .then(() => {
          console.log('update was successful');
          resolve(key);
        })
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

// const updateLocation = ({ token, newLocation }) => {
//   return new Promise
// };


module.exports = { createGroup };
