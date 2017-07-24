import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql } from 'react-apollo';
import { Toolbar, Badge, IconToggle, Drawer } from 'react-native-material-ui';
import firebase from 'firebase';
import { ListItem, Avatar } from 'react-native-elements';
import { FetchNotifications } from '../graphql/queries';
import requireAuth from './requireAuth';
import { LogOut } from '../graphql/mutations';


class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: 0,
      showNotifications: false
    };
  }

  componentWillReceiveProps({ data }) {
    if (data) {
      if (data.notifications) {
        const { unread, read } = data.notifications;
        if (unread.length > 0 && unread.length !== this.state.notifications) {
          this.setState({
            notifications: unread.length
          });
        }
      }      
    }
  }

  notificationOnPress() {
    Actions.notifications();
  } 

  logOutOnPress() {
    Actions.log_out_auth();
  }

  renderMenuDrawer() {
    if (this.state.showMenuDrawer) {
      const { photo, username } = this.props.user || {};
      return (
        <View
          style={{
            position: 'absolute',
            top: 50,
            width: 200,
            elevation: 4,
            backgroundColor: 'white',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#E0E0E0'
          }}
        >
          <Drawer>
            <View style={{ height: 75, backgroundColor: '#E0E0E0', display: 'flex', justifyContent: 'center' }}>
              <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                <Avatar rounded source={{ uri: photo }} />
                <Text style={{ paddingLeft: 12, fontWeight: 'bold', fontSize: 18 }}>{username}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <ListItem
                style={{ height: 40 }}
                key={'settings'}
                title={'Settings'}
                leftIcon={<IconToggle name={'settings'} onPress={() => console.log('settings')} />}
                hideChevron
                onPress={() => console.log('Settings')}
              />
              <ListItem
                style={{ height: 40 }}
                key={'log_out'}
                title={'Log Out'}
                leftIcon={<IconToggle name={'input'} onPress={() => this.logOutOnPress()} />}
                hideChevron
                onPress={() => this.logOutOnPress()}
              />
            </View>
          </Drawer>
        </View>
      );
    }
  }

  renderRightElement() {
    const { notifications } = this.state;
    let rightElement = [];
    let notificationElement = [];
    if (this.props.rightElement) {
      if (typeof (this.props.rightElement) === 'object') {
        rightElement = this.props.rightElement;
      } else {
        rightElement = [this.props.rightElement];
      }
    }
    if (!this.props.hideNotifications) {
      notificationElement = [
        <Badge
          key={'notification'}
          text={notifications > 0 ? notifications.toString() : ''}
          style={{
            container: {
              top: 2,
              right: -1,
              backgroundColor: notifications > 0 ? '#ff0000' : null,
            }
          }}
        >
        <IconToggle
          name={'notifications'}
          color={notifications > 0 ? '#8dfcf8' : ''}
          onPress={() => this.notificationOnPress()}
        />
      </Badge>
      ];
    }
    const rightElements = notificationElement.concat(rightElement);
    return rightElements;
  }

  onLeftElementPress() {
    const { onLeftElementPress, leftElement } = this.props;
    if (onLeftElementPress) {
      onLeftElementPress();
    } else if (leftElement === 'menu') {
      if (this.state.showMenuDrawer) {
        this.setState({ showMenuDrawer: false });
      } else {
        this.setState({ showMenuDrawer: true });
      }
    }
  }

  render() {
    const { notifications } = this.state;
    return (
      <View style={{ zIndex: 9999999999}}>
        <Toolbar
          leftElement={this.props.leftElement}
          onLeftElementPress={() => this.onLeftElementPress()}
          centerElement={this.props.title}
          rightElement={this.renderRightElement()}
          onRightElementPress={() => console.log('Right element press')}
          searchable={this.props.searchable}
          primary
        />
        {this.renderMenuDrawer()}
      </View>
    );
  }
}

export default graphql(FetchNotifications, {
  skip: ownProps => ownProps.hideNotifications
})(requireAuth(HeaderComponent));
