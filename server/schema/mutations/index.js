const signup = require('./signup');
const createGroup = require('./createGroup');
const updateLocation = require('./updateLocation');
const { sendFriendRequest, cancelFriendRequest, acceptFriendRequest } = require('./friendRequest');
const { inviteUsersToGroup, acceptGroupInvite } = require('./groupRequest');

module.exports = {
  signup,
  createGroup,
  updateLocation,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  inviteUsersToGroup,
  acceptGroupInvite
};
