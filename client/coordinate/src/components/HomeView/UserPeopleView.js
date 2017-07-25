import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { Card } from 'react-native-material-ui';
import { List, ListItem } from 'react-native-elements';
import Header from '../Header';
import { FetchFriends } from '../../graphql/queries';

class UserPeopleView extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      searchTerm: ''
    };
  }

  renderFriends() {
    const { friends } = this.props.data;
    if (friends.length === 0 && this.state.searchTerm === '') {
      return (
        <ScrollView style={{ display: 'flex', flex: 1 }} >
            <Card primary style={{ container: { height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' } }} >
            <Text style={{ fontSize: 18, margin: 20, textAlign: 'center' }}> Use the search bar to start finding friends! </Text>
          </Card>
        </ScrollView>
      );
    }
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
