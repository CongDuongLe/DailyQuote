import { View, Text } from 'react-native'
import React from 'react'
import Home from '../screens/Home'
import Liked from '../screens/Liked'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Navigation from '../navigation/Navigation'
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const TabStack = createBottomTabNavigator();

// Screen names
const QuoteScreen = 'Home'
const LikedScreen = 'Liked'

const Tab = () => {
  return (
        <TabStack.Navigator
          initialRouteName={QuoteScreen}
          screenOptions={ 
            ({ route }) => {
              return ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName
                  let rn = route.name
                  if (rn === QuoteScreen) {
                    iconName = focused ? 'home' : 'home-outline'
                  } else if (rn === LikedScreen) {
                    iconName = focused ? 'heart' : 'heart-outline'
                  }
                  return <Ionicons name={iconName} size={34} color={color} 
                    style={{
                      marginBottom: -5,    
                    }}                  
                  />
                },
                tabBarActiveTintColor: '#FF5C8D',
                tabBarInactiveTintColor: 'gray',
                tabBarShowLabel : true,
                tabBarStyle: {
                  backgroundColor: 'white',
                  height: 80,
                  borderTopWidth: 0.5,
                  borderTopColor: '#E0E0E0',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignSelf: 'center',    
                  position: 'absolute',
                  bottom: 25,
                  left: '5%',
                  right: '5%',
                  borderRadius : 15,
                  elevation: 5,
                },
               tabBarLabelStyle : {
                  fontSize : 14,
                  fontWeight : 'bold',
                  paddingBottom :5,
               }    
              })}
          }
        >
          <TabStack.Screen name={QuoteScreen} component={Home} 
            options={{
              headerShown: false,
              tabBarLabel: 'Quote',
            }}  
          />
          <TabStack.Screen name={LikedScreen} component={Liked} 
            options={{
              headerShown: false,
              tabBarLabel: 'Liked',
            }}        
          />
        </TabStack.Navigator>
  )
}
        

export default Tab