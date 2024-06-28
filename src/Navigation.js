import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import FeedScreen from './screens/FeedScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import CreateUserScreen from './screens/CreateUserScreen';
import CreatePostScreen from './screens/CreatePostScreen.js';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [isLoggedUser, setIsLoggedUser] = useState(null);

  const handleLogout = () => {
    setIsLoggedUser(null);
  };

  const handleProfile = (userId, username) => {
    navigation.navigate('ProfileScreen', {
      userId: userId,
      username: username,
    });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedUser ? (
          <Stack.Screen
            name="Feed"
            options={{
              headerTitle: () => (
                <View style={styles.headerContainer}>
                   <TouchableOpacity style={styles.headerContainer}>
                    <Image
                      source={{ uri: isLoggedUser.user.profilePhoto }}
                      style={styles.imageHeader}
                    />
                    <Text style={styles.username}>{isLoggedUser.user.username}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLogout}>
                    <FontAwesome name="sign-out" size={20}  />
                  </TouchableOpacity>
                </View>
              ),
            }}
          >
            {props => {
              return <FeedScreen {...props} isLoggedUser={isLoggedUser} />;
            }}
        </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
          >
            {props => {
              return <LoginScreen {...props} setIsLoggedUser={setIsLoggedUser} />;
            }}
          </Stack.Screen>
        )}

        <Stack.Screen
          name="CreateUser"
          component={CreateUserScreen}
        />
        <Stack.Screen
          name="CreatePost"
        >
          {props => <CreatePostScreen {...props} isLoggedUser={isLoggedUser} />}
        </Stack.Screen>
        <Stack.Screen
          name="ProfileScreen"
        >
          {props => <ProfileScreen {...props} isLoggedUser={isLoggedUser} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
  },
  imageHeader: {
    width: 35,
    height: 35,
    marginRight: 5,
    borderRadius: 25,
  },
  header: {
    position: 'absolute',
    top: 0, 
    right: 0, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginTop: 100, 
    marginBottom: 40,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  username: {
    fontWeight: 'bold',
    marginRight: 10,
    textTransform: 'capitalize',
  },
  button: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Navigation;
