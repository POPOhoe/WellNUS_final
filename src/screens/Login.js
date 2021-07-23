import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useContext} from 'react'
import firebase from './../../firebase/fire';
import {
    Text, 
    View, 
    StatusBar, 
    Image, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    Platform,
    TextInput  
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { color } from 'react-native-reanimated';
import { AuthContext } from '../components/Context';
import Modal from "react-native-modal";
import { ActivityIndicator } from 'react-native-paper';

const Login = ({navigation}) => {

    const [data, setData] = useState({
        username: '',
        email: 'hhahaha',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        error: null,
        isValidUser : true
    })
    
    const [showLoading, setShowLoading] = useState(false)

    const { signIn } = useContext(AuthContext)
    
    const { displayError } = useContext(AuthContext)

    const { setUser } = useContext(AuthContext)

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                username: val, 
                check_textInputChange: true
            })
        } else {
            setData({
                ...data,
                username: val, 
                check_textInputChange: false
            })
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        })
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const getEmail = async () => {
        console.log('getemail running')
        await firebase
            .database()
            .ref('/users/' + data.username)
            .on("value", (snapshot) => {
                const response = snapshot.val();
                if (response !== null) {
                    // email = response.email
                    // console.log(email + 'lol')
                    if (response.email !== undefined) {
                        console.log('getemail finshed')
                        setData({
                            ...data,
                            email: response.email
                        })
                    } else {
                        console.log('getemail finished')
                        setData({
                            ...data,
                            email: 'failed'
                        })
                    }
                }
            });
    }
    // const test = () => {
    //     loginHandler()
    //     testFunc()
    // }

    const login = async (email) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, data.password)
        } catch (error) {
            console.log(error)
            const errorMessage = error.message
            setData({
                ...data,
                error: errorMessage,
                isValidUser: false
            })
        } finally {
            if (data.error === null) {
                console.log('success')
                await AsyncStorage.setItem('userToken', data.username) 
                setUser(data.username)
            }
        }
    }


    const loginHandler = async () => {
        // console.log(data.email)
        // console.log(data.password)
            let email
            // console.log('hi')
            // console.log(email)
            // console.log('hi')
            setShowLoading(true)
            try {
                await firebase
                    .database()
                    .ref('/users/' + data.username)
                    .on("value", (snapshot) => {
                        const response = snapshot.val();
                        if (response !== null) {
                            console.log('have')
                            email = response.email
                            
                        }
                    });
                console.log(email)
                
                setTimeout(async () => {
                    try {

                        

                        await firebase.auth().signInWithEmailAndPassword(email, data.password)
                        
                        
                        await AsyncStorage.setItem('userToken', data.username)

                        setShowLoading(false)
                        
                        setUser(data.username)                     
                        
                    } catch (error) {
                        console.log(error)
                        const errorMessage = error.message
                        setData({
                            ...data,
                            error: errorMessage,
                            isValidUser: false
                        })
                        setShowLoading(false)
                    } 
                }, 1000);
                
            } catch (error) {
                console.log(error)
                console.log('error in login handler')
                const errorMessage = error.message
                setData({
                    ...data,
                    error: errorMessage,
                    isValidUser: false
                })
                setShowLoading(false)
            } 
        
        
        
    }

    return ( 

        <View style = {[styles.container]}>
            <StatusBar backgroundColor = '#009387' barStyle = 'light-content'/>
            <View style = {styles.header}>
                <Text style = {styles.text_header}>Welcome</Text>
            </View>
            <Animatable.View 
                animation = 'fadeInUpBig'
                style = {styles.footer}
            >
                <Text style = {styles.text_footer}>Username</Text>
                <View style = {styles.action}>
                    <FontAwesome name="user-o" size={20} color="#05375a" />   
                    <TextInput 
                        placeholder = 'Enter your username'
                        style = {styles.textInput}
                        autoCapitalize = 'none'
                        onChangeText = {(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View 
                            animation = 'bounceIn'
                        >
                            <Feather name = "check-circle" size = {20} color = "green" />
                        </Animatable.View>
                        
                    : null }
                    
                </View>

                <Text style = {[styles.text_footer, {marginTop: 35}]}>Password</Text>
                <View style = {styles.action}>
                    <Feather name="lock" size={20} color="#05375a" />   
                    <TextInput 
                        placeholder = 'Enter your Password'
                        style = {styles.textInput}
                        autoCapitalize = 'none'
                        secureTextEntry = {data.secureTextEntry}
                        onChangeText = {(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress = {() => updateSecureTextEntry()}
                    >
                        {data.secureTextEntry ?
                            <Feather name = "eye-off" size = {20} color = "grey" />
                            :
                            <Feather name = "eye" size = {20} color = "grey" />
                        }
                        
                    </TouchableOpacity>
                </View>
        
                {data.isValidUser ? null : 
                <Animatable.View
                    animation = 'fadeInLeft'
                    duration = {500}
                >
                    <Text style = {styles.errorMsg}>Either username or password incorrect</Text>
                </Animatable.View>
                }

                <View style = {styles.button}>
                    <TouchableOpacity 
                        onPress = {() => {
                            loginHandler()
                            
                        }}
                        style = {styles.signIn}
                    >
                        <LinearGradient
                            colors = {['#08d4c4', '#01ab9d']}
                            style = {styles.signIn}
                        >
                            <Text style = {[styles.textSign, {color: '#fff'}]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {() => navigation.navigate('Signup')}
                        style = {[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1, 
                            marginTop: 15
                        }]}
                    >
                        <Text style = {[styles.textSign, {color: '#009387'}]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
            <Modal  
                isVisible={showLoading}
                style={{ backgroundColor: "transparent" }}
            >
                <View
                    style = {{
                        backgroundColor: 'transparent',
                        alignItems: 'center',
                        height: '30%',
                        borderRadius: 20,
                        flex: 1, 
                        justifyContent: 'center'
                    }}
                >
                    <ActivityIndicator size="large" />
                </View>
            </Modal>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#009387',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 25
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    showError: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    }
});

export default Login