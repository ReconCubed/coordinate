const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLObjectType } = require('graphql');
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
  },
  resolve: (parentValue, { name, targetLocation }, req) => {
    return new Promise((resolve, reject) => {
      createGroup({ token: req.headers.authorization, name, targetLocation })
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
