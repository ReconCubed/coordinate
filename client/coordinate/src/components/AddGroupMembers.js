import React, { Component } from 'react';
import { Text } from 'react-native';
import { graphql } from 'react-apollo';
import { FetchFriends } from '../graphql/queries';

class AddGroupMembers extends Component {
  render() {
    console.log(this.props);
    return <Text>Hi</Text>;
  }
}

export default graphql(FetchFriends)(AddGroupMembers);
