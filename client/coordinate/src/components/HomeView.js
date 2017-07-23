import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { BottomNavigation, Card, Icon } from 'react-native-material-ui';
import { List, Avatar } from 'react-native-elements';
import { UserGroupDetails } from '../graphql/queries';
import Header from './Header';

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'group'
    };
  }

  renderGroups() {
    const groups = this.props.data.userGroupDetails;
    return (
      <List containerStyle={{ flex: 1 }}>
        {
          groups.map(({ name, id, targetLocation, acceptedMembers }) => (
            <Card
              primary
              key={id}
              onPress={() => Actions.group_view({ groupID: id})}
              style={{
                container: {
                  height: 150,
                }
              }}
            >
              <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 30, marginTop: 20, marginRight: 20 }}>
                <Text style={{ fontSize: 24, paddingBottom: 10 }}>{name}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', marginRight: 50 }}>
                  <Icon name={'place'} color={'#553ecb'} />
                  <Text style={{ paddingLeft: 2 }}>{targetLocation.description}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', paddingTop: 15 }}>
                {
                  acceptedMembers.map(({ user }) => {
                    return (
                      <Avatar
                        rounded
                        key={user.id}
                        source={{ uri: user.photo }}
                      />
                    );
                  })
                }
                </View>
              </View>
            </Card>
          ))
        }
      </List>

    );
  }

  renderView() {
    if (!this.props.data.loading) {
      if (this.state.view === 'group') {
        return this.renderGroups();
      }
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
        key={'friends'}
        icon={'people'}
        label={'friends'}
        onPress={() => this.setState({ view: 'friends' })}
      />
    </BottomNavigation>
    );
  }

  render() {
    console.log(this.props.data);
    return (
      <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header leftElement={'menu'} onLeftElementPress={() => {}} title={'Coordinate'} />
        <View style={{ display: 'flex', flex: 1 }}>
          {this.renderView()}
        </View>
        {this.renderBottomNavigation()}
      </View>
    );
  }
}

export default graphql(UserGroupDetails)(HomeView);
