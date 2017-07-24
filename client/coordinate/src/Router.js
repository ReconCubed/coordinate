import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import CreateGroupForm from './components/CreateGroupForm';
import AddGroupMembers from './components/AddGroupMembers';
import GroupView from './components/GroupView';
import InviteAdditionalMembers from './components/InviteAdditionalMembers';
import NotificationsView from './components/NotificationsView';
import HomeView from './components/HomeView/HomeView';
import LogOut_Auth from './components/LogOut_Auth';

class RouterComponent extends Component  {
  render() {
    return (
      <Router navBar={Header}>
          <Scene key="main" initial>
            <Scene
              key="login"
              component={LoginForm}
              title={'Log In'}
              hideNotifications
            />
            <Scene
              key="create_group_form"
              component={CreateGroupForm}
              title={'Create a Group'}
              leftElement={'arrow-back'}
              onLeftElementPress={() => Actions.pop()}
            />
            <Scene
              key="add_group_members"
              component={AddGroupMembers}
              hideNavBar
            />
            <Scene
              key="home_view"
              component={HomeView}
              hideNavBar
            />
            <Scene
              key="group_view"
              component={GroupView}
              hideNavBar
            />
            <Scene
              key="invite_additional_members"
              component={InviteAdditionalMembers}
              hideNavBar
            />
            <Scene
              key="notifications"
              component={NotificationsView}
              hideNavBar
            />
            <Scene
              key="log_out_auth"
              component={LogOut_Auth}
              hideNotifications
            />
          </Scene>
      </Router>
    );
  }
}

export default RouterComponent;
