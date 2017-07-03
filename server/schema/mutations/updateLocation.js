const { GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLList } = require('graphql');
const { LocationArgType } = require('../types/location_type');
const { updateLocation } = require('../../services/group');

module.exports = {
  type: new GraphQLObjectType({
    name: 'groupsUpdated',
    fields: {
      groupsUpdated: { type: new GraphQLList(GraphQLString) }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    newLocation: { type: new GraphQLNonNull(LocationArgType) },
  },
  resolve: (parentValue, { token, newLocation }) => {
    return new Promise((resolve, reject) => {
      updateLocation({ token, newLocation })
     .then(groups => resolve({ groupsUpdated: groups }))
     .catch(e => reject(e));
    });
  }
};
