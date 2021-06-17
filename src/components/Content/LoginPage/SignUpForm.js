import React from "react";
import { Component } from "react";
import { Button, Card, CardSection, Input } from ".";
import firebase from "firebase";

class LoginForm extends Component {
  state = { email: "" };

  onButtonPress() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user.gmail.com"
            label="email"
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress}>Login</Button>
        </CardSection>
      </Card>
    );
  }
}

export default LoginForm;
