import React, {useState, useEffect, useContext, useRef} from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Card, Paragraph, Avatar, Title, Caption } from 'react-native-paper';
import { Feather, Ionicons } from '@expo/vector-icons';
import firebase from "./../../firebase/fire";
import { createStackNavigator } from '@react-navigation/stack';
import AddPost from './AddPost';
import Post from './Post';
import AddComment from './AddComment';
import { AuthContext } from '../components/Context';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

const Forum = ({navigation}) => {

  const { getUsername } = useContext(AuthContext)

  const [data, setData] = useState([])

  const [postId, setPostId] = useState()

  const [postIndex, setPostIndex] = useState(0)

  const [secondIndex, setSecondIndex] = useState(0)

  const [username, setUsername] = useState(getUsername())

  const currentTime = moment().add(8, 'h').format("YYYYMMDD, hhmm a")

  const flatListRef = useRef()

  let test;


  useEffect(() => {
    const getData = () => {
      try {
        firebase
          .database()
          .ref("forum")
          .on("value", (snapshot) => {
            const response = snapshot.val();
            if (response !== null) {
              let result = [];
              Object.keys(response).forEach((key) => {
                const value = response[key]
                value.key = key
                result.unshift(value)
              });
              setData(result);
            }
          });
          // if (myFlatList !== null) {
          //   myFlatList.scrollToIndex({animated: true, index: 2})
          //   console.log('scroll??')
          // }
          
      } catch (error) {
        console.log(error.message);
      } finally {
        console.log('yes im rerendering :(')
        // flatListRef.current.scrollToIndex({animated: true, index: -2})
      }
    };
    getData();
  }, []);
  

    const Stack = createStackNavigator()

    const getItemLayout = (data, index) => {
      return {length: 300, offset: 300 * index, index}
    }

    const onViewableItemsChanged = (viewableItems, changed) => {
      // console.log("Visible items are", viewableItems);
      const currentIndex = viewableItems.viewableItems[0].index
      test = currentIndex
    }

    const likedBefore = (post) => {
      const likers = post.likes.users
      if (likers !== undefined) {
        Object.keys(post.likes.users).forEach((key) => {
          if (key === username) {
            console.log('yes')
            return true
          } 
          console.log('noyes')
          return false
        })
        
      } else {
        console.log('hello')
        return false
      }
      
    }

    function mainPage() {
      
      return (
        <View style = {styles.container}>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style = {{fontSize: 40, marginLeft: 20}}>WellNUS Forum</Text>
            <TouchableOpacity
              onPress = {() => {
                console.log(test)
                setPostIndex(test)
                navigation.navigate('add')                
              }} 
            >
              <Feather name="plus-square" size={40} color="black" style = {{marginRight: 20}} />
            </TouchableOpacity>
          </View>
            <FlatList
                data = {data}
                ref = {flatListRef}
                getItemLayout = {getItemLayout}
                initialScrollIndex = {postIndex}
                onViewableItemsChanged = {onViewableItemsChanged}
                renderItem = {({ item, index }) => {
                    return (
                        <TouchableOpacity 
                          style = {styles.card} activeOpacity = {0.6}
                          onPress = {() => {
                            setPostId(item.key)
                            setPostIndex(index)
                            navigation.navigate('post')
                          }}  
                        >
                          {/* userprofile and shiz */}
                          <View style = {{flexDirection: 'row', marginTop: 15, height: 25}}>
                            <Avatar.Image 
                              source = {{
                                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                              }}
                              size = {50}
                            />
                            <View style = {{marginLeft: 15, flexDirection: 'column'}}>
                              <View style = {{
                                alignItems: 'center',
                                flexDirection: 'row'
                              }}>
                                <View style = {{
                                  backgroundColor: '#d2691e', 
                                  borderRadius: 15,
                                 
                                }}>
                                  <Title style = {styles.tag}>{item.tag.toUpperCase()}</Title>
                                </View>
                              </View>
                              
                              <View>
                                <Caption style = {styles.caption}>
                                  {item.user} ⚬ {moment(item.time, "YYYYMMDD, hhmm a")
                                  .from(moment(currentTime, "YYYYMMDD, hhmm a"))
                                }
                                  </Caption>
                              </View>
                              
                            </View>
                          </View>

                          {/* the actual post */}
                          
                          <View style = {{height: 150, marginTop: 30, marginLeft: 5}}>
                            <Text style = {{
                              fontSize: 25,
                              fontWeight: 'bold',
                              marginTop: 5
                            }}>
                              {item.title}
                            </Text>
                            <Text style = {{fontSize: 20}}>
                              {item.post.length > 230 ?
                                item.post.substring(0, 227) + '...' :
                                item.post
                              }
                            </Text>
                          </View>

                          {/* like comments and stuff */}

                          <View style = {{
                            height: 50, 
                            marginTop: 15, 
                            marginLeft: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around'
                            }}>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                              <Text style = {{fontSize: 22, marginRight: 10}}>
                                {item.likes.number >= 1000 ?
                                  (item.likes.number / 1000).toFixed(1) + 'k' :
                                  item.likes.number
                                }
                                
                              </Text>
                              {item.likes.users !== undefined && item.likes.users[username] !== undefined ?
                                <Animatable.View 
                                  animation = 'bounceIn'
                                >
                                <TouchableOpacity 
                                  style = {{marginRight: 10}}
                                  onPress = {() =>  {
                                    unlikePost(item, index)   
                                  }}
                                > 
                                  <Ionicons name="heart-sharp" size={30} color="red" />
                                </TouchableOpacity>
                                </Animatable.View> :
                                <Animatable.View 
                                  animation = 'bounceIn'
                                >
                                <TouchableOpacity 
                                  style = {{marginRight: 10}}
                                  onPress = {() =>  {
                                    likePost(item, index)   
                                  }}
                                > 
                                  <Ionicons name="heart-outline" size={30} color="black" />
                                </TouchableOpacity>
                                </Animatable.View> 
                              }
                              
                            </View>
                            
                            <View style  = {{borderColor: 'black'}}>
                            <TouchableOpacity 
                              style = {{flexDirection: 'row', borderColor: 'black', alignItems: 'center'}}
                              activeOpacity = {0.7}
                            >
                              <Text style = {{fontSize: 22}}>
                                {item.comments === undefined ?
                                  '0 commments' :
                                  Object.keys(item.comments).length === 1 ?
                                  Object.keys(item.comments).length + ' comment' :
                                  Object.keys(item.comments).length + ' comments'
                                }
                              </Text>
                              <View style = {{ marginLeft: 10}}>
                                <Feather name="message-square" size={30} color="black" />
                              </View>
                            </TouchableOpacity>
                            </View>
                          </View>
                        </TouchableOpacity>                        
                    )
                }}
                keyExtractor = {item => item.id}
            />   
        </View>
      )
    }

    const selectedPost = () => {
      return (
        <Post 
          id = {postId} 
          navigation = {navigation} 
        />
      )
    }

    const addComment = () => {
      return (
        <AddComment postId = {postId} navigation = {navigation} />
      )
    }

    const likePost = async (post, index) => {
      console.log(username)
      try {
        // let comms = null
        // if (post.comments !== undefined) {
        //   comms = post.comments
        // }
        setPostIndex(index)
        
        await firebase
          .database()
          .ref("/forum/" + post.id + '/likes/number')
          .set(post.likes.number + 1);
        await firebase
          .database()
          .ref("/forum/" + post.id + '/likes/users/' + username)
          .set('hello');
          console.log("post liked");
      
       
      } catch (error) {
        console.log("failed to like post");
        console.log(error.message);
      } 
  }

  const unlikePost = async (post, index) => {
    try {
    
      setPostIndex(index)

      await firebase
        .database()
        .ref("/forum/" + post.id + '/likes/number')
        .set(post.likes.number - 1);
      await firebase
        .database()
        .ref("/forum/" + post.id + '/likes/users/' + username)
        .set(null);
        console.log("post unliked");
     
     
    } catch (error) {
      console.log("failed to unlike post");
      console.log(error.message);
    } 
}

  const scrollTo = (index) => {
    console.log('scrolling')
    flatListRef.current.scrollToIndex({index: index, animated: true})
  }

    return (
        <Stack.Navigator
          screenOptions = {{
            header: () => null,
            tabBarVisible: true
          }}
        >
          <Stack.Screen name = 'main' component = {mainPage} />
          <Stack.Screen name = 'add' component = {AddPost} />
          <Stack.Screen name = 'post' component = {selectedPost} />
          <Stack.Screen name = 'addComment' component = {addComment} />
        </Stack.Navigator>
      ) 
        
    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tag: {
      marginLeft: 10,
      marginRight: 10,
      fontWeight: 'bold',
      fontSize: 16,
      color: 'black'
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      marginBottom: 3,
      fontWeight: 'bold',
      color: 'black',
    },
    caption: {
      fontSize: 16,
    },
    card: {
      height: 300,
      width: '95%',
      marginLeft: '2.5%',
      backgroundColor: 'white'
    }
  });



export default Forum