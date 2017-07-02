const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID,
} = graphql;

const UserTestType = new GraphQLObjectType({
  name: 'UserTestType',
  fields: () => ({
    id: { type: GraphQLID },
  })
});

module.exports = UserTestType;
