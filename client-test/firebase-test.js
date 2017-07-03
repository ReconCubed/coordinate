// TEMP SIMULATION OF CLIENT SIDE BEFORE IT IS PROPERLY BUILT
const firebase = require('firebase');
const axios = require('axios');
const config = require('../app_config.js');
const mutations = require('./mutations');

const { firebaseUsers: users } = config;

const getToken = () => firebase.auth().currentUser.getIdToken(true);

firebase.initializeApp(config.firebaseConfig);
firebase.auth().signInWithEmailAndPassword(users.u2.email, users.u2.password)
.then(() => {
  getToken()
  .then((token) => {
    console.log(token);
    axios.post('http://localhost:8080/graphql', {
      query: mutations.SendFriendRequest,
      variables: {
        token,
        message: 'Hi, user 1',
        friendID: 'LWlr4vt4xcT0USaubJl5WQm29vQ2',
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
