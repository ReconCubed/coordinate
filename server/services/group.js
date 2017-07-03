const admin = require('./admin');
const { verifyToken } = require('./auth');
const { getUser } = require('./user');

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
        groupToAdd[key] = { name };
        db.ref(`users/${uid}/private/groups/active/`).update(groupToAdd)
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
        Array.from(Object.keys(groups)).forEach((group) => {
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

const genGroupDetails = ({ token, details, id }) => {
  const { name, createdBy, members, targetLocation } = details;
  const returnObj = { id, name, targetLocation };
  returnObj.createdBy = getUser({ token, targetID: createdBy });

  const membersArray = [];
  Array.from(Object.keys(members.accepted)).forEach((member) => {
    const user = getUser({ token, targetID: member });
    const location = members.accepted[member].location;
    membersArray.push({ user, location });
  });
  returnObj.members = membersArray;
  return returnObj;
};

const inviteToGroup = ({ token, groupID, userIDArray }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      const invitePayload = {
        invitedAt: admin.database.ServerValue.TIMESTAMP,
        invitedBy: uid
      };
      const updateObject = {};
      userIDArray.forEach((id) => {
        updateObject[`groups/${groupID}/members/pending/${id}/`] = invitePayload;
        updateObject[`users/${id}/private/groups/pending/${groupID}/`] = invitePayload;
      });
      db.ref().update(updateObject)
      .then(() => resolve(groupID))
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

const fetchGroupDetails = ({ token, groupID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then(() => {
      db.ref(`groups/${groupID}/`)
      .once('value', (snapshot) => {
        const details = snapshot.val();
        const groupDetails = genGroupDetails({ token, details, id: groupID });
        resolve(groupDetails);
      });
    })
    .catch(e => reject(e));
  });
};


const fetchGroups = ({ token, inactive }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`users/${uid}/private/groups/${inactive ? 'inactive/' : 'active/'}`)
      .once('value', (snapshot) => {
        const groupObject = snapshot.val();
        if (!groupObject) {
          reject('No groups found');
        }
        resolve(groupObject);
      });
    });
  });
};

module.exports = {
  createGroup,
  updateLocation,
  fetchGroups,
  fetchGroupDetails,
  inviteToGroup
};
