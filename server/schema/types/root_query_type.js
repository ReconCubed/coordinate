const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require('./user_type');
const UserTestType = require('./user_test_type');
const { verifyToken, readTest, getUser } = require('../../services/auth');

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
    },
    userId: {
      type: UserTestType,
      args: { token: { type: GraphQLString } },
      resolve: (parentValue, { token }) => {
        return new Promise((res, rej) => {
          verifyToken(token)
          .then((uid) => {
            readTest(uid);
            res({ id: uid });
          })
          .catch((e) => {
            console.error(e);
            rej();
          });
        });
      }
    }
  }),
});

module.exports = RootQueryType;
