const {
  GraphQLObjectType,
} = require('graphql');

const { signup, createGroup } = require('./');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup,
    createGroup
  }
});
