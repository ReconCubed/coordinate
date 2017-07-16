import gql from 'graphql-tag';

const FetchGroupDetails = gql`
  query FetchGroupDetails($groupID:ID!) {
    groupDetails(groupID:$groupID) {
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
          description
          address
          updatedAt
        }
      }
      createdBy {
        id
        username
      }
      leader {
        id
        username
      }
      targetLocation {
        lat
        lng
        description
        address
        updatedAt
      }
    }
  }
`;

const FetchFriends = gql`
  query FetchFriends($userID: ID){
    friends(userID:$userID) {
      id,
      username,
      photo
    }
  }
`;

export {
  FetchGroupDetails,
  FetchFriends
};
