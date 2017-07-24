import gql from 'graphql-tag';

const FetchGroupDetails = gql`
  query FetchGroupDetails($groupID:ID!) {
    groupDetails(groupID:$groupID) {
      id
      name
      acceptedMembers {
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
      pendingMembers {
        user {
          username
          photo
          id
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

const FetchUser = gql`
  query FetchUser($targetID: ID){
    user(targetID:$targetID) {
      id,
      username,
      photo
    }
  }
`;

const FetchNotifications = gql`
  query {
    notifications {
      read {
        id
        type
        groupID
        title
        received
      }
      unread {
        id
        type
        groupID
        title
        received
      }
    }
  }
`;

const UserGroupDetails = gql`
  query {
    userGroupDetails{
      id
      name
      targetLocation {
        description
      }
      acceptedMembers {
        user {
          id
          photo
        }
      }
      leader{
        username
        photo
      }
    }
  }
`;

export {
  FetchGroupDetails,
  FetchFriends,
  FetchNotifications,
  UserGroupDetails,
  FetchUser
};
