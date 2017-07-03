// TEMP SIMULATION OF CLIENT SIDE BEFORE IT IS PROPERLY BUILT
const firebase = require('firebase');
const axios = require('axios');
const config = require('../app_config.js');

const { firebaseUsers: users } = config;
console.log('running..');

const query = `
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

// const query = `
//   mutation UpdateLocation($token:String!, $newLocation:LocationArgType!) {
//     updateLocation(token:$token, newLocation:$newLocation) {
//       groupsUpdated
//     }
//   }
// `;

// const dummyLocation = {
//   lat: '44.2',
//   lng: '-62.3'
// };

const getToken = () => firebase.auth().currentUser.getIdToken(true);

firebase.initializeApp(config.firebaseConfig);
firebase.auth().signInWithEmailAndPassword(users.u2.email, users.u2.password)
.then(() => {
  getToken()
  .then((token) => {
    console.log(token);
    axios.post('http://localhost:8080/graphql', {
      query,
      variables: {
        token,
        groupID: '-Ko57mhRn9ynp4gIzeOK'
      }
    })
    .then(res => console.log(res))
    .catch(e => console.log(e));
    // pass for verification
  })
  .catch(error => console.error(error));
})
.catch(error => console.error(error));

// module.exports = firebase;
