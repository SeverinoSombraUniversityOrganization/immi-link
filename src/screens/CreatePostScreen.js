import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import postService from '../services/PostService'; 
import { CommonActions } from '@react-navigation/native';

export default function CreatePostScreen(props) {
  const isLoggedUser = props.isLoggedUser;

  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = () => {
    setIsLoading(true); 
    const userId = isLoggedUser.user.id
    const username = isLoggedUser.user.username
    const userProfilePhoto = isLoggedUser.user.profilePhoto

    postService.create({content, userId, username, userProfilePhoto})
      .then(user => {
        setIsLoading(false); 
        props.navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Feed' }],
            })
        );
    })
      .catch(error => {
        setIsLoading(false); 
        setErrorMessage('Failed to create post.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>New Post</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Say what you are thinking..."
          placeholderTextColor="#bdc3c7"
          onChangeText={(text) => setContent(text)}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.Btn} onPress={handleCreatePost} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.loginText}>POST</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#3498db',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    backgroundColor: '#ecf0f1',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    color: '#003f5c',
    textAlignVertical: 'top', 
  },
  Btn: {
    width: '80%',
    backgroundColor: '#3498db',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  errorText: {
    color: '#fb5b5a',
    marginBottom: 10,
  },
});
