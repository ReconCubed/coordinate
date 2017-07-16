import React, { Component } from 'react';
import { View, } from 'react-native';
import { graphql, compose } from 'react-apollo';
import MapView from 'react-native-maps';
import { BottomNavigation } from 'react-native-material-ui';
import { List, ListItem } from 'react-native-elements';
import Header from './Header';
import { FetchGroupDetails } from '../graphql/queries';
import { UpdateLocation } from '../graphql/mutations';

class GroupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'map'
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
          .then(resp => console.log(resp))
          .catch(e => console.error(e));
        }),
        error => console.log(error),
        options
      );
    }
  }

  renderMap() {
    const { groupDetails } = this.props.data;
    const { members } = groupDetails;
    const { lat, lng, description } = groupDetails.targetLocation;
    const image = require('../assets/icons/target_location.png');
    return (
      <MapView
        ref={mv => this.mv = mv}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: parseFloat(lat),
          longitude: parseFloat(lng),
          latitudeDelta: 0.0452,
          longitudeDelta: 0.0211
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
          }}
          title={description}
          image={image}
        />
        {members.map((member) => {
          if (member.location.lat && member.location.lng) {
            return (
              <MapView.Marker
                key={member.user.id}
                coordinate={{
                  latitude: parseFloat(member.location.lat),
                  longitude: parseFloat(member.location.lng)
                }}
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
    return (
      <List containerStyle={{ flex: 1 }}>
        {
          groupDetails.members.map(({ user }) => {
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
      </List>
    );
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
        <Header title={title} />
        <View style={{ flex: 1 }} >
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
  graphql(UpdateLocation, { name: 'updateLocation_mutation' }))(GroupView)));
