import React, { useState } from 'react';
import {Text, View, StatusBar, Image, StyleSheet, Dimensions, TouchableOpacity  } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const Onboard2 = ({navigation}) => {

    const {height} = Dimensions.get("screen");

    const height_logo = height * 0.28;

    return (

      <View style = {styles.container}>
        <StatusBar backgroundColor = '#009387' barStyle = 'light-content'/>
        <View style = {styles.header}>
          <Animatable.Image
            animation = 'bounceIn'
            duration = {1500}
            source = {require('./../../assets/images/Onboarding-img1.jpeg')}
            style = {styles.logo}
            resizeMode = 'stretch'
          />
        </View>
        <Animatable.View 
          style = {styles.footer}
          animation = 'fadeInUpBig'
        >
          <Text style = {styles.title}>Connect with your peers with WellNUS through the forum!</Text>
          <Text style = {styles.text}>Sign in with account</Text>
          <View style = {styles.buttons}>
            <View style = {styles.button}>
                <TouchableOpacity onPress = {() => navigation.navigate('onboard')}>
                <LinearGradient
                    colors = {['#088dc4', '#01ab9d']}
                    style = {styles.goBack}
                >
                    <MaterialIcons name="navigate-before" size={20} color="#fff" />
                    <Text style = {styles.textSign}>Back</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style = {styles.button2}>
                <TouchableOpacity onPress = {() => navigation.navigate('Login')} >
                    <LinearGradient
                        colors = {['#088dc4', '#01ab9d']}
                        style = {styles.signIn}
                    >
                        <Text style = {styles.textSign}>Get Started</Text>
                        <MaterialIcons name="navigate-next" size={20} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    button2: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    goBack: {
        width: 150, 
        height: 40,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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

export default Onboard2