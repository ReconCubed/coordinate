import admin from 'firebase-admin';
import serviceAccount from '../../../../.secret/coordinate-26851-firebase-adminsdk-342k8-0ef096b97c.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://coordinate-26851.firebaseio.com'
});


const login = () => {

};

const signup = () => {

};

export { login, signup };
