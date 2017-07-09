import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import App from './src/App';

export default class coordinate extends Component {
  render() {
    console.log('running...');
    return <App />;
  }
}

AppRegistry.registerComponent('coordinate', () => coordinate);
