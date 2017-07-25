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

const LogOut = gql`
  mutation LogOut {
    logOut {
      id
    }
  }
`;

const CreateGroup = gql`
  mutation CreateGroup($name:String!, $targetLocation:LocationArgType, $userIDArray:[ID]) {
    createGroup(name:$name, targetLocation:$targetLocation, userIDArray:$userIDArray) {
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

const AcceptGroupInvite = gql`
  mutation AcceptGroupInvite($groupID:ID!, $notificationID:ID) {
    acceptGroupInvite(groupID:$groupID, notificationID:$notificationID) {
      groupID
    }
  }
`;

const RemoveUserFromGroup = gql`
  mutation RemoveUserFromGroup($groupID:ID!, $targetUserID:ID) {
    removeUserFromGroup(groupID:$groupID, targetUserID:$targetUserID) {
      groupID
    }
  }
`;

const RejectGroupInvite = gql`
  mutation RejectGroupInvite($groupID:ID!, $notificationID:ID) {
    rejectGroupInvite(groupID:$groupID, notificationID:$notificationID) {
      groupID
    }
  }
`;

export { LogIn, CreateGroup, InviteUsersToGroup, UpdateLocation, AcceptGroupInvite, RejectGroupInvite, RemoveUserFromGroup, LogOut };
