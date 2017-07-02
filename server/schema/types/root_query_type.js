const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require('./user_type');
const { getUser } = require('../../services/auth');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        token: { type: GraphQLString },
        targetUserId: { type: GraphQLString }
      },
      resolve: (parentValue, { token, targetUserId }) => {
        return new Promise((res, rej) => {
          getUser(token, targetUserId)
          .then(user => res(user))
          .catch((e) => {
            console.error(e);
            rej(e);
          });
        });
      }
    }
  }),
});

module.exports = RootQueryType;
