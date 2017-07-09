import React, { Component } from 'react';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-design';


class Header extends Component {
  render() {
    return (
      <View style={{ paddingBottom: 56 }}>
        <Toolbar 
          icon={'menu'}
        />
      </View>
    );
  }
}

export default Header;
