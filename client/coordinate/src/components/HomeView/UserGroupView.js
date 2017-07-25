import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { Card, Icon, IconToggle, ActionButton, Button } from 'react-native-material-ui';
import FlipCard from 'react-native-flip-card';
import { List, Avatar } from 'react-native-elements';
import { UserGroupDetails } from '../../graphql/queries';
import { RemoveUserFromGroup } from '../../graphql/mutations';
import Header from '../Header';


class UserGroupView extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      flipCards: {}
    };
  }

  renderGroups() {
    const groups = this.props.data.userGroupDetails;
    if (groups.length > 0) {
      return (
        <ScrollView>
          <List containerStyle={{ flex: 1 }}>
            {
              groups.map(({ name, id, targetLocation, acceptedMembers }) => (
                <FlipCard 
                  style={{ borderWidth: 0 }}
                  key={id}
                  flip={this.state.flipCards[id]}
                >
                  {/*Face*/}
                  <Card
                    primary
                    onPress={() => Actions.group_view({ groupID: id })}
                    style={{
                      container: {
                        height: 150,
                      }
                    }}
                  >
                    <View style={{ position: 'absolute', right: 0, zIndex: 9999999 }}>
                      <IconToggle
                        name={'close'}
                        onPress={() => {
                          const flipCards = this.state.flipCards;
                          flipCards[id] = true;
                          this.setState({ flipCards });
                        }}
                      />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 30, marginTop: 20, marginRight: 20, zIndex: 9999 }}>
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
                  {/*Back*/}
                  <Card
                    primary
                    style={{ container:
                      { height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{`Would you like to leave ${name}?`}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15 }}>
                      <View style={{ paddingRight: 2 }}>
                        <Button
                          raised
                          primary
                          text={'Yes'}
                          icon={'check'}
                          onPress={() => {
                            this.props.mutate({
                              variables: {
                                groupID: id
                              },
                              refetchQueries: [{ query: UserGroupDetails }]
                            })
                            .then(resp => console.log(resp));
                          }}
                        />
                      </View>
                      <View style={{ paddingLeft: 2 }} >
                        <Button
                          raised
                          text={'No'}
                          icon={'close'}
                          onPress={() => {
                            const flipCards = this.state.flipCards;
                            flipCards[id] = false;
                            this.setState({ flipCards });
                          }}
                        />
                      </View>
                    </View>
                  </Card>
                </FlipCard>
              ))
            }
          </List>
        </ScrollView>
      );
    }
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

export default graphql(UserGroupDetails)(graphql(RemoveUserFromGroup)(UserGroupView));
