import React from 'react';
import {View, Text} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './src/screens/MainPage';
import Start from './src/screens/Start';
import Hints from './src/screens/Hints';
import Profile from './src/screens/Profile';
import HintsShow from './src/components/HintsShow';
import HintCall from './src/components/HintCall';
import Ready from './src/screens/Ready';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="signin"
          component={SignInScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signup"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="main"
          component={MainPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ready"
          component={Ready}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="start"
          component={Start}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="hint"
          component={Hints}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="hintshow"
          component={HintsShow}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
