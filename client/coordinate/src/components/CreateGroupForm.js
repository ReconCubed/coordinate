import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TextField from 'react-native-md-textinput';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView, TouchableHighlight, Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, ListItem, Divider } from 'react-native-material-ui';
import { CardSection } from './common';
import { googlePlacesConfig } from '../../app_config';


class CreateGroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.groupName || '',
      members: props.groupMembers || {},
      location: props.groupLocation || '',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (this.state.location.description) {
      this.locationSearch.setAddressText(this.state.location.description);
    }
  }


  onGroupNameChange(name) {
    this.setState({ name });
  }

  onMemberKeywordChange(memberKeyword) {
    this.setState({ memberKeyword });
  }

  renderFriendSearch() {
    return (
      <ScrollView>
        <TextField
          label={'members'}
          onChangeText={value => this.onMemberKeywordChange(value)}
          value={this.state.memberKeyword}
          highlightColor={'#4c19ce'}
          autocorrect={false}
        />
      </ScrollView>
    );
  }

  renderLocationSearch() {
    return (
      <GooglePlacesAutocomplete
        ref={c => this.locationSearch = c}
        label={'meetup location'}
        minLength={2}
        autoFocus={false}
        listViewDisplayed={'auto'}
        fetchDetails
        text={'testing'}
        onPress={(data, details = null) => {
          console.log(data);
          console.log(details);
          this.setState({ location: data });
        }}
        query={{
          key: googlePlacesConfig.apiKey,
          language: 'en',
        }}
       styles={{
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#000',
          },
          textInputContainer: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            display: 'flex',
            justifyContent: 'flex-start'
          },
          textInput: {
            fontSize: 18,
            paddingLeft: 5,
            flex: 1,
            lineHeight: 23,
          },
        }}
        nearbyPlacesAPI={'GooglePlacesSearch'}
        GooglePlacesSearchQuery={{
          rankby: 'distance',
        }}
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
        debounce={200}
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <Card>
          <CardSection>
            <ScrollView>
              <TextField
                label={'name'}
                onChangeText={value => this.onGroupNameChange(value)}
                value={this.state.name}
                highlightColor={'#4c19ce'}
                fontSize={24}
                autocorrect={false}
              />
            </ScrollView>
          </CardSection>
          <CardSection>
          {this.renderLocationSearch()}
          </CardSection>
          <CardSection>
            <TouchableHighlight style={{ paddingTop: 30, display: 'flex', flex: 1 }} onPress={() => Actions.add_group_members({
              groupName: this.state.name,
              groupLocation: this.state.location,
              groupMembers: this.state.members

            })}>
            <View>
                <Text style={styles.inputStyle}>members</Text>
                <Divider primary />
            </View>
            </TouchableHighlight>
          </CardSection>
          <View style={{ bottom: 0 }}>
            <Button primary raised text={'Create'} />
          </View>
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#9E9E9E',
    paddingRight: 5,
    paddingLeft: 0,
    fontSize: 16,
    lineHeight: 23,
    flex: 2,
    height: 30,
    display: 'flex',
    flexDirection: 'row'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default CreateGroupForm;
