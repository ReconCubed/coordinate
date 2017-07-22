const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLObjectType, GraphQLList } = require('graphql');
const { LocationArgType } = require('../types/location_type');
const { createGroup } = require('../../services/group');

module.exports = {
  type: new GraphQLObjectType({
    name: 'groupId',
    fields: {
      id: { type: GraphQLID }
    }
  }),
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    targetLocation: { type: LocationArgType },
    userIDArray: { type: new GraphQLList(GraphQLID) }
  },
  resolve: (parentValue, { name, targetLocation, userIDArray }, req) => {
    return new Promise((resolve, reject) => {
      createGroup({ token: req.headers.authorization, name, targetLocation, members: userIDArray })
      .then((groupID) => {
        resolve({ id: groupID });
      })
      .catch((e) => {
        console.error('error is', e);
        reject(e);
      });
    });
  }
};
