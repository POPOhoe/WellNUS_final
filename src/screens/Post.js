import React, { useEffect, useState, useContext, useRef }from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import firebase from "../../firebase/fire"
import { Ionicons, Feather } from "@expo/vector-icons";
import { Avatar, Title, Caption } from 'react-native-paper';
import { AuthContext } from '../components/Context';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';

const Post = ({id, navigation, push }) => {

    const { getUsername } = useContext(AuthContext)

    const [data, setData] = useState({
        tag: '',
        title: '',
        post: '',
        likes: 0,
        likedUsers: '',
        user: '',
        comments: [],
        username: getUsername(),
        currentTime: moment().add(8, 'h').format("YYYYMMDD, hhmm a"),
        postTime: ''
    })

    const [postIndex, setPostIndex] = useState(0)

    const flatListRef = useRef()

    let test

    

    useEffect(() => {
        
      
        let err = null
        let myPost

        const getData = () => {
          try {
            firebase
              .database()
              .ref("forum")
              .on("value", (snapshot) => {
                const response = snapshot.val();
                if (response !== null) {
                  
                  Object.keys(response).forEach((key) => {
                    if (key === id) {
                        myPost = response[key]   
                    }
                  });
                }
                
              });
          } catch (error) {
            console.log(error.message);
            err = error            
          }
          
        
        }
        getData()
        let result = []
        if (myPost.comments !== undefined) {
          Object.keys(myPost.comments).forEach((key) => {
            const value = myPost.comments[key]
            result.unshift(value)
          });
        }
        
        setData({
            ...data,
            tag: myPost.tag,
            title: myPost.title,
            post: myPost.post,
            likes: myPost.likes.number,
            likedUsers: myPost.likes.users,
            user: myPost.user, 
            comments: result,
            postTime: myPost.time
        })
      }, []);

    const getItemLayout = (data, index) => {
      return {length: 300, offset: 300 * index, index}
    }

    const onViewableItemsChanged = (viewableItems, changed) => {
      // console.log("Visible items are", viewableItems);
      const currentIndex = viewableItems.viewableItems[0].index
      test = currentIndex
    }

    const likePost = async () => {
      console.log(data.username)
      try {        
        await firebase
          .database()
          .ref("/forum/" + id + '/likes/number')
          .set(data.likes + 1);
        await firebase
          .database()
          .ref("/forum/" + id + '/likes/users/' + data.username)
          .set('hello');
          console.log("post liked");
      } catch (error) {
        console.log("failed to like post");
        console.log(error.message);
      } 
  }

  const unlikePost = async () => {
    try {
      await firebase
        .database()
        .ref("/forum/" + id + '/likes/number')
        .set(data.likes - 1);
      await firebase
        .database()
        .ref("/forum/" + id + '/likes/users/' + data.username)
        .set(null);
        console.log("post unliked");
    } catch (error) {
      console.log("failed to unlike post");
      console.log(error.message);
    } 
  }

    return (
        <View style = {{flex: 1}}>
          <View style = {{flexDirection: 'row'}}>
            <TouchableOpacity
                activeOpacity = {0.7}
                onPress = {() => navigation.navigate('main')}
                style = {{flexDirection: 'row'}}
            >
                <Ionicons name="md-arrow-back-sharp" size={35} color="black" style = {{marginLeft: 10}} />
            </TouchableOpacity>

            {/* userprofile and shiz */}

          </View>
            {data.comments.length === 0 ?
              <View style = {{flex: 1}}>
                <ScrollView style = {{flex: 1}}>
                <View style = {{flexDirection: 'row', marginTop: 15, marginLeft: '2.5%' }}>
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
                          <Title style = {styles.tag}>{data.tag.toUpperCase()}</Title>
                        </View>
                      </View>
                      
                      <View>
                          <Caption style = {styles.caption}>
                            {data.user} ⚬ {moment(data.postTime, "YYYYMMDD, hhmm a")
                              .from(moment(data.currentTime, "YYYYMMDD, hhmm a"))
                            }
                          </Caption>
                      </View>
                      
                  </View>
                </View>

                 {/* the actual post */}

                <View style = {{marginTop: 15, width: '95%', marginLeft: '2.5%'}}>
                    <Text style = {{fontSize: 27, fontWeight: 'bold'}}>{data.title}</Text>
                </View>
                <View style = {styles.postStyle}>
                  <Text style = {{fontSize: 20}}>
                    {data.post}
                  </Text>

                  <View style = {{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 10}}>
                    
                    {/* like comments and stuff */}

                    {data.likes !== 0 && data.likedUsers !== undefined && data.likedUsers[data.username] !== undefined ?
                    <Animatable.View>
                      <TouchableOpacity 
                        style = {{marginRight: 10}}
                        onPress = {() => unlikePost()}
                      >
                        <Ionicons name="heart-sharp" size={30} color="red" />
                      </TouchableOpacity>
                    </Animatable.View> :
                    <Animatable.View>
                      <TouchableOpacity 
                        style = {{marginRight: 10}}
                        onPress = {() => likePost()}
                      >
                        <Feather name="heart" size={30} color="black" />
                      </TouchableOpacity>
                    </Animatable.View>
                    }
                    <Text style = {{fontSize: 20}}>{data.likes}</Text>
                    <TouchableOpacity 
                      style = {{flexDirection: 'row', borderColor: 'black', marginLeft: 50}}
                      activeOpacity = {0.7}
                    >
                      <View style = {{marginRight: 10}}>
                        <Feather name="message-square" size={24} color="black" />
                      </View>

                      <Text style = {{fontSize: 20}}>
                        {data.comments === undefined ?
                          '0 commments' :
                          Object.keys(data.comments).length === 1 ?
                          Object.keys(data.comments).length :
                          Object.keys(data.comments).length 
                        }
                      </Text>
                      
                    </TouchableOpacity>
                  </View>
                </View>
                <View style = {{alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: 30}}>
                  <Text style = {{fontSize: 20}}>Be the first to comment!</Text>
                </View>
                </ScrollView>
                <View style = {{justifyContent: 'flex-end'}}>
                  <View style = {{backgroundColor: 'white', height: 60, justifyContent: 'center'}}>
                    <TouchableOpacity 
                      style = {styles.addComment}
                      activeOpacity = {0.7}
                      onPress = {() => navigation.navigate('addComment')}
                    >
                      <Text style = {{fontSize: 20, color: 'grey', paddingLeft: 10}}>Add a comment</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View> :

              // have comments

              <View style = {{flex: 1}}>
              <FlatList 
              data = {data.comments}
              renderItem = {( {item, index} ) => {
                return (
                  index === 0 ?
                  <View style = {{backgroundColor: 'white'}}>

                    {/* userprofile and shiz */}

                    <View style = {{flexDirection: 'row', marginTop: 15, marginLeft: '2.5%' }}>
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
                              <Title style = {styles.tag}>{data.tag.toUpperCase()}</Title>
                            </View>
                          </View>
                          
                          <View>
                              <Caption style = {styles.caption}>
                                {data.user} ⚬ {moment(data.postTime, "YYYYMMDD, hhmm a")
                                  .from(moment(data.currentTime, "YYYYMMDD, hhmm a"))
                                }
                              </Caption>
                          </View>
                    
                      </View>
                    </View>
                  <View style = {{marginTop: 15, width: '95%', marginLeft: '2.5%'}}>
                      <Text style = {{fontSize: 27, fontWeight: 'bold'}}>{data.title}</Text>
                  </View>

                  {/* the actual post */}

                  <View style = {styles.postStyle}>
                    <Text style = {{fontSize: 20}}>
                      {data.post}
                    </Text>

                    {/* likes and comments and stuff */}

                    <View style = {{flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 10}}>
                      {data.likes !== 0 && data.likedUsers !== undefined && data.likedUsers[data.username] !== undefined ?
                      <Animatable.View>
                        <TouchableOpacity 
                          style = {{marginRight: 10}}
                          onPress = {() => unlikePost()}
                        >
                          <Ionicons name="heart-sharp" size={30} color="red" />
                        </TouchableOpacity>
                      </Animatable.View> :
                      <Animatable.View>
                        <TouchableOpacity 
                          style = {{marginRight: 10}}
                          onPress = {() => likePost()}
                        >
                          <Ionicons name="heart-outline" size={30} color="black" />
                        </TouchableOpacity>
                      </Animatable.View>
                      }
                      
                      <Text style = {{fontSize: 20}}>{data.likes}</Text>
                      

                      <TouchableOpacity 
                        style = {{flexDirection: 'row', borderColor: 'black', marginLeft: 50}}
                        activeOpacity = {0.7}
                      >
                        <View style = {{marginRight: 10}}>
                          <Feather name="message-square" size={24} color="black" />
                        </View>

                        <Text style = {{fontSize: 20}}>
                          {data.comments === undefined ?
                            '0 commments' :
                            Object.keys(data.comments).length === 1 ?
                            Object.keys(data.comments).length :
                            Object.keys(data.comments).length 
                          }
                        </Text>
                        
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style = {{height: 15, backgroundColor: '#f5f5f5', marginTop: 20}}>
                  </View>
                  <View>
                    <View style = {{flexDirection: 'row', marginTop: 15, height: 25, marginLeft: '2.5%' }}>
                      <Avatar.Image 
                          source = {{
                              uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                          }}
                          size = {50}
                      />
                      <View style = {{marginLeft: 15, flexDirection: 'column'}}>
                          <View>
                              <Text style = {styles.user}>{item.user}</Text>
                          </View>
                          
                          <View>
                              <Caption style = {styles.caption}>
                                {moment(item.time, "YYYYMMDD, hhmm a")
                                  .from(moment(data.currentTime, "YYYYMMDD, hhmm a"))
                                }
                              </Caption>
                          </View>
                          
                      </View>
                    </View>
                    <View style = {{marginLeft: '2.5%', width: '95%'}}>
                      <Text style = {{marginTop: 30, fontSize: 20}}>{item.comment}</Text>
                    </View>
                    <View style = {{height: 15, backgroundColor: '#f5f5f5', marginTop: 20}}>
                    </View>
                </View>
                </View> :

                // comments with index > 0
                
                <View style = {{backgroundColor: 'white'}}>
                  <View style = {{flexDirection: 'row', marginTop: 15, height: 25, marginLeft: '2.5%' }}>
                    <Avatar.Image 
                        source = {{
                            uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                        }}
                        size = {50}
                    />
                    <View style = {{marginLeft: 15, flexDirection: 'column'}}>
                        <View>
                            <Text style = {styles.user}>{item.user}</Text>
                        </View>
                        
                        <View>
                            <Caption style = {styles.caption}>
                              {moment(item.time, "YYYYMMDD, hhmm a")
                                .from(moment(data.currentTime, "YYYYMMDD, hhmm a"))
                              }
                            </Caption>
                        </View>
                        
                    </View>
                  </View>
                  <View style = {{marginLeft: '2.5%', width: '95%'}}>
                    <Text style = {{marginTop: 30, fontSize: 20}}>{item.comment}</Text>
                  </View>
                    <View style = {{height: 15, backgroundColor: '#f5f5f5', marginTop: 20}}>
                  </View>
                </View>
                
              )
              }}
                
              keyExtractor = {(item) => item.id}
            />
            <View style = {{justifyContent: 'flex-end', height: 60, backgroundColor: 'purple'}}>
              <View style = {{justifyContent: 'center', flex: 1, backgroundColor:'white'}}>
                <TouchableOpacity 
                  style = {styles.addComment}
                  activeOpacity = {0.7}
                  onPress = {() => navigation.navigate('addComment')}
                >
                  <Text style = {{fontSize: 20, color: 'grey', paddingLeft: 10}}>Add a comment</Text>
                </TouchableOpacity>
              </View>
            </View>
            </View>
            
            }

            

        </View>

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
    },
    postStyle: {
      width: '95%', 
      marginLeft: '2.5%', 
      marginTop: 10
      
    },
    user: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'black'
    },
    addComment: {
      height: 40,
      width: '95%',
      marginLeft: '2.5%',
      backgroundColor: '#f5f5f5',
      justifyContent: 'center',
      borderRadius: 10
    },
  });

export default Post
