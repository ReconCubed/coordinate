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

const CreateGroup = gql`
  mutation CreateGroup($name:String!, $targetLocation:LocationArgType) {
    createGroup(name:$name, targetLocation:$targetLocation) {
      id
    }
  }
`;

const InviteUsersToGroup = gql`
  mutation InviteUsersToGroup($groupID:ID!, $userIDArray:[ID]!) {
    inviteUsersToGroup(groupID:$groupID, userIDArray:$userIDArray) {
      groupID
    }
  }
`;

const UpdateLocation = gql`
  mutation UpdateLocation($newLocation:LocationArgType!) {
    updateLocation(newLocation:$newLocation) {
      groupsUpdated
    }
  }
`;

export { LogIn, CreateGroup, InviteUsersToGroup, UpdateLocation };
