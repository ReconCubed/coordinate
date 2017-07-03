const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInputType,
} = graphql;

const LocationType = new GraphQLInputObjectType({
  name: 'LocationType',
  fields: () => ({
    lat: { type: GraphQLString },
    lng: { type: GraphQLString },
  })
});

module.exports = LocationType;
