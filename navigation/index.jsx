import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Camera from "../screen/Camera";
import Result from "../screen/Result";
import LinkingConfiguration from './LinkingConfiguration';

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

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Camera" component={Camera} options={{gestureEnabled: false}} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  );
}