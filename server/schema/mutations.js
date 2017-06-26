const {
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
const auth = require('../services/auth');
const UserType = require('./types/user_type');

const { login, signup } = auth;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, { email, password }, req) {
        // resolve
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        // resolve
      }
    }
  }
});

module.exports = mutation;
