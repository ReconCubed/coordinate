import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { ActionButton } from 'react-native-material-ui';
import { List, ListItem, Avatar } from 'react-native-elements';
import Header from '../Header';
import { FetchFriends } from '../../graphql/queries';

class UserPeopleView extends Component {
  renderFriends() {
    const { friends } = this.props.data;
    return (
      <ScrollView
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <List containerStyle={{ flex: 1 }}>
          {
            friends.map(({ id, username, photo }) => {
              return (
              <ListItem
                roundAvatar
                avatar={{ uri: photo }}
                key={id}
                title={username}
              />);
            })
          }
        </List>
      </ScrollView>
    );
  }

  renderView() {
    if (!this.props.data.loading) {
      return this.renderFriends();
    }
  }

  render() {
    const searchable = {
      autofocus: true,
      placeholder: 'Search for friends',
      onSearchClosed: () => this.setState({ searchTerm: '' }),
      onChangeText: searchTerm => this.setState({ searchTerm })
    };
    return (
      <View style={{ flex: 1 }}>
        <Header leftElement={'menu'} title={'Coordinate'} searchable={searchable} />
        <View style={{ display: 'flex', flex: 1 }}>
          {this.renderView()}
        </View>
      </View>
    );
  }
}


export default graphql(FetchFriends)(UserPeopleView);
