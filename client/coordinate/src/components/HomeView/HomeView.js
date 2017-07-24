import React, { Component } from 'react';
import { View } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { BottomNavigation } from 'react-native-material-ui';
import { UserGroupDetails, FetchFriends } from '../../graphql/queries';
import Header from '../Header';
import UserGroupView from './UserGroupView';
import UserPeopleView from './UserPeopleView';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'group'
    };
  }
  renderView() {
    if (this.state.view === 'group') {
      return <UserGroupView />;
    }
    return <UserPeopleView />;
  }

  renderBottomNavigation() {
    return (
    <BottomNavigation
      active={this.state.view}
      hidden={false}
      style={{
        container: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
    >
      <BottomNavigation.Action
        key={'group'}
        icon={'person-pin-circle'}
        label={'group'}
        onPress={() => this.setState({ view: 'group' })}
      />
      <BottomNavigation.Action
        key={'people'}
        icon={'people'}
        label={'people'}
        onPress={() => this.setState({ view: 'people' })}
      />
    </BottomNavigation>
    );
  }

  render() {

    return (
      <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {this.renderView()}
        {this.renderBottomNavigation()}
      </View>
    );
  }
}


export default graphql(UserGroupDetails)(compose(
  graphql(FetchFriends, { name: 'fetchFriends_query' }))(HomeView));
