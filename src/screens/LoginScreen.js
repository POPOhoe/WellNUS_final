import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "../components/TextComponents";
import { Header, Spinner, Button } from "../components/Content/LoginPage";
import firebase from "firebase";
import LoginForm from "../components/Content/LoginPage/LoginForm";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

class LoginScreen extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyDs-KO6tliYucnKpBhuBK80alHhwEPwBkY",
      authDomain: "wellnus-8a6dc.firebaseapp.com",
      projectId: "wellnus-8a6dc",
      storageBucket: "wellnus-8a6dc.appspot.com",
      messagingSenderId: "15146717621",
      appId: "1:15146717621:web:57c6e0cdad0615bf3bc9fc",
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header headerText="Authentication" />
          {this.renderContent()}
        </ScrollView>
      </View>
    );
  }
}

export default LoginScreen;
