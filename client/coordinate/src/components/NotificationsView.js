import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';
import { Icon, Button, Card } from 'react-native-material-ui';
import { List, ListItem } from 'react-native-elements';
import { View, Text, ScrollView } from 'react-native';
import { FetchNotifications } from '../graphql/queries';
import { AcceptGroupInvite, RejectGroupInvite} from '../graphql/mutations';
import Header from './Header';

class NotificationsView extends Component {
  iconType(type) {
    let icon = ''
    switch(type) {
      case 'group_request':
        icon = 'group-add';
        break;
      default:
        break;
    }
    return icon;
  }

  renderNotificationActions(type, { groupID, notificationID }) {
    const buttonViewStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 15
    };
    const acceptGroupOnPress = () => {
      this.props.acceptGroupInvite_mutation({
        variables: {
          notificationID,
          groupID
        },
        refetchQueries: [{ query: FetchNotifications }]
      })
      .then(resp => console.log(resp))
      .catch(e => console.error(e));
    };

    const declineGroupOnPress = () => {
      this.props.rejectGroupInvite_mutation({
        variables: {
          notificationID,
          groupID
        },
        refetchQueries: [{ query: FetchNotifications }]
      })
      .then(resp => console.log(resp))
      .catch(e => console.error(e));
    };


    if (type === 'group_request') {
      return (
        <View style={buttonViewStyle}>
          <Button raised primary text={'Accept'} icon={'check'} onPress={() => acceptGroupOnPress()} />
          <Button raised text={'Decline'} icon={'close'} onPress={() => declineGroupOnPress()}/>
        </View>
      );
    }
  }

  renderNotifications() {
    if (this.props.data.notifications) {
      const unread = this.props.data.notifications.unread || [];
      const read = this.props.data.notifications.read || [];
      if (read.length === 0 && unread.length === 0) {
        return (
          <Card style={{ container: { height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
            <Text> You have no notifications </Text>
          </Card>
        );
      }
      return (
        <View style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}>
          <List containerStyle={{ flex: 1 }}>
          {
            unread.map(({ id, title, type, groupID }) => (
              <ListItem
                key={id}
                title={title}
                leftIcon={<Icon name={this.iconType(type)} style={{ paddingRight: 10 }} />}
                subtitle={this.renderNotificationActions(type, { groupID, notificationID: id })}
                hideChevron
              />
            ))
          }
          {
            read.map(({ id, title }) => (
              <ListItem key={id} title={title} />
            ))
          }
          </List>
        </View>
      );
    }
  }


  render() {
    console.log(this.props);
    return (
      <View style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Header
          hideNotifications
          onLeftElementPress={() => Actions.pop()}
          leftElement={'arrow-back'}
          title={'Notifications'}
        />
        <ScrollView>
          {this.renderNotifications()}
        </ScrollView>
      </View>
    );
  }
}


export default graphql(FetchNotifications)(compose(
  graphql(AcceptGroupInvite, { name: 'acceptGroupInvite_mutation' }),
  graphql(RejectGroupInvite, { name: 'rejectGroupInvite_mutation' })
)(NotificationsView));

