const UserType = require('../types/user_type');
const { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLObjectType } = require('graphql');
const { signup, setAsLoggedIn, setAsLoggedOut } = require('../../services/user-auth');

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
    console.log(req.headers.authorization);
    return setAsLoggedIn({ token: req.headers.authorization });
  }
};

const logOut = {
  type: new GraphQLObjectType({
    name: 'userID',
    fields: {
      id: { type: GraphQLID }
    }
  }),
  resolve: (parentValue, args, req) => {
    return setAsLoggedOut({ token: req.headers.authorization });
  }
};

module.exports = { logIn, signUp, logOut };
