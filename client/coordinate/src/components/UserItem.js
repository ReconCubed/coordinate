import React from 'react';
import { Image } from 'react-native';
import { Avatar, ListItem } from 'react-native-material-ui';

const renderAvatarImage = (uri) => {
  console.log(uri);
  return (
    <Avatar
      image={<Image
        source={{ uri }}
        style={{ width: 40, height: 40 }}
        size={500}
      />}
    />
  );
};

const UserItem = () => {
  return (
    <ListItem
      leftElement={renderAvatarImage('https://upload.wikimedia.org/wikipedia/commons/4/4c/LeBron_James_3408968580.jpg')}
    />
  );
};

export default UserItem;
