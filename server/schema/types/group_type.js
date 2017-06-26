const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = graphql;
const MemberType = require('./member_type');

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    id: { type: GraphQLID },
    members: { type: new GraphQLList(MemberType) },
    creator: { type: MemberType },
    createdTime: { type: GraphQLString },
  })
});

module.exports = GroupType;
