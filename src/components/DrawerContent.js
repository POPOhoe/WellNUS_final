import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, drawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import {
    useTheme,
    Avatar, 
    Title, 
    Caption, 
    Paragraph, 
    Drawer, 
    Text, 
    TouchableRipple, 
    Switch
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Context';

const DrawerContent = (props) => {

    const paperTheme = useTheme()

    const { signOut, toggleTheme, getUsername } = useContext(AuthContext)

    const username = getUsername()

    return (
        <View style = {{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style = {styles.drawerContent}>
                    <View style = {styles.userInfoSection}>
                        <View style = {{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image 
                                source = {{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size = {50}
                            />
                            <View style = {{marginLeft: 15, flexDirection: 'column'}}>
                                {/* <Title style = {styles.title}>{username}</Title>
                                <Caption style = {styles.caption}>{username}</Caption> */}
                                <Text style = {styles.caption}>Signed in as:</Text>
                                <Text style = {styles.title}>{username}</Text>
                            </View>
                            
                        </View>
                    </View>
                    <Drawer.Section style = {styles.drawerSection}>
                        <Drawer.Item
                            icon = {({color, size}) => (
                                <Ionicons 
                                    name = 'home-outline'
                                    color = {color}
                                    size = {size}
                                />
                            )}
                            label = 'Home'
                            onPress = {() => {
                                props.navigation.navigate('home')
                            }}
                        />
                        {/* <Drawer.Item
                            icon = {({color, size}) => (
                                <MaterialCommunityIcons 
                                    name="account-check-outline" 
                                    color = {color}
                                    size = {size} 
                                />
                            )}
                            label = 'Profile'
                            onPress = {() => {
                                props.navigation.navigate('Profile')
                            }}
                        />
                        <Drawer.Item
                            icon = {({color, size}) => (
                                <Ionicons 
                                    name = 'settings-outline'
                                    color = {color}
                                    size = {size}
                                />
                            )}
                            label = 'Settings'
                            onPress = {() => {
                                props.navigation.navigate('Settings')
                            }}
                        /> */}
                    </Drawer.Section>
                    <Drawer.Section title = 'Preferences'>
                        <TouchableRipple onPress = {() => toggleTheme()} >
                            <View style = {styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents = 'none'>
                                    <Switch value = {paperTheme.dark} />
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section styles = {styles.bottomDrawerSection}>
                <Drawer.Item
                    icon = {({color, size}) => (
                        <MaterialIcons 
                            name = 'exit-to-app'
                            color = {color}
                            size = {size}
                        />
                    )}
                    label = 'Log Out'
                    onPress = {() => {signOut()}}

                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      marginTop: 10,
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  })

export default DrawerContent