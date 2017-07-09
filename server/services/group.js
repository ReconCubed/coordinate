const admin = require('./admin');
const { verifyToken } = require('./auth');
const { getUser } = require('./user');

const db = admin.database();


const addToAcceptedMembers = ({ groupID, name, userID }) => {
  return new Promise((resolve, reject) => {
    const updateObject = {};
    updateObject[`groups/${groupID}/members/accepted/${userID}/acceptedAt`] = admin.database.ServerValue.TIMESTAMP;
    updateObject[`users/${userID}/private/groups/active/${groupID}/`] = { name };
    db.ref().update(updateObject)
    .then(() => resolve())
    .catch(e => reject(e));
  });
};

const deactivateGroup = ({ token, groupID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`groups/${groupID}/`)
      .once('value', (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.child('createdBy').val() !== uid) {
          reject('Only the creator of the group may perform this action');
        }
        const activeMembers = Array.from(Object.keys(snapshot.child('members').child('accepted').val()));
        const pendingMembers = Array.from(Object.keys(snapshot.child('members').child('pending').val()));
        const serverTime = admin.database.ServerValue.TIMESTAMP;
        const updateObject = {};
        if (activeMembers) {
          activeMembers.forEach((member) => {
            updateObject[`users/${member}/private/groups/active/${groupID}/`] = null;
            updateObject[`users/${member}/private/groups/inactive/${groupID}/`] = { name: snapshot.child('name').val(), lastActive: serverTime };
            updateObject[`groups/${groupID}/members/accepted/${member}/`] = null;
            updateObject[`groups/${groupID}/members/inactive/${member}/`] = { lastActive: serverTime };
          });
        }
        if (pendingMembers) {
          pendingMembers.forEach((member) => {
            updateObject[`groups/${groupID}/members/pending/`] = null;
            updateObject[`users/${member}/private/groups/pending/${groupID}/`] = null;
          });
        }
        updateObject[`groups/${groupID}/active`] = false;
        updateObject[`groups/${groupID}/targetLocation`] = null;
        updateObject[`groups/${groupID}/lastActive`] = serverTime;
        db.ref().update(updateObject)
        .then(() => resolve(groupID))
        .catch(e => reject(e));
      });
    })
    .catch(e => reject(e));
  });
};

const addNotification = ({ userID, type, body }) => {
  return new Promise((resolve, reject) => {
    db.ref(`users/${userID}/private/notifications/`)
    .push({ type, body })
    .then(({ key }) => resolve({ notificationID: key }))
    .catch(e => reject(e));
  });
};

const designateNewLeader = ({ token, groupID, newLeaderID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`groups/${groupID}/leader/`)
      .once('value', (snapshot) => {
        const leader = snapshot.val();
        if (leader !== uid) {
          reject('You must be the current leader to perform this operation');
        }
        db.ref(`groups/${groupID}/`).set({ leader: newLeaderID })
        .then(() => resolve(newLeaderID))
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

const createGroup = ({ token, name, targetLocation }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      const serverTime = admin.database.ServerValue.TIMESTAMP;
      targetLocation.updatedAt = serverTime;
      db.ref('groups/').push({
        name,
        targetLocation,
        createdBy: uid,
        createdAt: serverTime,
        leader: uid,
        active: true
      })
      .then(({ key }) => {
        addToAcceptedMembers({ groupID: key, name, userID: uid })
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
  const { name, createdBy, members, targetLocation, leader } = details;
  const returnObj = { id, name, targetLocation };
  returnObj.createdBy = getUser({ token, targetID: createdBy });
  returnObj.leader = getUser({ token, targetID: leader });
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

const removeFromGroup = ({ token, groupID, userID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`groups/${groupID}/`)
      .once('value', (snapshot) => {
        const val = snapshot.val();
        const { createdBy, name } = val;
        if (uid === createdBy && (uid === userID || userID === undefined)) {
          // delete group
        } else if (uid !== createdBy && uid !== userID && userID !== undefined) {
          reject('You are not authorized to remove this user from the group');
        } else {
          db.ref(`groups/${groupID}/members/accepted/${userID || uid}/`).remove()
          .then(() => {
            db.ref(`users/${userID || uid}/private/groups/active/${groupID}/`).remove()
            .then(() => {
              db.ref(`users/${userID || uid}/private/groups/inactive/${groupID}`).update({
                name,
                leftAt: admin.database.ServerValue.TIMESTAMP
              })
              .then(() => resolve(groupID))
              .catch(e => reject(e));
            })
            .catch(e => reject(e));
          })
          .catch(e => reject(e));
        }
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};


const removePendingUser = ({ token, groupID, userID }) => {
  return new Promise((resolve, reject) => {
    verifyToken(token)
    .then((uid) => {
      db.ref(`groups/${groupID}/members/pending/${userID || uid}/`).remove()
      .then(() => {
        db.ref(`users/${userID || uid}/private/groups/pending/${groupID}/`).remove()
        .then(() => resolve(userID || uid))
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};

const approveGroupInvite = ({ token, groupID }) => {
  return new Promise((resolve, reject) => {
    removePendingUser({ token, groupID })
    .then((uid) => {
      db.ref(`groups/${groupID}/`)
      .once('value', (snapshot) => {
        const name = snapshot.val().name;
        addToAcceptedMembers({ groupID, name, userID: uid })
        .then(() => resolve(groupID))
        .catch(e => reject(e));
      })
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
      .on('value', (snapshot) => {
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
      .on('value', (snapshot) => {
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
  inviteToGroup,
  approveGroupInvite,
  removePendingUser,
  removeFromGroup,
  deactivateGroup
};