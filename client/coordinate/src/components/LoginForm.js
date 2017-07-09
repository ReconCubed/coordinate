import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import { graphql } from 'react-apollo';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { LogIn } from '../graphql/mutations';
import { Card, CardSection, Input, Button, Spinner } from './common';

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
              Actions.create_group_form();
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
        <Button onPress={() => this.onSubmit()}>
          Login
        </Button>
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
          <Input
            label={'email'}
            placeholder={'email@gmail.com'}
            onChangeText={value => this.onEmailChange(value)}
            value={this.state.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label={'password'}
            placeholder={'password'}
            onChangeText={value => this.onPasswordChange(value)}
            value={this.state.password}
          />
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
