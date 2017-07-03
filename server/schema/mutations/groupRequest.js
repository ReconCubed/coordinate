const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLObjectType, GraphQLList } = require('graphql');
const { inviteToGroup, approveGroupInvite } = require('../../services/group');

const inviteUsersToGroup = {
  type: new GraphQLObjectType({
    name: 'groupInviteConfirmation',
    fields: {
      groupID: { type: GraphQLID }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    groupID: { type: new GraphQLNonNull(GraphQLID) },
    userIDArray: { type: new GraphQLNonNull(new GraphQLList(GraphQLID)) },
  },
  resolve: (parentValue, args) => {
    return new Promise((resolve, reject) => {
      inviteToGroup(args)
      .then(groupID => resolve({ groupID }))
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
    token: { type: new GraphQLNonNull(GraphQLString) },
    groupID: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (parentValue, args) => {
    return new Promise((resolve, reject) => {
      approveGroupInvite(args)
      .then(groupID => resolve({ groupID }))
      .catch(e => reject(e));
    });
  }
};

module.exports = { inviteUsersToGroup, acceptGroupInvite };
