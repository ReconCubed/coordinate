const {
  GraphQLObjectType,
} = require('graphql');

const { signup } = require('./');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup
  }
});
