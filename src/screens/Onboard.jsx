import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import Onboarding from 'react-native-onboarding-swiper';
import { MaterialIcons } from '@expo/vector-icons';

import Img1 from '../assets/onboarding-img1.png'
import Img2 from '../assets/onboarding-img2.png'
import Img3 from '../assets/onboarding-img3.png'

const Onboard = () => {
    const navigation = useNavigation()
    // navigate to Home screen
    const goToHome = () => {
        navigation.navigate('Getstarted')
    }
    const Skip = () => navigation.replace('Getstarted')
    const SkipButton = ({...props}) => {
        return (
            <TouchableOpacity style={{
                paddingHorizontal : 20
            }}
                {...props}      // same to navigation.replace('Home')
            >
                <Text style={{color: 'black', fontSize: 16, fontWeight: 'bold'}}>SKIP</Text>
            </TouchableOpacity>
        )
    }
    const NextButton = ({...props}) => {
        return (
            <TouchableOpacity style={{
                paddingHorizontal : 20
            }} 
            {...props}>
              <MaterialIcons name="skip-next" size={28} color="black" />
            </TouchableOpacity>
        )
    }
    const DoneButton = ({...props}) => {
        return (
            <TouchableOpacity style={{
                padding :5,
                backgroundColor: '#FFA8A8',
                borderRadius: 50,
                marginRight: 15,
            }} onPress={goToHome}>
                <MaterialIcons name="done" size={28} color="#D54799" />
            </TouchableOpacity>
        )
    }




    const Dots = ({selected}) => {
        let backgroundColor;
        backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
        return (
            <View 
                style={{
                    width:8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 3,
                    backgroundColor
                }}
            />
        );
    }

  return (
    <View style ={{ 
        flex : 1,
        justifyContent : 'center',
    }}>
        <Onboarding
            onDone={goToHome}
            onSkip={Skip}
            SkipButtonComponent={SkipButton}
            NextButtonComponent={NextButton}
            DoneButtonComponent={DoneButton}
            DotComponent={Dots}
                pages={[
                    {
                      backgroundColor: '#a6e4d0',
                      image: <Image source={Img1} resizeMode='contain' />,
                      title: 'Welcome to the Quote App',
                      subtitle: 'Get a quote from any author',
                    }, 
                    {
                        backgroundColor: '#fdeb93',
                        image: <Image source={Img2} />,
                        title: 'Get a daily quote',
                        subtitle: 'With no ads, 100% free',
                      }, 
                      {
                        backgroundColor: '#FBD6D2',
                        image: <Image source={Img3} />,
                        title: 'Save your favorite quotes',
                        subtitle: 'And share them to your friends',
                      }, 
                ]}
                />
                
    </View>
  )
}

export default Onboard