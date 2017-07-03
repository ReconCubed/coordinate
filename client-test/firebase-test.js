// TEMP SIMULATION OF CLIENT SIDE BEFORE IT IS PROPERLY BUILT
const firebase = require('firebase');
const axios = require('axios');
const config = require('../app_config.js');
const mutations = require('./mutations');

const { firebaseUsers: users } = config;

const getToken = () => firebase.auth().currentUser.getIdToken(true);

const dummyLocation = {
  lat: '104.3',
  lng: '-94.7'
};

firebase.initializeApp(config.firebaseConfig);
firebase.auth().signInWithEmailAndPassword(users.u1.email, users.u1.password)
.then(() => {
  getToken()
  .then((token) => {
    console.log(token);
    axios.post('http://localhost:8080/graphql', {
      query: mutations.DeleteFriend,
      variables: {
        token,
        friendID: 'aG1OTgMqI2SoFBkXxwU0JQLjgQN2'
      }
    })
    .then(res => console.log(res))
    .catch(e => console.log(e));
  })
  .catch(error => console.error(error));
})
.catch(error => console.error(error));
