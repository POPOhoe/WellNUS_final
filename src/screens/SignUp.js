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
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { AuthContext } from '../components/Context';
import Modal from "react-native-modal";
import { ActivityIndicator } from 'react-native-paper';


const SignUp = ({navigation}) => {

    const [username, setUsername] = useState('')
    
    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [showLoading, setShowLoading] = useState(false)

    const [data, setData] = useState({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
        checkUsername: false,
        noUsername: true,
        check_textInputChange: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true,
        isValid: true,
        error: null
    })

    const { signUp } = useContext(AuthContext)

    const { displayError } = useContext(AuthContext)

    const { setUser } = useContext(AuthContext)


    const enterUsername = (val) => {
            
        let invalid = false

        firebase  
            .database()
            .ref('/users')
            .on("value", (snapshot) => {
                const response = snapshot.val();
                if (response !== null) {
                    Object.keys(response).forEach((key) => {
                        if(key === val) {
                            console.log('im here')
                            invalid = true
                            
                        } else {
                            invalid = false
                        }
                    });
                    
                }
            });
    
        
        if (val.length !== 0) {
            if (invalid) {
                console.log('hello')
                setData({
                    ...data,
                    checkUsername: false,
                    noUsername: false
                })
            } else {
                setData({
                    ...data,
                    username: val,
                    checkUsername: true,
                    noUsername: false
                })
            }
        } else {
            setData({
                ...data,
                username: val, 
                checkUsername: false,
                noUsername: true
            })
        }
        
        
    }

    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                email: val, 
                check_textInputChange: true
            })
        } else {
            setData({
                ...data,
                email: val, 
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

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirmPassword: val
        })
    }


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
        })
    }

    const register = async() => {
        setData({
            ...data, 
            error: null,
        })
        if (data.password !== null && data.email !== null && data.username !== null) {
            console.log('hi')
            if (data.password === data.confirmPassword) {
                try {
                    
                    await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                    await AsyncStorage.setItem('userToken', data.username)
                    await firebase
                        .database()
                        .ref("/users/" + data.username)
                        .set({
                            email: data.email
                        })
                    setUser(data.username)
                } catch (err) {
                    const errorMessage = err.message
                    setData({
                        ...data,
                        error: errorMessage
                    })
                }
                
            } else {
                setData({
                ...data,
                    error: 'Passwords do not match',
                    isValid: false
                })
            }
        } else {
            setData({
                ...data,
                error: 'Please fill up all the fields',
                isValid: false
            })
        }
    }

    const updateError = () => {
        const err = displayError()
        setData({
            ...data,
            error: err
        })
        
    }

    return (

        <View style = {[styles.container]}>
            <StatusBar backgroundColor = '#009387' barStyle = 'light-content'/>
            <View style = {styles.header}>
                <Text style = {styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View 
                animation = 'fadeInUpBig'
                style = {styles.footer}
            >
                <Text style = {styles.text_footer}>Username</Text>
                <View style = {styles.action}>
                    <FontAwesome name="user-o" size={20} color="#05375a" />   
                    <TextInput 
                        placeholder = 'Create your username'
                        style = {styles.textInput}
                        autoCapitalize = 'none'
                        onChangeText = {(val) => enterUsername(val)}
                    />
                    {data.checkUsername ?
                        <Animatable.View 
                            animation = 'bounceIn'
                        >
                            <Feather name = "check-circle" size = {20} color = "green" />
                        </Animatable.View>
                        
                    : null }
                    
                    
                </View>
                <View style = {{height: 35}}>
                {!data.checkUsername && !data.noUsername?
                    <View>
                        <Text style = {{color: 'red'}}>Username in use</Text>
                    </View> :
                        null
                }
                </View>
                
               

                <Text style = {[styles.text_footer, {marginTop: 0}]}>Email</Text>
                <View style = {styles.action}>
                    <FontAwesome name="user-o" size={20} color="#05375a" />   
                    <TextInput 
                        placeholder = 'Enter your Email'
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

                <Text style = {[styles.text_footer, {marginTop: 35}]}>Confirm Password</Text>
                <View style = {styles.action}>
                    <Feather name="lock" size={20} color="#05375a" />   
                    <TextInput 
                        placeholder = 'Confirm your Password'
                        style = {styles.textInput}
                        autoCapitalize = 'none'
                        secureTextEntry = {data.confirmSecureTextEntry}
                        onChangeText = {(val) => handleConfirmPasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress = {() => updateConfirmSecureTextEntry()}
                    >
                        {data.confirmSecureTextEntry ?
                            <Feather name = "eye-off" size = {20} color = "grey" />
                            :
                            <Feather name = "eye" size = {20} color = "grey" />
                        }
                        
                    </TouchableOpacity>
                </View>

                {data.isValid ? null : 
                <Animatable.View
                    animation = 'fadeInLeft'
                    duration = {500}
                >
                    <Text style = {styles.errorMsg}>{data.error}</Text>
                </Animatable.View>
                }

                <View style = {styles.button}>
                    <TouchableOpacity
                        style = {styles.signIn}
                        onPress = {() => {
                            register()
                        }}
                    >
                        <LinearGradient
                            colors = {['#08d4c4', '#01ab9d']}
                            style = {styles.signIn}
                        >
                            <Text style = {[styles.textSign, {color: 'white'}]}>Sign Up</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress = {() => navigation.navigate('Login')}
                        style = {[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1, 
                            marginTop: 15
                        }]}
                    >
                    
                        <Text style = {[styles.textSign, {color: 'black'}]}>
                            Already have an account? Click here to sign in.
                        </Text>
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
        backgroundColor: '#009387'
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
        marginTop: 50
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


export default SignUp