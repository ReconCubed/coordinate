const { GraphQLObjectType } = require('graphql');
const UserType = require('./user_type');
const { LocationType } = require('./location_type');

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    user: { type: UserType },
    location: { type: LocationType }
  })
});

module.exports = MemberType;
