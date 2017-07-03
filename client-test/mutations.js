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

const InviteUsersToGroup = `
  mutation InviteUsersToGroup($token:String!, $groupID:ID!, $userIDArray:[ID]!) {
    inviteUsersToGroup(token:$token, groupID:$groupID, userIDArray:$userIDArray) {
      groupID
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
};
