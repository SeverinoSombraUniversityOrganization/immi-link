import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import postService from '../services/PostService';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const PostList = ({ posts, isLoggedUser, setPosts }) => {
  const navigation = useNavigation();
  const usertoken = isLoggedUser.usertoken;

  const handleDeletePost = async (id) => {
    try {
      await postService.delete(id, usertoken);
      const updatedPosts = posts.filter((post) => post._id !== id);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleUpdateLikes = async (id, data) => {
    try {
      await postService.updateLikes(id, data, usertoken);
      postService.getList(usertoken)
        .then((response) => {
          const reversedPosts = [...response].reverse();
          setPosts(reversedPosts);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
        });  
    } catch (error) {
      console.error('Error updating post likes:', error);
    }
  };

  const handleProfile = (userId, username, userProfilePhoto) => {
    navigation.navigate('ProfileScreen', {
      userId,
      username,
      userProfilePhoto,
    });
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.postHead}></View>
      <View style={styles.inputView}>
        <TouchableOpacity style={styles.row} onPress={() => handleProfile(item.userId, item.username, item.userProfilePhoto)}>
          <Image
            source={{ uri: item.userProfilePhoto }}
            style={styles.image}
          />
          <View>
            <Text style={styles.fuelName}>{item.username}</Text>
            <Text style={styles.createdAtText}>{item.createdAt.split('T')[0]} {item.createdAt.split('T')[1].split('.')[0]}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.flex}>
          <Text>{item.content}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.likeBtn} onPress={() => handleUpdateLikes(item._id, item, isLoggedUser.user)}>
          <FontAwesome name="thumbs-up" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.likeBtn}>
          <FontAwesome name="comment" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.likeCount} size={20} color="white">
          <Text style={{ color: 'white' }}>{item.likes.length}</Text>
        </View>
        {isLoggedUser.user.id === item.userId && (
          <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDeletePost(item._id)}>
            <FontAwesome name="trash-o" size={20} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => renderItem({ item, isLoggedUser })}
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
        const reversedPosts = [...response].reverse();
        setPosts(reversedPosts);
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

      <PostList posts={post} isLoggedUser={props.isLoggedUser} setPosts={setPosts} />

      <TouchableOpacity style={styles.Btn} onPress={handleNavigateToCreatePost}>
        <Text style={{ color: "white", margin: 10 }}>CREATE A POST</Text>
      </TouchableOpacity>
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
  image: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 25,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#3498db',
    marginBottom: 40,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#465881',
    borderRadius: 25,
    backgroundColor: '#ecf0f1',
    marginBottom: 5,
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
  postHead: {
    width: screenWidth * 0.8,
    borderRadius: 8,
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
    padding: 5,
  },
  postContet: {
    width: screenWidth * 0.8,
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
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
  deleteBtn: {
    backgroundColor: '#fb5b5a',
    borderRadius: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeBtn: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  likeCount: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  createdAtText: {
    color: '#ccc',
    fontSize: 12,
  },
});

