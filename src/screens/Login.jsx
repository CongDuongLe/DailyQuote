import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import React,{useState, useEffect, useCallback, useMemo} from 'react'
import Frame from '../assets/Quotes.png'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
signInWithPopup, signOut, sendPasswordResetEmail, updatePassword, onAuthStateChanged } from 'firebase/auth'
import { getUser } from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config.js';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
// import google sign in with firebase credentials




const Login = () => {
   // initial email, password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // check keyboard inputs and hide Register button when type
    const navigation = useNavigation()
    // Go to Home Screen after google Sign in has been done
    const goToTab = () => {
        navigation.navigate('Tab')
    }
    // firebase setup 
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // handle create account 
    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          alert('Account created successfully ! email: ' + user.email)
        }
        )
        .catch((error) => {
          console.log(error)
        })
    }
    //handle Sign In
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          // Go to Home Screen after google Sign in has been done
          goToTab()
        }
        )
        .catch((error) => {
          console.log(error)
        })
    }
    // handle google sign in
    const handleGoogleSignIn = () => {
        auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then((userCredential) => {
          const user = userCredential.user
          console.log(user)
        }
        )
        .catch((error) => {
          console.log(error)
        })
    }
   
    // handle email, password change useCallback
    const handleEmailChange = (email) => {
        setEmail(email)
    }
    const handlePasswordChange = (password) => {
        setPassword(password)
    }
    // handle email, password change useEffect
    useEffect(() => {
      handlePasswordChange(password)
      handleEmailChange(email)
    }, [email, password])
    // prevent textinput out of focus
    //Login or Register button
    const LoginButton = () => {
      return(
        <TouchableOpacity style={{
          backgroundColor: 'white',
          borderRadius: 10,
          paddingVertical :15,
          width: '75%',
          borderWidth : 1,
          borderColor : '#168153',

        }}
        onPress={() => {
          if(email === '' || password === ''){
            alert('Please fill in all the fields')
          }
          else{
            handleSignIn()
          }
        }}

        >
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#161853',
            textAlign: 'center',
          }}>
            Login
          </Text>
        </TouchableOpacity>
      )
    }
    const RegisterButton = () => {
      return(
        <TouchableOpacity style={{
          backgroundColor: 'white',
          borderRadius: 10,
          paddingVertical :15,
          borderColor: 'white',
          borderWidth: 1,
          borderColor: '#161853',
          width: '75%',
        }}
        onPress={() => {
          if(email === '' || password === ''){
            alert('Please fill in all the fields')
          }
          else{
            handleSignUp()
          }
        }}

        >
          <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#161853',
            textAlign: 'center',
          }}>
            Register
          </Text>
        </TouchableOpacity>
      )
    }
    const GoogleSignIn = () => {
      return (
        <TouchableOpacity style={{
          backgroundColor: 'white',
          paddingVertical: 12,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '75%',
          borderWidth: 1,
          borderColor: '#168153',
        }}
          activeOpacity={0.6}
          onPress={() => {
            handleGoogleSignIn()
          }}

        >
          <AntDesign name="googleplus" size={26} color="#FF5959" />
          <Text style={{
            fontSize: 16,
            fontWeight: '700',
            color: '#161853',
            marginLeft: 20,
          }}>Sign in with Google</Text>
        </TouchableOpacity>
      )
    }

    // Main Login Components
  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      backgroundColor: '#FFDDEE',
    }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#FFDDEE" />
      {/* Header */}
      <View style={{
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        flex : 1,
      }}>
        <Animatable.Image
        animation="bounceInDown"
        duration= {1500}     
        source={Frame} style={{
          width: '80%',
          height: '80%',
          resizeMode: 'contain',
        }} />
      </View>
      {/* Input and Button  */}
      <Animatable.View
        animation="fadeInUpBig"
        duration={1500}
        style={{
          flex: 2,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          backgroundColor: '#192f6a',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View style={{
          flex: 1 / 3,
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: '8%',
        }}>
          {/* Email input */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%'
          }}>
            <Entypo name="mail" size={24} color="white" />
            <TextInput
              style={{
                marginLeft: 10,
                width: '85%',
                height: 40,
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                color: 'white',
                fontSize: 14,
              }}
              placeholder="Email"
              onChangeText={handleEmailChange}
              value={email}
              keyboardType="email-address"
              placeholderTextColor='white'
            />
          </View>
          {/* password input */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '80%'
          }}>
            <Entypo name="lock" size={26} color="white" />
            <TextInput
              style={{
                marginLeft: 10,
                width: '85%',
                height: 40,
                borderBottomColor: 'white',
                borderBottomWidth: 1,
                color: 'white',
                fontSize: 14,
              }}
              placeholder="Password"
              onChangeText={handlePasswordChange}
              value={password}
              secureTextEntry={true}
              placeholderTextColor="white"
            />
          </View>
          {/* End password input */}
        </View>
        {/* End Input Section */}
        {/* Button section */}
        <View style={{
          flex: 2 / 3,
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: '8%'
        }}>
          <LoginButton />
          {/* Sign ip with google */}
          <GoogleSignIn />
          {/* Register button */}
          <RegisterButton />
        </View>
        <View style={{
          flex: 1 / 4,
        }} />
        {/* End Options Sign in */}
      </Animatable.View>
      {/* End Input and Button */}

    </KeyboardAvoidingView>
  )
}

export default Login