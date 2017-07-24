import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';
import { withApollo, graphql } from 'react-apollo';
import { LogOut } from '../graphql/mutations';
import { Spinner } from './common';

class LogOut_Auth extends Component {
  componentWillMount() {
    this.logOut()
    .then(() => {
      Actions.login({ hasLoggedOut: true });
    });
  }

  logOut() {
    return new Promise((resolve, reject) => {
      this.props.client.resetStore()
      .then(() => {
        this.props.mutate()
        .then((resp) => {
          firebase.auth().signOut()
          .then(() => {
            AsyncStorage.removeItem('auth_token')
            .then(() => {
              resolve();
            })
            .catch(e => reject(e));
          })
          .catch(e => reject(e));
        })
        .catch(e => reject(e));
      });
    });
  }

  render() {
    return <Spinner />;
  }
}

export default graphql(LogOut)(withApollo(LogOut_Auth));
