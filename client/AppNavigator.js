import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './Components/Authentication/LoginScreen';
import SignUpScreen from './Components/Authentication/SignUpScreen';
import ForgotPasswordScreen from './Components/Authentication/ForgotPasswordScreen';
import DashboardScreen from './Components/Dashboard/DashboardScreen';
import ActivityHistoryScreen from './Components/Dashboard/ActivityHistoryScreen';
import CarbonTrackingScreen from './Components/Dashboard/CarbonTrackingScreen';
import InputScreen from './Components/Dashboard/InputScreen';
import FeedScreen from './Components/NavBar/FeedScreen';
import ProgressScreen from './Components/NavBar/ProgressScreen';
import RecordScreen from './Components/NavBar/RecordScreen';
import ProfileScreen from './Components/NavBar/ProfileScreen';

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
      <Tab.Screen name="Progress" component={ProgressScreen} />
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
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="ActivityHistory" component={ActivityHistoryScreen} />
      <Stack.Screen name="CarbonTracking" component={CarbonTrackingScreen} />
      <Stack.Screen name="Input" component={InputScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
