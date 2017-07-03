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
      query: mutations.InviteUsersToGroup,
      variables: {
        token,
        groupID: '-Ko57mhRn9ynp4gIzeOK',
        userIDArray: ['LWlr4vt4xcT0USaubJl5WQm29vQ2', 'ZJQH61Ke0nUxAyMmvcIw4ANTRF73'],
      }
    })
    .then(res => console.log(res))
    .catch(e => console.log(e));
  })
  .catch(error => console.error(error));
})
.catch(error => console.error(error));
