const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const NotificationType = new GraphQLObjectType({
  name: 'NotificationType',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: GraphQLString },
    groupID: { type: GraphQLString },
    title: { type: GraphQLString },
    received: { type: GraphQLString }
  })
});

module.exports = NotificationType;
