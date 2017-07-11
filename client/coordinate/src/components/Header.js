import React, { Component } from 'react';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';


class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <View>
        <Toolbar
          leftElement="menu"
          centerElement={this.props.title}
        />
      </View>
    );
  }
}

export default Header;
