const UserType = require('../types/user_type');
const { GraphQLString, GraphQLNonNull } = require('graphql');
const { signup, setAsLoggedIn } = require('../../services/user-auth');

const signUp = {
  type: UserType,
  args: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    photo: { type: GraphQLString },
    username: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: (parentValue, { email, password, photo, username }) => {
    return signup({ email, photo, username, password });
  }
};

const logIn = {
  type: UserType,
  resolve: (parentValue, args, req) => {
    return setAsLoggedIn({ token: req.headers.authorization });
  }
};

module.exports = { logIn, signUp };
