import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './Components/Authentication/LoginScreen';
import SignUpScreen from './Components/Authentication/SignUpScreen';
import ForgotPasswordScreen from './Components/Authentication/ForgotPasswordScreen';
import FeedScreen from './Components/NavBar/FeedScreen';
import RecordScreen from './Components/NavBar/RecordScreen';
import ProfileScreen from './Components/NavBar/ProfileScreen';
import ChallengesScreen from './Components/NavBar/ChallengesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tabs Navigation
function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#4CAF50',
      }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Record" component={RecordScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={BottomTabsNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
