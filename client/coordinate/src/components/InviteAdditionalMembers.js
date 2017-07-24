import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Button, Card } from 'react-native-material-ui';
import { List, ListItem } from 'react-native-elements';
import TrieSearch from 'trie-search';
import { FetchFriends } from '../graphql/queries';
import { InviteUsersToGroup } from '../graphql/mutations';
import Header from './Header';


class InviteAdditionalMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      selectedFriends: {},
      showSearch: false,
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
    .then((response) => {
      console.log(response);
      Actions.pop();
    })
    .catch(e => console.error(e));
  }

  renderInviteButton() {
    if (Object.keys(this.state.selectedFriends).length > 0) {
      return <Button primary raised text={'Invite To Group'} onPress={() => this.inviteToGroup()} />;
    }
    return <Button primary disabled raised text={'Invite To Group'} />;
  }

  renderFriends() {
    if (!this.props.data) {
      return [];
    } else if (!this.props.data.loading && this.props.data.friends) {
      if (!this.friendslist) {
        const removalArray = this.friendsToRemove.map(i => i.id);
        this.friendslist = this.props.data.friends.filter(x => removalArray.indexOf(x.id) === -1);
        if (this.friendslist.length !== 0) {
          this.setState({ showSearch: true });
        }
      }
      let friendsList = this.friendslist;
      if (this.state.searchTerm !== '' && this.trieSearch) {
        friendsList = this.trieSearch.get(this.state.searchTerm);
      }
      if (this.friendslist.length === 0 && this.props.data.friends.length !== 0) {
        return (
          <Card style={{ container: { height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
            <Text>Your friends have already been invited to this group.</Text>
          </Card>
        );
      }
      return (
        <ScrollView>
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
        </ScrollView>
      );
    }
  }

  render() {
    const searchable = this.state.showSearch ? {
      autoFocus: true,
      placeholder: 'Search for friends',
      onSearchClosed: () => this.setState({ searchTerm: '' }),
      onChangeText: searchTerm => this.setState({ searchTerm })
    } : null;
    return (
      <View>
        <Header
          searchable={searchable}
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

