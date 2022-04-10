import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/navigation/Navigation'
import Tab from './src/tab/Tab'
import Login from './src/screens/Login'
import Getstarted from './src/screens/Getstarted'

const App = () => {
  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      
      <NavigationContainer>
      <Navigation/>
      {/* <Tab/> */}
      {/* <Login/> */}
      {/* <Getstarted/> */}
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App