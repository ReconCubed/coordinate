import React, { Component } from 'react';
import { View, Text, AsyncStorage, ScrollView } from 'react-native';
import TextField from 'react-native-md-textinput';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import { Card, Button } from 'react-native-material-ui';
import firebase from 'firebase';
import { LogIn } from '../graphql/mutations';
import { CardSection, Spinner } from './common';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange(email) {
    this.setState({ email, error: '' });
  }

  onPasswordChange(password) {
    this.setState({ password, error: '' });
  }

  onSubmit() {
    const getToken = () => firebase.auth().currentUser.getIdToken(true);
    this.setState({ showSpinner: true });
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      getToken()
      .then((token) => {
        console.log(token);
        try {
          AsyncStorage.setItem('auth_token', token)
          .then(() => {
            this.props.mutate()
            .then((resp) => {
              console.log(resp);
              Actions.group_view({ groupID: '-Kp7KILTDegMeZRiBxHk'});
            })
            .catch(e => console.error(e));
          })
          .catch(e => console.error(e));
        } catch (e) {
          console.error(e);
        }
      })
      .catch(error => console.error(error));
    })
    .catch(() => this.setState({ error: 'Invalid email or password' }))
    .then(() => this.setState({ showSpinner: false }));
  }

  renderSubmitButton() {
    if (!this.state.showSpinner) {
      return (
        <View style={{ flex: 1, display: 'flex' }}>
          <Button raised primary text='Log In' onPress={() => this.onSubmit()}>
          </Button>
        </View>
      );
    }
    return (
      <Spinner />
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <ScrollView >
            <TextField
              autoCapitalize={'none'}
              label={'email'}
              onChangeText={value => this.onEmailChange(value)}
              value={this.state.email}
              highlightColor={'#4c19ce'}
              dense
            />
          </ScrollView>
        </CardSection>
        <CardSection>
          <ScrollView>
            <TextField
              secureTextEntry
              label={'password'}
              onChangeText={value => this.onPasswordChange(value)}
              value={this.state.password}
              highlightColor={'#4c19ce'}
              dense
            />
          </ScrollView>
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          {this.renderSubmitButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red'
  }
};

export default graphql(LogIn)(LoginForm);
