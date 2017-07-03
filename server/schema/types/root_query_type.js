const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList } = graphql;
const UserType = require('./user_type');
const GroupType = require('./group_type');
const { getUser } = require('../../services/auth');
const { fetchGroups } = require('../../services/group');

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
    },
    groups: {
      type: new GraphQLList(GroupType),
      args: {
        token: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, { token }) => {
        return new Promise((resolve, reject) => {
          fetchGroups({ token })
          .then((groups) => {
            const keys = Array.from(Object.keys(groups));
            const returnArray = [];
            keys.forEach((key) => {
              returnArray.push({
                id: key,
                name: groups[key].name
              });
            });
            resolve(returnArray);
          })
          .catch(e => reject(e));
        });
      }
    }
  })
});

module.exports = RootQueryType;
