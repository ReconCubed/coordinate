import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { Card, Icon, ActionButton } from 'react-native-material-ui';
import { List, Avatar } from 'react-native-elements';
import { UserGroupDetails } from '../../graphql/queries';
import Header from '../Header';
import requireAuth from '../requireAuth';

class UserGroupView extends Component {
  renderGroups() {
    const groups = this.props.data.userGroupDetails;
    if (groups.length > 0) {
      return (
        <ScrollView>
          <List containerStyle={{ flex: 1 }}>
            {
              groups.map(({ name, id, targetLocation, acceptedMembers }) => (
                <Card
                  primary
                  key={id}
                  onPress={() => Actions.group_view({ groupID: id })}
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
                      <Text style={{ paddingLeft: 2 }}>{targetLocation ? targetLocation.description : ''}</Text>
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
        </ScrollView>
      );
    }
    console.log('rendering card');
    return (
      <ScrollView style={{ display: 'flex', flex: 1 }} >
          <Card primary style={{ container: { height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center' } }} >
          <Text style={{ fontSize: 18, margin: 20, textAlign: 'center' }}> You are not currently a member in any active groups. Press the + button to create a new group! </Text>
        </Card>
      </ScrollView>
    );
  }

  renderView() {
    if (!this.props.data.loading) {
      return this.renderGroups();
    }
  }
  render() {
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <Header leftElement={'menu'} title={'Coordinate'} />
        <View style={{ display: 'flex', flex: 1 }}>
          {this.renderView()}
          <ActionButton
            style={{ container: { backgroundColor: '#553ecb' } }}
            onPress={() => Actions.create_group_form()}
          />
        </View>
      </View>
    );
  }
}

export default graphql(UserGroupDetails)(UserGroupView);
