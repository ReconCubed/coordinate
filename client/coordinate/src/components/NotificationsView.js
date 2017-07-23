import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { graphql, compose } from 'react-apollo';
import { Icon, Button } from 'react-native-material-ui';
import { List, ListItem } from 'react-native-elements';
import { View, Text, ScrollView } from 'react-native';
import { FetchNotifications } from '../graphql/queries';
import { AcceptGroupInvite } from '../graphql/mutations';
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


    if (type === 'group_request') {
      return (
        <View style={buttonViewStyle}>
          <Button raised primary text={'Accept'} icon={'check'} onPress={() => acceptGroupOnPress()} />
          <Button raised text={'Decline'} icon={'close'} />
        </View>
      );
    }
  }

  renderNotifications() {
    if (this.props.data.notifications) {
      const unread = this.props.data.notifications.unread || [];
      const read = this.props.data.notifications.read || [];
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
          title={'Requests'}
        />
        <ScrollView>
          {this.renderNotifications()}
        </ScrollView>
      </View>
    );
  }
}


export default graphql(FetchNotifications)(compose(
  graphql(AcceptGroupInvite, { name: 'acceptGroupInvite_mutation' })
)(NotificationsView));

