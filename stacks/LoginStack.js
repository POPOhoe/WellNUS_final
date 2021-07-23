import React, { useContext }from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../src/screens/OnBoardingScreen'
import Onboard2 from '../src/screens/Onboard2'
import SignUp from '../src/screens/SignUp'
import Login from '../src/screens/Login'

const LoginStack = () => {

    const Stack = createStackNavigator()

    return (
        <Stack.Navigator 

            screenOptions = {{
                header: () => null
            }}>

            <Stack.Screen 
                name = 'onboard'
                component = {OnboardingScreen}
            />
        
            <Stack.Screen 
                name = 'onboard2'
                component = {Onboard2}
            />

            <Stack.Screen 
                name = 'Login'
                component = {Login}
            />

            <Stack.Screen 
                name = 'Signup'
                component = {SignUp}
            /> 
                    
        </Stack.Navigator> 
    )
}

export default LoginStack