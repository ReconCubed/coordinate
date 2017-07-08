const graphql = require('graphql');
const UserType = require('./user_type');
const MemberType = require('./member_type');
const { LocationType } = require('./location_type');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;

const GroupDetailType = new GraphQLObjectType({
  name: 'GroupDetailType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    members: { type: new GraphQLList(MemberType) },
    createdBy: { type: UserType },
    targetLocation: { type: LocationType },
    leader: { type: UserType }
  })
});

module.exports = GroupDetailType;
