import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { ApolloProvider } from 'react-apollo';
import Router from './Router';

// TEMPORARY! - until front-end auth view is implemented

const initFirebase = () => {
  const config = {
    apiKey: 'AIzaSyAgXDDJletVdmwm_apWDFt39f9XdenkNKs',
    authDomain: 'coordinate-26851.firebaseapp.com',
    databaseURL: 'https://coordinate-26851.firebaseio.com',
    projectId: 'coordinate-26851',
    storageBucket: 'coordinate-26851.appspot.com',
    messagingSenderId: '396610550465'
  };

  firebase.initializeApp(config);
};

class App extends Component {
  componentWillMount() {
    this.initApollo();
    initFirebase();
  }

  initApollo() {
    const fetchToken = () => {
      return new Promise((resolve) => {
        try {
          AsyncStorage.getItem('auth_token')
          .then(value => resolve(value))
          .catch((error) => {
            console.error(error);
            resolve(null);
          });
        } catch (error) {
          console.error(error);
          resolve(null);
        }
      });
    };

    const networkInterface = createNetworkInterface({
      uri: 'http://localhost:8080/graphql'
    });

    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};
        }
        fetchToken()
        .then((token) => {
          req.options.headers.authorization = token || null;
          next();
        })
        .catch(() => null);
      }
    }]);

    this.client = new ApolloClient({
      dataIdFromObject: o => o.id,
      networkInterface,
    });
  }

  render() {
    return (
    <ApolloProvider client={this.client}>
      <Router />
    </ApolloProvider>
    );
  }
}

export default App;