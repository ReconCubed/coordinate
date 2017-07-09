import gql from 'graphql-tag';

const LogIn = gql`
  mutation LogIn {
    logIn {
      username
      id
      photo
    }
  }
`;

export { LogIn };
