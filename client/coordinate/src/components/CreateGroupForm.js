import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Text, View } from 'react-native';
import { Card, CardSection, Input } from './common';
import { googlePlacesConfig } from '../../app_config';


class CreateGroupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      locationKeyword: '',
      location: '',
      time: '',
      members: []
    };
    console.log(googlePlacesConfig);
  }

  onGroupNameChange(name) {
    this.setState({ name });
  }

  onLocationKeywordChange(locationKeyword) {
    this.setState({ locationKeyword });
  }

  renderLocationSearch() {
    return (
      <GooglePlacesAutocomplete
        placeholder={'Search'}
        minLength={2}
        autoFocus={false}
        listViewDisplayed={'auto'}
        fetchDetails
        onPress={(data, details = null) => {
          console.log(data);
          console.log(details);
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
            labelStyle: {
              fontSize: 18,
              paddingLeft: 20,
              flex: 1,
              lineHeight: 23,
            },
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
      <Card>
        <CardSection>
          <Input
            label={'name'}
            placeholder={'My Group Name'}
            onChangeText={value => this.onGroupNameChange(value)}
            value={this.state.name}
          />
        </CardSection>
        <CardSection>
          <Input
            label={'location'}
            placeholder={'My Favorite Bar'}
            onChangeText={value => this.onLocationKeywordChange(value)}
            value={this.state.locationKeyword}
          />
        </CardSection>
        <CardSection>
        {this.renderLocationSearch()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
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
