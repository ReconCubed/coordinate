const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLBoolean
} = graphql;
const UserType = require('./user_type');

const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: UserType },
    inivtedBy: { type: UserType },
    invitedAt: { type: GraphQLString },
    accepted: { type: GraphQLBoolean },
    expires: { type: GraphQLString }
  })
});

module.exports = MemberType;
