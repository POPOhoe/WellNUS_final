import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from './src/components/Context';
import { 
  NavigationContainer, 
  DarkTheme as NavigationDarkTheme, 
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import { 
  Provider as PaperProvider, 
  DarkTheme as PaperDarkTheme, 
  DefaultTheme as PaperDefaultTheme
} from 'react-native-paper'
import firebase from './firebase/fire';
import * as Font from 'expo-font'
import moment from 'moment';
import LoginStack from './stacks/LoginStack'
import AppStack from './stacks/AppStack';
import { LogBox } from 'react-native';

const App = () => {

  const [isLoading, setIsLoading] = useState(true)

  const [userToken, setUserToken] = useState('')

  const [error, setError] = useState(null)

  const [darkTheme, setDarkTheme] = useState(false)

  const [date, setDate] = useState(moment())

  const authContext = useMemo(() => ({
    setUser: (username) => {
      setUserToken(username)
    },
    signOut: async() => {
      await AsyncStorage.removeItem('userToken')
      setUserToken('')
    },
    // signUp: async (email, password) => {
    //   try {
    //     setError('')
    //     await firebase.auth().createUserWithEmailAndPassword(email, password)
    //     await AsyncStorage.setItem('userToken', 'loggedIn')
    //     setUserToken('email')
    //   } catch (err) {
    //     setError(err.message)
    //   }
    // },
    displayError: () => {
      if (error) {
        console.log('theres an error')
        return JSON.stringify(error)
      } else {
        console.log('theres no error')
        return null
      }      
    },
    toggleTheme: () => {
      
      setDarkTheme(!darkTheme)  
      if (darkTheme) {
        console.log('yes')
      } else {
        console.log('no')
      }
    },
    selectDate: (date) => {
      setDate(moment(date))
    },
    returnDate: () => {
      return {date}
    },
    getUsername: () => {

      return (
        userToken
      )
    }
    
  }))

  const load = async() => {
    try {
      const token = await AsyncStorage.getItem('userToken')
      if (token !== null) {
        setUserToken(token)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const getFonts = async() =>{ 
    return (
      await Font.loadAsync({
        'RobotoSlab': require('./assets/fonts/RobotoSlab-VariableFont_wght.ttf')
      })
    )
  }

  useEffect(() => {
    load()
    getFonts()
    setTimeout(() => { setIsLoading(false) }, 1000)
  }, [])

  if (isLoading) {
    return (
      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size = 'large' color = 'black'/>
      </View>
    )
  }

  const customDefaultTheme = {
    ...NavigationDefaultTheme, 
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      backgroud: '#ffffff',
      text: '#333333'
    }
  }

  const customDarkTheme = {
    ...NavigationDarkTheme, 
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      backgroud: '#333333',
      text: '#ffffff'
    }
  }
  
  const theme = darkTheme ? customDarkTheme : customDefaultTheme
  
  LogBox.ignoreAllLogs()

  return (
    <PaperProvider theme = {theme}>    
      <StatusBar hidden = {true}/>
      <AuthContext.Provider value = {authContext}>
        <NavigationContainer theme = {theme}>
          {userToken ?
            <AppStack /> :
            <LoginStack />
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
     
  )
}

export default App


