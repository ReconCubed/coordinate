// TEMP SIMULATION OF CLIENT SIDE BEFORE IT IS PROPERLY BUILT
const firebase = require('firebase');
const axios = require('axios');
const config = require('../app_config.js');
const mutations = require('./mutations');

const { firebaseUsers: users } = config;

const getToken = () => firebase.auth().currentUser.getIdToken(true);

const dummyLocation = {
  lat: '23.3',
  lng: '91.2'
};

firebase.initializeApp(config.firebaseConfig);

firebase.auth().signInWithEmailAndPassword(users.u2.email, users.u2.password)
.then(() => {
  getToken()
  .then((token) => {
    console.log(token);
    axios.post('http://localhost:8080/graphql', {
      query: mutations.SetGroupInactive,
      variables: {
        token,
        groupID: '-KoPjdEHy0xcyDQdTeAL',
      }
    })
    .then(res => console.log(res))
    .catch(e => console.log(e));
  })
  .catch(error => console.error(error));
})
.catch(error => console.error(error));
