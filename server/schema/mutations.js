import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import UserType from './types/user_type';

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
        // resolve
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

export default mutation;


