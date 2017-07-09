import gql from 'graphql-tag';

const FetchGroupDetails = gql`
  query FetchGroupDetails($token:String!, $groupID:ID!) {
    groupDetails(token: $token, groupID:$groupID) {
      id
      name
      members {
        user {
          username
          photo
          id
        }
        location{
          lat
          lng
          updatedAt
        }
      }
      createdBy {
        id
        username
      }
      targetLocation {
        lat
        lng
        updatedAt
      }
    }
  }
`;

export {
  FetchGroupDetails
};
