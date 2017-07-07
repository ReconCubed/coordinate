const {
  GraphQLObjectType,
} = require('graphql');

const mutations = require('./');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: mutations
});
