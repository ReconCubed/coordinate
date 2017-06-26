const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    photo: { type: GraphQLString },
    location: { type: new GraphQLList(LocationType) },
    friends: { type: new GraphQLList(UserType) },
    groups: { type: new GraphQLList(GroupType) }
  })
});

module.exports = UserType;

const LocationType = require('./location_type');
const GroupType = require('./group_type');

