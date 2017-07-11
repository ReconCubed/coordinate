import React, { Component } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TextField from 'react-native-md-textinput';
import { View, ScrollView } from 'react-native';
import { Button, Card, ListItem } from 'react-native-material-ui';
import { CardSection } from './common';
import { googlePlacesConfig } from '../../app_config';


class CreateGroupForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      members: [],
      memberKeyword: ''
    };
    console.log(googlePlacesConfig);
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
        label={'meetup location'}
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
            <ScrollView>
              <TextField
                label={'members'}
                onChangeText={value => this.onMemberKeywordChange(value)}
                value={this.state.memberKeyword}
                highlightColor={'#4c19ce'}
                autocorrect={false}
                onClick={(event) => {
                  event.preventDefault();
                  console.log('hi');
                }}
              />
            </ScrollView>
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
