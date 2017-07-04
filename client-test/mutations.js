const CreateNewUser = `
  mutation createNewUser($email: String!, $password:String!, $username: String!, $photo:String) {
    signup(email: $email, password: $password, username:$username, photo: $photo) {
      username
    }
  }
`;

const UpdateLocation = `
  mutation UpdateLocation($token:String!, $newLocation:LocationType!) {
    updateLocation(token:$token, newLocation:$newLocation) {
      groupsUpdated
    }
  }
`;

const SendFriendRequest = `
  mutation SendFriendRequest($token:String!, $friendID:ID!, $message:String) {
    sendFriendRequest(token:$token, friendID:$friendID, message:$message ) {
      requestID
    }
  }
`;

const CancelFriendRequest = `
  mutation CancelFriendRequest($token:String!, $senderID:ID!, $recipientID:ID!, $requestID:ID!) {
    cancelFriendRequest(token:$token, senderID:$senderID, recipientID:$recipientID, requestID:$requestID) {
      requestID
    }
  }
`;

const AcceptFriendRequest = `
  mutation AcceptFriendRequest($token:String!, $senderID:ID!, $recipientID:ID!, $requestID:ID!) {
    acceptFriendRequest(token:$token, senderID:$senderID, recipientID:$recipientID, requestID:$requestID) {
      requestID
    }
  }
`;

const DeleteFriend = `
  mutation DeleteFriend($token:String!, $friendID:ID!) {
    deleteFriend(token:$token, friendID:$friendID) {
      friendID
    }
  }
`;

const InviteUsersToGroup = `
  mutation InviteUsersToGroup($token:String!, $groupID:ID!, $userIDArray:[ID]!) {
    inviteUsersToGroup(token:$token, groupID:$groupID, userIDArray:$userIDArray) {
      groupID
    }
  }
`;

const CreateGroup = `
  mutation CreateGroup($token:String!, $name:String!, $targetLocation:LocationArgType) {
    createGroup(token:$token, name:$name, targetLocation:$targetLocation) {
      id
    }
  }
`;

const AcceptGroupInvite = `
  mutation AcceptGroupInvite($token:String!, $groupID:ID!) {
    acceptGroupInvite(token:$token, groupID:$groupID) {
      groupID
    }
  }
`;

const DeclineGroupInvite = `
  mutation DeclineGroupInvite($token:String!, $groupID:ID!) {
    declineGroupInvite(token:$token, groupID:$groupID) {
      groupID
    }
  }
`;


const RemoveUserFromGroup = `
  mutation RemoveUserFromGroup($token:String!, $groupID:ID!, $targetUserID:ID) {
    removeUserFromGroup(token:$token, groupID:$groupID, targetUserID:$targetUserID) {
      groupID
    }
  }
`;

const FetchFriends = `
  query FetchFriends($token:String! $userID:ID){
    friends(token:$token, userID:$userID) {
      id
    }
  }
`;

const FetchGroupDetails = `
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
  UpdateLocation,
  CreateNewUser,
  FetchGroupDetails,
  SendFriendRequest,
  CancelFriendRequest,
  AcceptFriendRequest,
  InviteUsersToGroup,
  CreateGroup,
  AcceptGroupInvite,
  DeclineGroupInvite,
  RemoveUserFromGroup,
  DeleteFriend,
  FetchFriends
};
