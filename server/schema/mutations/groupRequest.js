const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLObjectType, GraphQLList } = require('graphql');
const { inviteToGroup, approveGroupInvite, removePendingUser, removeFromGroup, deactivateGroup } = require('../../services/group');

const inviteUsersToGroup = {
  type: new GraphQLObjectType({
    name: 'groupInviteConfirmation',
    fields: {
      groupID: { type: GraphQLID }
    }
  }),
  args: {
    groupID: { type: new GraphQLNonNull(GraphQLID) },
    userIDArray: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
  },
  resolve: (parentValue, { groupID, userIDArray }, req) => {
    return new Promise((resolve, reject) => {
      inviteToGroup({ groupID, userIDArray, token: req.headers.authorization })
      .then(id => resolve({ groupID: id }))
      .catch(e => reject(e));
    });
  }
};

const acceptGroupInvite = {
  type: new GraphQLObjectType({
    name: 'acceptGroupInviteConfirmation',
    fields: {
      groupID: { type: GraphQLID }
    }
  }),
  args: {
    groupID: { type: new GraphQLNonNull(GraphQLID) },
    notificationID: { type: GraphQLID },
  },
  resolve: (parentValue, { groupID, notificationID }, req) => {
    return new Promise((resolve, reject) => {
      approveGroupInvite({ groupID, notificationID, token: req.headers.authorization })
      .then(id => resolve({ groupID: id }))
      .catch(e => reject(e));
    });
  }
};

const declineGroupInvite = {
  type: new GraphQLObjectType({
    name: 'declineGroupInviteConfirmation',
    fields: {
      groupID: { type: GraphQLID }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    groupID: { type: new GraphQLNonNull(GraphQLID) },
    targetUserID: { type: GraphQLID }
  },
  resolve: (parentValue, { token, groupID, targetUserID }) => {
    return new Promise((resolve, reject) => {
      removePendingUser({ token, groupID, userID: targetUserID })
      .then(() => resolve({ groupID }))
      .catch(e => reject(e));
    });
  }
};

const removeUserFromGroup = {
  type: new GraphQLObjectType({
    name: 'removeUserFromGroupConfirmation',
    fields: {
      groupID: { type: GraphQLID }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    groupID: { type: new GraphQLNonNull(GraphQLID) },
    targetUserID: { type: GraphQLID }
  },
  resolve: (parentValue, { token, groupID, targetUserID }) => {
    return new Promise((resolve, reject) => {
      removeFromGroup({ token, groupID, userID: targetUserID })
      .then(() => resolve({ groupID }))
      .catch(e => reject(e));
    });
  }
};

const setGroupInactive = {
  type: new GraphQLObjectType({
    name: 'setGroupInactiveConfirmation',
    fields: {
      groupID: { type: GraphQLID }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    groupID: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (parentValue, args) => {
    return new Promise((resolve, reject) => {
      deactivateGroup(args)
      .then(groupID => resolve({ groupID }))
      .catch(e => reject(e));
    });
  }
};


module.exports = { inviteUsersToGroup, acceptGroupInvite, declineGroupInvite, removeUserFromGroup, setGroupInactive };
