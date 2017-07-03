const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLObjectType } = require('graphql');
const { createFriendRequest, removeFriendRequest, approveFriendRequest } = require('../../services/friends');

const sendFriendRequest = {
  type: new GraphQLObjectType({
    name: 'sendRequestConfirmation',
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

const cancelFriendRequest = {
  type: new GraphQLObjectType({
    name: 'cancelRequestConfirmation',
    fields: {
      requestID: { type: GraphQLID }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    senderID: { type: new GraphQLNonNull(GraphQLID) },
    recipientID: { type: new GraphQLNonNull(GraphQLID) },
    requestID: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (parentValue, args) => {
    return new Promise((resolve, reject) => {
      removeFriendRequest(args)
      .then(requestID => resolve({ requestID }))
      .catch(e => reject(e));
    });
  }
};

const acceptFriendRequest = {
  type: new GraphQLObjectType({
    name: 'acceptRequestConfirmation',
    fields: {
      requestID: { type: GraphQLID }
    }
  }),
  args: {
    token: { type: new GraphQLNonNull(GraphQLString) },
    senderID: { type: new GraphQLNonNull(GraphQLID) },
    recipientID: { type: new GraphQLNonNull(GraphQLID) },
    requestID: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (parentValue, args) => {
    return new Promise((resolve, reject) => {
      approveFriendRequest(args)
      .then(requestID => resolve({ requestID }))
      .catch(e => reject(e));
    });
  }
};

module.exports = { cancelFriendRequest, sendFriendRequest, acceptFriendRequest };
