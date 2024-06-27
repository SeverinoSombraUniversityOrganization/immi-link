import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import postService from '../services/PostService'; 
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const PostList = ({ posts, usertoken, setPosts }) => {
  const navigation = useNavigation();

  const handleDeleteFuel = async (id) => {
    try {
      await postService.delete(id, usertoken);
      const updatedFuels = posts.filter((fuel) => fuel._id !== id);
      setPosts(updatedFuels);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdateFuel = (id) => {
    navigation.navigate('UpdateFuel', { fuelId: id });
  };

  const renderItem = ({ item }) => (
    <View style={styles.fuelItem} >
      <TouchableOpacity style={styles.fuelInfo} onPress={() => handleUpdateFuel(item._id)}>
        <Text style={styles.fuelName}>{item.name}</Text>
        <Text style={styles.fuelType}>######</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteFuel(item._id)}>
        <FontAwesome name="trash-o" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};


export default function HomeScreen(props) {
  const [post, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    postService.getList(props.isLoggedUser.token)
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.error('Error fetching fuels:', error);
      });
  }, []);

  const handleNavigateToCreatePost = () => {
    navigation.navigate('CreatePost');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>

      <TouchableOpacity style={styles.button} onPress={handleNavigateToCreatePost}>
        <Text style={styles.buttonText}>CREATE A POST</Text>
      </TouchableOpacity>

      <PostList posts={post} userToken={props.isLoggedUser.token} setPosts={setPosts}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 10,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#3498db',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#ecf0f1',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#003f5c',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3498db',
    marginBottom: 20,
  },
  button: {
    width: '30%',
    backgroundColor: '#3498db',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fuelItem: {
    width: screenWidth * 0.8, 
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  fuelInfo: {
    flex: 1, 
  },
  fuelName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fuelType: {
    fontSize: 14,
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#fb5b5a',
    borderRadius: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

