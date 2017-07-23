import React, { Component } from 'react';
import { View, Modal, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { graphql } from 'react-apollo';
import { Toolbar, Badge, IconToggle } from 'react-native-material-ui';
import { FetchNotifications } from '../graphql/queries';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: 0,
      showNotifications: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.notifications) {
      const { unread, read } = nextProps.data.notifications;
      if (unread.length > 0 && unread.length !== this.state.notifications) {
        this.setState( {
          notifications: unread.length
        });
      }
    }
  }

  notificationOnPress() {
    Actions.notifications();
  }

  renderRightElement() {
    const { notifications } = this.state;
    if (!this.props.hideNotifications) {
      return (
        <Badge
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
      );
    }
  }

  render() {
    const { notifications } = this.state;
    return (
      <View>
        <Toolbar
          leftElement={this.props.leftElement}
          onLeftElementPress={() => this.props.onLeftElementPress()}
          centerElement={this.props.title}
          rightElement={this.renderRightElement()}
          onRightElementPress={() => console.log('Right element press')}
          searchable={this.props.searchable}
          primary
        />
      </View>
    );
  }
}


export default graphql(FetchNotifications)(Header);
