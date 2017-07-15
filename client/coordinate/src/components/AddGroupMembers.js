import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql } from 'react-apollo';
import { List, ListItem } from 'react-native-elements';
import { FetchFriends } from '../graphql/queries';

class AddGroupMembers extends Component {
  render() {
    console.log(this.props);
    if (!this.props.data) {
      return <View />;
    }

    if (!this.props.data.loading && this.props.data.friends) {
      return (
        <List containerStyle={{ marginBottom: 20 }}>
          {
            this.props.data.friends.map((l) => {
              return (
              <ListItem
                roundAvatar
                avatar={{ uri: 'l.photo' }}
                key={l.id}
                title={l.username}
              />);
            })
          }
        </List>
      );
    }
    return <View />;
  }
}

export default graphql(FetchFriends)(AddGroupMembers);
