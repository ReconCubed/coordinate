const graphql = require('graphql');

const {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLObjectType
} = graphql;

const LocationArgType = new GraphQLInputObjectType({
  name: 'LocationArgType',
  fields: () => ({
    lat: { type: GraphQLString },
    lng: { type: GraphQLString },
  })
});

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    lat: { type: GraphQLString },
    lng: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

module.exports = { LocationType, LocationArgType };
