import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import postService from '../services/FuelService'; 
import { CommonActions } from '@react-navigation/native';

export default function CreateUserScreen(props) {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = () => {
    setIsLoading(true); 

    postService.create({name})
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
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setName(text)}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleCreatePost} disabled={isLoading}>
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
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
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
