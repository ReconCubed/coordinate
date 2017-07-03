const admin = require('./admin');
const { verifyToken } = require('./auth');

const db = admin.database();

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
          resolve(key);
        })
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

const updateLocation = ({ token, newLocation }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      fetchGroups({ token })
      .then((groups) => {
        const updateObject = {};
        const serverTime = admin.database.ServerValue.TIMESTAMP;
        newLocation.updatedAt = serverTime;
        groups.forEach((group) => {
          updateObject[`${group}/members/accepted/${uid}/location/`] = newLocation;
        });
        db.ref('groups/').update(updateObject)
        .then(() => resolve(groups))
        .catch(e => reject(e));
      });
    })
    .catch(e => reject(e));
  });
};

const fetchGroups = ({ token }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`users/${uid}/private/groups`)
      .on('value', (snapshot) => {
        const groupObject = snapshot.val();
        if (!groupObject) {
          reject('No groups found');
        }
        resolve(Array.from(Object.keys(groupObject)));
      });
    });
  });
};

module.exports = { createGroup, updateLocation };
