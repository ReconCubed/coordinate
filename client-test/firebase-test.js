// TEMP SIMULATION OF CLIENT SIDE BEFORE IT IS PROPERLY BUILT
const firebase = require('firebase');
const axios = require('axios');
const config = require('../app_config.js');

const { firebaseUsers: users } = config;
console.log('running..');

const query = `
  mutation createNewGroup($token: String!, $name:String!, $targetLocation:LocationType) {
    createGroup(token: $token, name: $name, targetLocation:$targetLocation) {
      id
    }
  }
`;

const dummyLocation = {
  lat: '40.2',
  lng: '-72.3'
};

const getToken = () => firebase.auth().currentUser.getIdToken(true);

firebase.initializeApp(config.firebaseConfig);
firebase.auth().signInWithEmailAndPassword(users.u2.email, users.u2.password)
.then(() => {
  getToken()
  .then((token) => {
    console.log(token);
    axios.post('http://192.168.1.3:8080/graphql', {
      query,
      variables: {
        token,
        targetLocation: dummyLocation,
        name: 'Test Group 1',
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
