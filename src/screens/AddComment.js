import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import firebase from "./../../firebase/fire";
import Modal from "react-native-modal";
import moment from 'moment';
import { AuthContext } from '../components/Context';


const AddComment = ({ postId, navigation }) => {

    const { getUsername } = useContext(AuthContext)

    const [newComment, setNewComment] = useState({
        comment: '',
        id: '',
        time: moment(),
        user: getUsername(),
        postId: postId       
    })

    const [showLoading, setShowLoading] = useState(false)
    
    const [showFail, setShowFail] = useState(false)

    const updatePost = async (val) => {
        setNewComment({
            ...newComment,
            comment: val
        })
    }

    const upload = () => {
        let key
        key = firebase.database().ref().push().key
        
        const currentTime = moment().add(8, 'h').format("YYYYMMDD, hhmm a")
        console.log('stringified moment')
        console.log(currentTime)
        console.log('moment time')
        // console.log(moment().format("YYYYMMDD"))
        console.log(moment(currentTime, "YYYYMMDD, hhmm a"))
        console.log(moment(currentTime, "YYYYMMDD, hhmm a").from(moment("20210718, 0225 pm", "YYYYMMDD, hhmm a")))
        try {
          navigation.navigate('post')
          firebase
            .database()
            .ref("/forum/" + postId + '/comments/' + key)
            .set({
              comment: newComment.comment,
              id: key,
              time: currentTime,
              user: newComment.user 
            });

          setNewComment({
              ...newComment,
              comment: '',
              id: '',
          })  
          console.log("comment uploaded");
        } catch (error) {
          console.log("comment upload failed");
          setShowFail(true)
          console.log(error.message);
        } 

    }

    return (
        <View style = {{flex: 1}}>
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity
              onPress = {() => {
                navigation.navigate('post')
              }}
            >
              <Feather name="x" size={40} color="black" style = {{marginLeft: 10}} />
            </TouchableOpacity>
            <Text style = {{fontSize: 25}}>
            {/* {moment().diff(newComment.time)} */}
              Add comment
            </Text>

            {newComment.comment.length === 0 ?
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
        
          {/* <View style = {{
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
          </View> */}

          {/* <View style = {{
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
          </View> */}

          <View style = {styles.inputView}>
            <TextInput
                onChangeText = {(val) => updatePost(val)}
                style = {{fontSize: 20, flex: 1, paddingTop: 10}}
                placeholder = 'Your comment'
                multiline = {true}
                textAlignVertical = "top"
            />
          </View>
          
          

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
            <TouchableOpacity
                style = {{
                    backgroundColor: 'white',
                    alignItems: 'center',
                    height: '30%',
                    borderRadius: 20,
                    flex: 1, 
                    justifyContent: 'center'
                }}
                activeOpacity = {0.95}
                onPress = {() => {
                    setShowLoading(false)
                    setShowFail(false)
                }}
            >
                <Text style = {{fontSize: 25}}>Upload failed, please try again</Text>
                <Text style = {{fontSize: 15, marginTop: 10}}>Tap screen to continue</Text>
            </TouchableOpacity>
          </Modal>
          
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        flex: 1, 
        marginTop: 10, 
        borderTopWidth: 1, 
        borderColor: 'grey',
        width: '95%',
        marginLeft: '2.5%'
    }
})

export default AddComment
