import React, { Component } from 'react';
import { View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';


class Header extends Component {
  render() {
    return (
      <View>
        <Toolbar
          leftElement={this.props.leftElement}
          onLeftElementPress={() => this.props.onLeftElementPress()}
          centerElement={this.props.title}
          searchable={this.props.searchable}
          primary
        />
      </View>
    );
  }
}

export default Header;
