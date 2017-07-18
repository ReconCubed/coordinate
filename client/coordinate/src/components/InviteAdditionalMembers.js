import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-material-ui';
import { List, ListItem } from 'react-native-elements';
import TrieSearch from 'trie-search';
import { FetchFriends } from '../graphql/queries';
import { InviteUsersToGroup } from '../graphql/mutations';

import Header from './Header';


class InviteAdditionalMembers extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      searchTerm: '',
      selectedFriends: {}
    };
    this.selectedFriends = {};
    this.friendsToRemove = props.friendsToRemove || [];
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
    this.setState({ selectedFriends: this.selectedFriends });
  }

  inviteToGroup() {
    this.props.inviteUsersToGroup_mutation({
      variables: {
        groupID: this.props.groupID,
        userIDArray: Array.from(Object.keys(this.state.selectedFriends))
      }
    })
    .then(response => {
      console.log(response);
      Actions.pop();
    })
    .catch(e => console.error(e));
  };

  renderInviteButton() {
    if (Object.keys(this.state.selectedFriends).length > 0) {
      return <Button primary raised text={'Invite To Group'} onPress={() => this.inviteToGroup()} />
    }
    return <Button primary disabled raised text={'Invite To Group'} />
  }

  renderFriends() {
    if (!this.props.data) {
      return;
    } else if (!this.props.data.loading && this.props.data.friends) {
      if (!this.friendslist) {
        const removalArray = this.friendsToRemove.map(i => i.id);
        console.log(removalArray);
        this.friendslist = this.props.data.friends.filter(x => removalArray.indexOf(x.id) == -1);
        console.log(this.props.data.friends);
        console.log(this.friendsToRemove);
        console.log(this.friendslist);
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
                  containerStyle={{ backgroundColor: this.state.selectedFriends[l.id] ? '#E0E0E0' : 'white' }}
                  roundAvatar
                  avatar={{ uri: l.photo }}
                  key={l.id}
                  title={l.username}
                  hideChevron
                />);
              })
            }
          </List>
          {this.renderInviteButton()}
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
          onLeftElementPress={() => Actions.pop()}
          leftElement={'arrow-back'}
          title={'Invite Friends to Group'}
        />
        {this.renderFriends()}
      </View>
    );
  }
}

InviteAdditionalMembers.propTypes = {
  data: PropTypes.object,
  selectedFriends: PropTypes.object,
  friendsToRemove: PropTypes.array,
  groupID: PropTypes.string
};

export default graphql(FetchFriends, {
  options: ({ groupID }) => ({ variables: { groupID } }),
})((compose(
  graphql(InviteUsersToGroup, { name: 'inviteUsersToGroup_mutation' }))(InviteAdditionalMembers)));

