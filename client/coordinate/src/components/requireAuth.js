import React, { Component } from 'react';
import { graphql, withApollo } from 'react-apollo';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { FetchUser } from '../graphql/queries';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    constructor(props) {
      super(props);
    }

    componentWillUpdate({ data }) {
      const user = firebase.auth().currentUser;
      if (data) {
        if ((!data.loading && !data.user) || !user) {
          Actions.login();
        } else if (!this.user) {
          this.user = data.user;
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} user={this.user} />;
    }

  }

  return graphql(FetchUser, {
    skip: (ownProps) => {
      if (ownProps.component) {
        const { name } = ownProps.component.WrappedComponent;
        const shouldSkip = (name === 'LoginForm' || name === 'LogOut_Auth');
        return shouldSkip;
      }
      return false;
    }
  })(withApollo(RequireAuth));
};
