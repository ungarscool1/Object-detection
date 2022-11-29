import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Camera from "../screen/Camera";
import Result from "../screen/Result";
import History from "../screen/History";
import LinkingConfiguration from './LinkingConfiguration';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navigation() {
  return (
    <NavigationContainer
      independent={true}
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{
        gestureEnabled: false,
        headerTitle: 'Camera'
      }} />
      <Stack.Screen name="Result" component={Result} options={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: true,
        headerTitle: 'Result',
        headerTitleAlign: 'center'
      }} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="History" component={History} options={{
        tabBarIcon: ({ color }) => <Ionicons name="file-tray-full-outline" size={24} style={{ marginBottom: -3, color: color }} />
      }} />
      <Tab.Screen name="Camera" component={Camera} options={{
        tabBarIcon: ({ color }) => <Ionicons name="camera-outline" style={{ marginBottom: -3, color: color }} size={24} />
      }} />
    </Tab.Navigator>
  );
}
