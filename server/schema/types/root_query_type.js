const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;
const UserType = require('./user_type');
const { getPrivateUserData, getUser } = require('../../services/auth');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      args: {
        targetID: { type: new GraphQLNonNull(GraphQLString) },
        token: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parentValue, { targetID, token }) => {
        return new Promise((resolve, reject) => {
          getUser({ token, targetID })
          .then(user => resolve(user))
          .catch(error => reject(error));
        });
      }
    }
  }),
});

module.exports = RootQueryType;
