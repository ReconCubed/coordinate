const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = require('graphql');
const LocationType = require('../types/location_type');
const { updateLocation } = require('../../services/group');

module.exports = {
  type: new GraphQLObjectType({
    name: 'updateResponse',
    fields: {
      updatedAt: { type: GraphQLString }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    newLocation: { type: new GraphQLNonNull(LocationType) },
  },
  resolve: (parentValue, { token, newLocation }) => {
    return new Promise((resolve, reject) => {
      updateLocation({ token, newLocation })
     .then(updatedAt => resolve({ updatedAt }))
     .catch(e => reject(e));
    });
  }
};
