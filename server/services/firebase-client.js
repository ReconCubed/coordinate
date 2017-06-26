// TEMP SIMULATION OF CLIENT SIDE BEFORE IT IS PROPERLY BUILT
const firebase = require('firebase');
const config = require('../../firebase.config.js');

const getToken = () => firebase.auth().currentUser.getIdToken(true);

firebase.initializeApp(config);
firebase.auth().signInWithEmailAndPassword('test@test.com', 'password')
.then(() => {
  getToken()
  .then((token) => {
    console.log(token);
    // pass for verification
  })
  .catch(error => console.error(error));
})
.catch(error => console.error(error));

// module.exports = firebase;
