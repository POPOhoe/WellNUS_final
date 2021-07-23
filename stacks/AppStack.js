import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components";
import { Homescreen } from "../src/screens/Homescreen";
import { theme } from "../src/infrastructure/theme";

import { Text, Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from '@react-navigation/drawer';

import { SafeArea } from "../src/components/utility/Safe-Area";

import { MeditationScreenPart2 } from "../src/screens/MeditationScreenPart2";

import DrawerContent from "../src/components/DrawerContent";
import MoodTracker from "../src/screens/MoodTracker";
import Forum from "../src/screens/Forum"
import AddPost from "../src/screens/AddPost";
import Post from "../src/screens/Post";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather
} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

const ForumScreen = () => <Text>Soon to be implemented in milestone 3! 🙂</Text>;
const MoodTrackingScreen = () => <Text>Mood tracking</Text>;

import {
  useFonts as useSans,
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_300Light,
} from "@expo-google-fonts/open-sans";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

const AppStack = () => {
  const [OpenSansLoaded] = useSans({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_300Light,
  });

  const [LatoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!OpenSansLoaded || !LatoLoaded) {
    return null;
  }

    const tabNavigator = () => {
        return (
            
            <>
            <ThemeProvider theme={theme}>
                {Platform.OS === 'ios' ?
                <SafeArea>
                    
                    <Tab.Navigator
                    style={{ innerHeight: 1000 }}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "MoodTracking") {
                            iconName = "notebook";
                            return (
                            <MaterialCommunityIcons
                                name="notebook"
                                size={size}
                                color={color}
                            />
                            );
                        } else if (route.name === "upload") {
                            return (
                                <Feather name="plus-circle" size={24} color="black" />
                            )
                        } else if (route.name === "Meditation") {
                            iconName = "meditation";
                            return (
                            <Ionicons name="heart-circle" size={size} color={color} />
                            );
                        } else if (route.name === "Forum") {
                            iconName = "forum-outlined";
                            return (
                            <MaterialCommunityIcons
                                name="forum"
                                size={size}
                                color={color}
                            />
                            );
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: "#03A89E",
                        inactiveTintColor: "gray",
                    }}
                    >
                    <Tab.Screen name="Home" component={Homescreen} />
                    <Tab.Screen name="Meditation" component={MeditationScreenPart2} />
                    {/* <Tab.Screen name="post" component = {Post} />  */}
                    <Tab.Screen name="Forum" component={Forum} />
                    <Tab.Screen name="MoodTracking" component={MoodTracker} />
                    </Tab.Navigator>
                
                </SafeArea> :
                
                <Tab.Navigator
                    style={{ innerHeight: 1000 }}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "MoodTracking") {
                            iconName = "notebook";
                            return (
                            <MaterialCommunityIcons
                                name="notebook"
                                size={size}
                                color={color}
                            />
                            );
                        } else if (route.name === "upload") {
                            return (
                                <Feather name="plus-circle" size={24} color="black" />
                            )
                        } else if (route.name === "Meditation") {
                            iconName = "meditation";
                            return (
                            <Ionicons name="heart-circle" size={size} color={color} />
                            );
                        } else if (route.name === "Forum") {
                            iconName = "forum-outlined";
                            return (
                            <MaterialCommunityIcons
                                name="forum"
                                size={size}
                                color={color}
                            />
                            );
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: "#03A89E",
                        inactiveTintColor: "gray",
                    }}
                    >
                    <Tab.Screen name="Home" component={Homescreen} />
                    <Tab.Screen name="Meditation" component={MeditationScreenPart2} />
                    {/* <Tab.Screen name="post" component = {Post} />  */}
                    <Tab.Screen name="Forum" component={Forum} />
                    <Tab.Screen name="MoodTracking" component={MoodTracker} />
                </Tab.Navigator>
                
                }
                
            </ThemeProvider>
            <ExpoStatusBar style="auto" />
            </>
        )
    }

    return (
        <Drawer.Navigator drawerContent = {props => <DrawerContent {...props} />}>
            <Drawer.Screen name = 'home' component = {tabNavigator} />
        </Drawer.Navigator>
    )
}

export default AppStack