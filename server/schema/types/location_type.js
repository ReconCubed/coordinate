const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    id: { type: GraphQLID },
    lat: { type: GraphQLString },
    lng: { type: GraphQLString },
    time: { type: GraphQLString }
  })
});

module.exports = LocationType;
