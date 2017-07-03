const signup = require('./signup');
const createGroup = require('./createGroup');
const updateLocation = require('./updateLocation');
const { sendFriendRequest } = require('./friendRequest');

module.exports = {
  signup,
  createGroup,
  updateLocation,
  sendFriendRequest
};
