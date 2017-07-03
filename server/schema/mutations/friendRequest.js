const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLObjectType } = require('graphql');
const { createFriendRequest } = require('../../services/friends');

const sendFriendRequest = {
  type: new GraphQLObjectType({
    name: 'requestConfirmation',
    fields: {
      requestID: { type: GraphQLID }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    friendID: { type: new GraphQLNonNull(GraphQLID) },
    message: { type: GraphQLString },
  },
  resolve: (parentValue, { token, friendID, message }) => {
    return new Promise((resolve, reject) => {
      createFriendRequest({ token, friendID, message })
      .then((requestID) => {
        const requestConfirmation = { requestID };
        resolve(requestConfirmation);
      })
      .catch(e => reject(e));
    });
  }
};

module.exports = { sendFriendRequest };
