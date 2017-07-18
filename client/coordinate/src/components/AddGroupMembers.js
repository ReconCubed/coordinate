import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-material-ui';
import { List, ListItem } from 'react-native-elements';
import TrieSearch from 'trie-search';
import { FetchFriends } from '../graphql/queries';
import Header from './Header';


class AddGroupMembers extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      searchTerm: '',
    };
    this.friendsToRemove = props.friendsToRemove || [];
    this.selectedFriends = props.groupMembers || {};
    this.listItems = {};
  }

  componentDidUpdate() {
    if (!this.trieSearch && this.props.data) {
      if (!this.props.data.loading && this.props.data.friends) {
        const ts = new TrieSearch('username', { indexField: 'id' });
        this.props.data.friends.forEach(item => ts.add(item));
        this.trieSearch = ts;
      }
    }
  }

  selectFriend({ id }) {
    if (this.selectedFriends[id]) {
      delete this.selectedFriends[id];
    } else {
      this.selectedFriends[id] = true;
    }
    this.forceUpdate();
  }

  saveAddedFriends() {
    Actions.create_group_form({
      groupMembers: this.selectedFriends,
      groupName: this.props.groupName,
      groupLocation: this.props.groupLocation
    });
  }

  renderFriends() {
    if (!this.props.data) {
      return;
    } else if (!this.props.data.loading && this.props.data.friends) {
      if (!this.friendslist) {
        this.friendslist = this.props.data.friends.filter(x => this.friendsToRemove.indexOf(x) == -1);
      }
      let friendsList = this.friendslist;
      if (this.state.searchTerm !== '' && this.trieSearch) {
        friendsList = this.trieSearch.get(this.state.searchTerm);
      } 
      return (
        <View>
          <List containerStyle={{ marginBottom: 20 }}>
            {
              friendsList.map((l) => {
                return (
                <ListItem
                  onPress={() => this.selectFriend(l)}
                  containerStyle={{ backgroundColor: this.selectedFriends[l.id] ? '#E0E0E0' : 'white' }}
                  roundAvatar
                  avatar={{ uri: l.photo }}
                  key={l.id}
                  title={l.username}
                  hideChevron
                />);
              })
            }
          </List>
          <Button primary raised text={'Save Members'} onPress={() => this.saveAddedFriends()} />
        </View>
      );
    }
  }

  render() {
    return (
      <View>
        <Header
          searchable={{
            autoFocus: true,
            placeholder: 'Search for friends',
            onSearchClosed: () => this.setState({ searchTerm: '' }),
            onChangeText: searchTerm => this.setState({ searchTerm })
          }}
          onLeftElementPress={() => Actions.pop({ groupName: this.props.groupName, groupLocation: this.props.location })}
          leftElement={'arrow-back'}
          title={'Add Group Members'}
        />
        {this.renderFriends()}
      </View>
    );
  }
}

AddGroupMembers.propTypes = {
  data: PropTypes.object,
  selectedFriends: PropTypes.object,
};

export default graphql(FetchFriends)(AddGroupMembers);
