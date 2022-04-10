import { View, Text } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Onboard from '../screens/Onboard';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Tab from '../tab/Tab';
import Getstarted from '../screens/Getstarted';

const HomeStack = createNativeStackNavigator();

const Navigation = () => {
  return (
        <HomeStack.Navigator
            initialRouteName="Onboard"  
        >
            <HomeStack.Screen name="OnBoard" component={Onboard} options ={{
                headerShown: false
            }} />
              <HomeStack.Screen name="Getstarted" component={Getstarted} options ={{
                headerShown: false
            }} />

            <HomeStack.Screen name="Login" component={Login} options ={{
                headerShown: false
            }} />
            <HomeStack.Screen name="Tab" component={Tab} options ={{
                headerShown: false
            }}/>
        </HomeStack.Navigator>
  )
}

export default Navigation