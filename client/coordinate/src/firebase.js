import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAgXDDJletVdmwm_apWDFt39f9XdenkNKs',
  authDomain: 'coordinate-26851.firebaseapp.com',
  databaseURL: 'https://coordinate-26851.firebaseio.com',
  projectId: 'coordinate-26851',
  storageBucket: 'coordinate-26851.appspot.com',
  messagingSenderId: '396610550465'
};

firebase.initializeApp(config);

const auth = firebase.auth();

const signIn = () => {
  return auth.signInWithEmailAndPassword('user1@testdomain.com', 'password1');
};

const getToken = () => {
  console.log(auth.currentUser);
  if (!auth.currentUser) {
    return '';
  }
  return auth.currentUser.getIdToken(true);
};

export { getToken, signIn };
