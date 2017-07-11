import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import CreateGroupForm from './components/CreateGroupForm';

const RouterComponent = () => {
  return (
    <Router navBar={Header}>
        <Scene key="main" initial>
          <Scene
            key="login"
            component={LoginForm}
            title={'Log In'}
            initial
          />
          <Scene
            key="create_group_form"
            component={CreateGroupForm}
            title={'Create a Group'}
          />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
