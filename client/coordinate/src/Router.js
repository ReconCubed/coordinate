import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import CreateGroupForm from './components/CreateGroupForm';
import AddGroupMembers from './components/AddGroupMembers';
import GroupView from './components/GroupView';
import InviteAdditionalMembers from './components/InviteAdditionalMembers';

const TempGroupView = () => {
  return <GroupView groupID={'-Kp7KILTDegMeZRiBxHk'} />;
};


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
            component={TempGroupView}
            hideNavBar
            initial            
          />
          <Scene
            key="invite_additional_members"
            component={InviteAdditionalMembers}
            hideNavBar
          />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
