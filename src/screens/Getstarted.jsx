import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import {StatusBar} from 'expo-status-bar'
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../src/assets/Quotes.png'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';


const Height = Dimensions.get('window').height

const Getstarted = () => {
    const navigation = useNavigation()

  return (
    <View style={{
        flex : 1,
        backgroundColor: '#FFDDEE'
     
    }}>
        <StatusBar style="dark" backgroundColor= "#FFDDEE" />
      {/* Header */}
      <View style={{
          flex : 3,
          justifyContent: 'center',
            alignItems: 'center',

      }}>
        <Animatable.Image 
            source={Logo} 
            animation="bounceIn"
            duraton="2500"
            style={{
                width : '90%',
                height : '90%',
                resizeMode : 'contain'
            }}
        />

      </View>
      {/* Footer */}
      <Animatable.View 
        animation="fadeInUpBig"
        duration= {1500}
      
      style = {{
              flex: 2,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              paddingVertical: 50,
              paddingHorizontal: 30,
              backgroundColor: '#F7F7F7',
              opacity: 0.7,
      }}>
          <Text style={{
               color: '#05375a',
               fontSize: 25,
               fontWeight: 'bold',
               marginTop: 5,
          }}>
                Stay to share you mood with everyone
          </Text>
          <Text style={{
                 color: 'grey',
                 marginTop: 10,
                 fontSize: 14,
                 fontWeight: 'bold',
          }}>
                Sign in with account
          </Text>
          <View style={{
                marginTop: 30,
                alignItems: 'flex-end',
          }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
              >
                    <LinearGradient
                     colors={['#4c669f', '#3b5998', '#192f6a']}
                     style={{
                        width: 160,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        flexDirection: 'row'
                     }}
                    >
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16,
                                letterSpacing : 1.1
                            }}>
                                Get started
                            </Text>
                            <Entypo name="chevron-right" size={20} color="white" />
                    </LinearGradient>
              </TouchableOpacity>
          </View>
      </Animatable.View>
    </View>
  )
}

export default Getstarted