import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon, Drawer } from 'react-native-material-ui';
import { ListItem } from 'react-native-elements';

class OverflowMenu extends Component {
  render() {
    if (!this.props.menuItems) {
      return <View />;
    }
    return (
      <View
          style={{
            position: 'absolute',
            top: 0,
            flex: 1,
            right: 0,
            width: 200,
            elevation: 4,
            backgroundColor: 'white',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#E0E0E0',
            zIndex: 9999999
          }}
      >
        <Drawer>
          <View style={{ flex: 1 }}>
            {
              this.props.menuItems.map(({ title, icon, onPress }) => {
                return (
                <ListItem
                  style={{ height: 40 }}
                  key={title}
                  title={title}
                  leftIcon={<Icon name={icon} style={{ paddingRight: 10 }} />}
                  hideChevron
                  onPress={() => onPress()}
                />
                );
              })
            }
          </View>
        </Drawer>
      </View>
    );
  }
}

export default OverflowMenu;
