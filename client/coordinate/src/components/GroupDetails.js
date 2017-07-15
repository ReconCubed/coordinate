import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import { FetchGroupDetails } from '../graphql/queries';
import { getToken } from '../firebase';

console.log('importing');

class GroupDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <View style={{ height: '100%', backgroundColor: 'white' }}>
        <Text> GroupDetails </Text>
      </View>
    );
  }
}

export default graphql(FetchGroupDetails, {
  options: {
    variables: {
      token: getToken(),
      groupID: '-KoPjHTffAvT6ZmThPMh'
    }
  }
})(GroupDetails);
