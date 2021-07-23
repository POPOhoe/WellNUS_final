import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker'
import firebase from "./../../firebase/fire";
import Modal from "react-native-modal";
import { AuthContext } from '../components/Context';
import moment from 'moment';

const AddPost = ({navigation}) => {
    const { getUsername } = useContext(AuthContext)

    const [newPost, setNewPost] = useState({
        tag: 'Question',
        title: '',
        post: '',
        likes: 0,
        user: getUsername(),
        id: ''
    })

    const [showLoading, setShowLoading] = useState(false)
    
    const [showFail, setShowFail] = useState(false)

    const updateTitle = async (val) => {
        setNewPost({
            ...newPost,
            title: val
        })
    }

    const updatePost = async (val) => {
        setNewPost({
            ...newPost,
            post: val
        })
    }

    const upload = () => {
        let key
        key = firebase.database().ref().push().key
        const currentTime = moment().add(8, 'h').format("YYYYMMDD, hhmm a")
        try {
            firebase
              .database()
              .ref("/forum/" + key)
              .set({
                tag: newPost.tag,
                title: newPost.title,
                post: newPost.post,
                likes: {number: 0},
                user: newPost.user,
                id: key,
                time: currentTime
              });

            setNewPost({
                ...newPost,
                tag: 'Question',
                title: '',
                post: '',
            })

            navigation.navigate('main')
            console.log("post uploaded");
          } catch (error) {
            console.log("upload failed");
            setShowFail(true)
            console.log(error.message);
          } 

    }

    return (
        <View style = {{flex: 1}}>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity
              onPress = {() => {
                navigation.navigate('main')
              }}
            >
              <Feather name="x" size={40} color="black" style = {{marginLeft: 10}} />
            </TouchableOpacity>
            <Text style = {{fontSize: 25}}>
              Create Post
            </Text>

            {newPost.title.length === 0 ?
                <Text style = {{fontSize: 20, marginRight: 20, color: 'grey'}}>Post</Text> :
                <TouchableOpacity
                    onPress = {() => {
                        setShowLoading(true)
                        setTimeout(() => {
                        upload()}, 1000)
                    }
                    }
                >
                    <Text style = {{fontSize: 20, marginRight: 20}}>Post</Text>
                </TouchableOpacity>
            }
            
            
          </View>
        
          <View style = {{
              height: 40, 
              borderTopWidth:1, 
              borderColor: 'grey', 
              justifyContent: 'center',
              marginTop: 10  
            }}>
            <Picker
                style = {{height: 100}}
                mode = 'dropdown'
                selectedValue={newPost.tag}
                onValueChange={(itemValue, itemIndex) => {
                    setNewPost({
                        ...newPost,
                        tag: itemValue
                    })
                }
                    
                }>
                <Picker.Item label="Question" value="Question" />
                <Picker.Item label="Opinion/Thoughts" value="Opinion/Thoughts" />
                <Picker.Item label="Inspiration/Encouragement" value="Inspiration/Encouragement" />
                <Picker.Item label="Venting" value="Venting" />
                <Picker.Item label="Good News/Happy" value="Good News/Happy" />
                <Picker.Item label="Need Support" value="Need Support" />
            </Picker>
          </View>

          <View style = {{
            borderBottomWidth: 1, 
            borderTopWidth: 1, 
            borderColor: 'grey', 
            marginTop: 10,
            height: 50,
            justifyContent: 'center',
          }}>
            <TextInput
              onChangeText = {(val) => updateTitle(val)}  
              style = {{paddingLeft: 10, fontSize: 20}}
              placeholder = 'Title'
              multiline = {true}
              textAlignVertical = "top"
            />
          </View>

          
          <TextInput
            onChangeText = {(val) => updatePost(val)}
            style = {{paddingLeft: 10, fontSize: 20, height: '80%'}}
            placeholder = 'Your post (optional)'
            multiline = {true}
            textAlignVertical = "top"
          />
          

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

          <Modal  
            isVisible={showFail}
            style={{ backgroundColor: "transparent" }}
          >
            <View
                style = {{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    height: '30%',
                    borderRadius: 20,
                    flex: 1, 
                    justifyContent: 'center'
                }}
            >
                <Text>Upload failed, please try again</Text>
            </View>
          </Modal>
          
        </View>
        
      )
}

export default AddPost
