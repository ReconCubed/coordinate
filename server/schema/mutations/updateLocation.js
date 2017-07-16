const { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLList } = require('graphql');
const { LocationArgType } = require('../types/location_type');
const { updateLocation } = require('../../services/group');

module.exports = {
  type: new GraphQLObjectType({
    name: 'groupsUpdated',
    fields: {
      groupsUpdated: { type: new GraphQLList(GraphQLID) }
    }
  }),
  args: {
    newLocation: { type: new GraphQLNonNull(LocationArgType) },
  },
  resolve: (parentValue, { newLocation }, req) => {
    return new Promise((resolve, reject) => {
      updateLocation({ token: req.headers.authorization, newLocation })
     .then(groups => resolve({ groupsUpdated: groups }))
     .catch(e => reject(e));
    });
  }
};
