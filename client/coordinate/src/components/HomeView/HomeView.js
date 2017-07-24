import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { BottomNavigation } from 'react-native-material-ui';
import UserGroupView from './UserGroupView';
import UserPeopleView from './UserPeopleView';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'group'
    };
  }

  componentWillMount() {
    if (!firebase.auth().currentUser) {
      Actions.login();
    }
  }

  renderView() {
    if (firebase.auth().currentUser) {
      if (this.state.view === 'group') {
        return <UserGroupView />;
      }
      return <UserPeopleView />;
    }
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


export default HomeView;
