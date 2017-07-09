import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Header from './components/Header';
import LoginForm from './components/LoginForm';

const RouterComponent = () => {
  return (
    <Router navBar={Header}>
      <Scene key="auth" initial>
        <Scene
          key="login"
          component={LoginForm}
          title={'Log In'}
          initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
