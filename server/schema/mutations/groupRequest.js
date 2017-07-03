const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLObjectType, GraphQLList } = require('graphql');
const { inviteToGroup } = require('../../services/group');

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

module.exports = { inviteUsersToGroup };
