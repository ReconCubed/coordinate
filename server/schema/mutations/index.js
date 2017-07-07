const signup = require('./signup');
const createGroup = require('./createGroup');
const updateLocation = require('./updateLocation');
const { sendFriendRequest, cancelFriendRequest, acceptFriendRequest, deleteFriend } = require('./friendRequest');
const { inviteUsersToGroup, acceptGroupInvite, declineGroupInvite, removeUserFromGroup, setGroupInactive } = require('./groupRequest');

module.exports = {
  signup,
  createGroup,
  updateLocation,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  inviteUsersToGroup,
  acceptGroupInvite,
  declineGroupInvite,
  removeUserFromGroup,
  deleteFriend,
  setGroupInactive
};
