const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const GroupType = new GraphQLObjectType({
  name: 'GroupType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  })
});

module.exports = GroupType;
