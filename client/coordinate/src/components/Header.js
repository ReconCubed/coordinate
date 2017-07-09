import React, { Component } from 'react';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-design';


class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <View style={{ paddingBottom: 56 }}>
        <Toolbar
          title={this.props.title}
          icon={'menu'}
        />
      </View>
    );
  }
}

export default Header;
