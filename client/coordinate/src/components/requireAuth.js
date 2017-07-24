import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { FetchUser } from '../graphql/queries';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate({ data }) {
      if (!data.loading && !data.user) {
        Actions.login();
      } else if (!this.user) {
        this.user = data.user;
      }
    }

    render() {
      return <WrappedComponent {...this.props} user={this.user} />;
    }

  }

  return graphql(FetchUser)(RequireAuth);
};
