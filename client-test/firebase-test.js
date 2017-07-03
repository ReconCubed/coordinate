// TEMP SIMULATION OF CLIENT SIDE BEFORE IT IS PROPERLY BUILT
const firebase = require('firebase');
const axios = require('axios');
const config = require('../app_config.js');

const { firebaseUsers: users } = config;
console.log('running..');

  const query = `
  query FetchGroups($token:String!) {
    groups(token: $token) {
      id,
      name
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
        token
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
