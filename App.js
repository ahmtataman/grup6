import React from 'react';
import SignInScreen from './src/screens/SignInScreen';
import LeaderBoard from './src/screens/LeaderBoard';
import Analyze from './src/screens/Analyze';
import Achivement from './src/screens/Achivement';
import SignUpScreen from './src/screens/SignUpScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainPage from './src/screens/MainPage';
import Start from './src/screens/Start';
import Hints from './src/screens/Hints';
import Profile from './src/screens/Profile';
import HintsShow from './src/components/HintsShow';
import Ready from './src/screens/Ready';
import Test from './src/screens/Test';
import Map1 from './src/screens/Map1';
import Map2 from './src/screens/Map2';

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
        <Stack.Screen
          name="lider"
          component={LeaderBoard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="achive"
          component={Achivement}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="analiz"
          component={Analyze}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="test"
          component={Test}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="map1"
          component={Map1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="map2"
          component={Map2}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
