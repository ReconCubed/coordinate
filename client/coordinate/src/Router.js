import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import CreateGroupForm from './components/CreateGroupForm';
import AddGroupMembers from './components/AddGroupMembers';
import GroupView from './components/GroupView';
import InviteAdditionalMembers from './components/InviteAdditionalMembers';
import NotificationsView from './components/NotificationsView';

const testGroup7 = () => <GroupView groupID={'-KpfxcoKrGYxZwSopCr4'} />;

const RouterComponent = () => {
  return (
    <Router navBar={Header}>
        <Scene key="main" initial>
          <Scene
            key="login"
            component={LoginForm}
            title={'Log In'}
          />
          <Scene
            key="create_group_form"
            component={CreateGroupForm}
            title={'Create a Group'}
          />
          <Scene
            key="add_group_members"
            component={AddGroupMembers}
            hideNavBar
          />
          <Scene
            key="group_view"
            component={GroupView}
            hideNavBar
          />
          <Scene
            key="test_group"
            component={testGroup7}
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
            initial
          />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
