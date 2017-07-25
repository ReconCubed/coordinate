import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { graphql, compose } from 'react-apollo';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements';
import { ActionButton, BottomNavigation } from 'react-native-material-ui';
import OverflowMenu from './OverflowMenu';
import Header from './Header';
import { FetchGroupDetails } from '../graphql/queries';
import { UpdateLocation, RemoveUserFromGroup } from '../graphql/mutations';

class GroupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'map',
      showOverflow: false,
    };
  }

  componentWillUnmount() {
    if (this.watchPosition) {
      navigator.geolocation.clearWatch(this.watchPosition);
      this.watchPosition = null;
    }
  }

  initLocationUpdates() {
    if (this.props.updateLocation_mutation) {
      const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 30000 };
      this.watchPosition = navigator.geolocation.watchPosition(
        (({ coords }) => {
          const { latitude, longitude } = coords;
          this.props.updateLocation_mutation({
            variables: {
              newLocation: {
                lat: latitude,
                lng: longitude,
              }
            },
            refetchQueries: [{ query: FetchGroupDetails, variables: { groupID: this.props.groupID } }]
          })
          .catch(e => console.error(e));
        }),
        error => console.log(error),
        options
      );
    }
  }

  leaveGroup() {
    this.props.removeUserFromGroup_mutation({
      variables: {
        groupID: this.props.groupID
      }
    })
    .then(resp => {
      console.log(resp);
      Actions.home_view();
    });
  }

  renderMap() {
    const { groupDetails } = this.props.data;
    const { acceptedMembers, targetLocation } = groupDetails;
    const { lat, lng, description } = targetLocation;
    const image = require('../assets/icons/target_location.png');
    return (
      <MapView
        ref={mv => this.mv = mv}
        style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.0452,
          longitudeDelta: 0.0211
        }}
      >
        <View
          style={{
            opacity: 0.7,
            height: 100,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text>{description}</Text>
        </View>
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
          }}
          title={description}
          image={image}
        />
        {acceptedMembers.map((member) => {
          if (member.location) {
            const { lat: memberLat, lng: memberLng } = member.location;
            const locationObject = (memberLat && memberLng) ?
            {
              latitude: parseFloat(memberLat),
              longitude: parseFloat(memberLng)
            } : {};
            return (
              <MapView.Marker
                key={member.user.id}
                coordinate={locationObject}
                title={member.user.username}
              />
            );
          }
        })}
      </MapView>
    );
  }

  renderMembers() {
    const { groupDetails } = this.props.data;
    const leader = groupDetails.leader.id;
    const allMembers = (groupDetails.acceptedMembers.concat(groupDetails.pendingMembers)).map(m => m.user);
    const pendingMemberListView = () => {
      if (groupDetails.pendingMembers.length > 0) {
        return (
          <View>
           <ListItem title={'Pending'} hideChevron containerStyle={{ display: groupDetails.pendingMembers.length > 0 ? 'flex' : 'none', height: 8, backgroundColor: '#E0E0E0' }} titleStyle={{ fontSize: 12, textAlign: 'left', lineHeight: 12, marginTop: -5 }} />
            {
              groupDetails.pendingMembers.map(({ user }) => {
                return (
                <ListItem
                  roundAvatar
                  avatar={{ uri: user.photo }}
                  key={user.id}
                  title={user.username}
                />);
              })
            }
          </View>
        );
      }
    };

    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <ScrollView>
          <List containerStyle={{ flex: 1 }}>
          <ListItem title={'Accepted'} hideChevron containerStyle={{ height: 8, backgroundColor: '#E0E0E0' }} titleStyle={{ fontSize: 12, textAlign: 'left', lineHeight: 12, marginTop: -5 }}/>
            {
              groupDetails.acceptedMembers.map(({ user }) => {
                return (
                <ListItem
                  roundAvatar
                  avatar={{ uri: user.photo }}
                  key={user.id}
                  title={user.username}
                  rightIcon={(() => (user.id === leader) ? { name: 'grade', color: 'gold' } : {})()}
                />);
              })
            }
            {
              pendingMemberListView()
            }
          </List>
          </ScrollView>
        <ActionButton
          style={{ container: { backgroundColor: '#553ecb' } }}
          onPress={() => Actions.invite_additional_members({
            groupID: this.props.groupID,
            friendsToRemove: allMembers
          })}
        />
      </View>
    );
  }

  renderOverflowMenu() {
    const menuItems = [
      {
        title: 'Settings',
        icon: 'settings',
        onPress: () => console.log('settings')
      },
      {
        title: 'Leave Group',
        icon: 'input',
        onPress: () => this.leaveGroup(),
      }
    ];
    if (this.state.showOverflow) {
      return <OverflowMenu menuItems={menuItems} />;
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
          key={'map'}
          icon={'map'}
          label={'map'}
          onPress={() => this.setState({ view: 'map' })}
        />
        <BottomNavigation.Action
          key={'members'}
          icon={'people'}
          label={'members'}
          onPress={() => this.setState({ view: 'members' })}
        />
    </BottomNavigation>
    );
  }

  renderContent() {
    if (this.props.data.groupDetails) {
      if (this.state.view === 'map') {
        return this.renderMap();
      }
      return this.renderMembers();
    }
  }

  render() {
    if (!this.watchPosition) {
      this.initLocationUpdates();
    }
    const { groupDetails } = this.props.data;
    let title = '';
    if (groupDetails) {
      title = groupDetails.name;
    }
    return (
      <View style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Header
          title={title}
          leftElement={'arrow-back'}
          onLeftElementPress={() => Actions.pop()}
          rightElement={this.state.view === 'map' ? 'more-vert' : null}          
          onRightElementPress={() => {
            if (this.state.showOverflow) {
              this.setState({ showOverflow: false });
            } else {
              this.setState({ showOverflow: true });
            }
          }}
        />
        <View style={{ flex: 1 }} >
          {this.renderOverflowMenu()}
          {this.renderContent()}
        </View>
        {this.renderBottomNavigation()}
      </View>
    );
  }
}

export default graphql(FetchGroupDetails, {
  options: ({ groupID }) => ({ variables: { groupID } }),
})((compose(
  graphql(RemoveUserFromGroup, { name: 'removeUserFromGroup_mutation' }),
  graphql(UpdateLocation, { name: 'updateLocation_mutation' }))(GroupView)));
