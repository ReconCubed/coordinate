import React, { Component } from 'react';
import { View } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { BottomNavigation } from 'react-native-material-ui';
import Header from './Header';

class HomeView extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      view: 'group'
    };
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
        key={'friends'}
        icon={'people'}
        label={'friends'}
        onPress={() => this.setState({ view: 'friends' })}
      />
    </BottomNavigation>
    );
  }

  render() {
    return (
      <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header leftElement={'menu'} onLeftElementPress={() => {}} title={'Coordinate'} />
        <View style={{ display: 'flex', flex: 1 }}>
        </View>
        {this.renderBottomNavigation()}
      </View>
    );
  }
}

export default HomeView;
