import React, { useState } from 'react';
import {Text, View, StatusBar, Image, StyleSheet, Dimensions, TouchableOpacity  } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const OnboardingScreen = ({navigation}) => {

    const {height} = Dimensions.get("screen");

    return (

      <View style = {styles.container}>
        <StatusBar backgroundColor = '#009387' barStyle = 'light-content'/>
        <View style = {styles.header}>
          <Animatable.Image
            animation = 'bounceIn'
            duration = {1500}
            source = {require('./../../assets/images/chill_dribbble-01.webp')}
            style = {styles.logo}
            resizeMode = 'stretch'
          />
        </View>
        <Animatable.View 
          style = {styles.footer}
          animation = 'fadeInUpBig'
        >
          <Text style = {styles.title}>Start on your meditation journey with WellNUS TODAY!</Text>

          <View style = {styles.button}>
            <TouchableOpacity onPress = {() => navigation.navigate('onboard2')}>
              <LinearGradient
                colors = {['#088dc4', '#01ab9d']}
                style = {styles.signIn}
              >
                <Text style = {styles.textSign}>Next</Text>
                <MaterialIcons name="navigate-next" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
        </Animatable.View>
      </View>
    )
}

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: 150,
        height: 150
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });

export default OnboardingScreen
