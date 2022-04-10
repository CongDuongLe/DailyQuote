import { View, Text, SafeAreaView,TouchableOpacity, ToastAndroid} from 'react-native'
import * as Speech from 'expo-speech';
import * as Clipboard from 'expo-clipboard';
import React, {useState, useEffect, useMemo} from 'react'
import { StatusBar } from 'expo-status-bar'
import {COLORS, SIZES} from '../constant/Constant'
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../firebase-config';
import { doc, deleteDoc, addDoc, setDoc, collection } from "firebase/firestore";


const Home = ({navigation}) => {
    const [Quote, setQuote] = useState('Loading...')
    const [Author, setAuthor] = useState('Loading...')
    const [isLoading, setIsLoading] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isLiked,SetisLiked] = useState(false)
   
    const handleQuote = () => {
        setIsLoading(true)
        SetisLiked(false)
        fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(result => {
          setQuote(result.content)
          setAuthor(result.author)
          setIsLoading(false)
        })
        .catch(err => {
          console.log(err)
        })
    }
    useEffect(() => {
        handleQuote()
    }, [])
    // generate random id for database
    const randomId = () => {
        return Math.random().toString(36).substr(2, 9)
    }

    // add data to firestore with time out
    const addData = async (quote, author, isLiked) => {
      const id = randomId()
        const data = {
            id : id,
            quote : Quote,
            author : Author,
            isLiked : !isLiked
        }
      try {
        const docRef = await doc(db, 'likequotes', id)
        // const colRef = collection(db, 'likequotes', id);
        // await addDoc(colRef, data)
        await setDoc(docRef, data)
        // await setDoc(docRef, data)
        ToastAndroid.show('Quote added to your liked quotes', ToastAndroid.SHORT)
        
      } catch (error) {
        console.log(error)
      }
    }

    // delete data from firestore
    const deleteData = async (id) => {
      const data = {
        id : id,
        quote : Quote,
        author : Author,
        isLiked : !isLiked
      }
      try {
        const docRef = await doc(db, 'likequotes', id)
        await deleteDoc(docRef)
        await setDoc(docRef, data)
        ToastAndroid.show('Quote deleted from your liked quotes', ToastAndroid.SHORT)
      } catch (error) {
        console.log(error)
      } 
    }
    // delete likequotes by id
    const deleteLikeQuotes = async (id) => {
      try {
        const docRef = await doc(db, 'likequotes', id)
        await deleteDoc(docRef)
        ToastAndroid.show('Quote deleted from your liked quotes', ToastAndroid.SHORT)
      } catch (error) {
        console.log(error)
      }
    }
   
    // get data from firestore
    const getDataByID = async (id) => {
      try {
        const docRef = await doc(db, 'likequotes', id)
        const data = await docRef.get()
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }



    const handleSpeak = () => {
        Speech.speak(Quote)
        Speech.VoiceQuality.Enhanced = 'Enhanced'
        
        setIsSpeaking(true)
    }
    const handleStop = () => {
        Speech.stop()
        setIsSpeaking(false)
    }
    // copy quote and show toastAndroid
    const handleCopy = () => {
        Clipboard.setString(Quote)
        ToastAndroid.show('Quote copied to clipboard', ToastAndroid.SHORT)
    }
    
    const Button_Section = () => {
        return (
            <View style={{
                flexDirection: 'row',
                marginTop : 20,
                justifyContent: 'space-around',
                width: '90%',
              }}>
                {
                  isSpeaking ?
                  <TouchableOpacity style={{
                    paddingHorizontal : 15,
                    paddingVertical : 15,
                    backgroundColor: COLORS.primary,
                    borderRadius : 25
                  }}
                  onPress={handleStop}
                  >
                    <Feather name="pause-circle" size={20} color="white" />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={{
                    paddingHorizontal : 15,
                    paddingVertical : 15,
                    backgroundColor: COLORS.primary,
                    borderRadius : 25
                  }}
                  onPress={handleSpeak}
                  >
                   <AntDesign name="playcircleo" size={20} color="white" />
                  </TouchableOpacity>
                }
              {/* Copy to clipboard */}
                <TouchableOpacity style={{
                      padding : 15,
                      backgroundColor: COLORS.primary,
                      borderRadius : 25,
                }}
                activeOpacity={0.6}
                  onPress={handleCopy}
                >
                <Feather name="copy" size={20} color="white" />
                </TouchableOpacity>
                {/* Liked Quote and Save to Async Storage */}
                <TouchableOpacity style={{
                  padding : 15,
                  backgroundColor: COLORS.primary,
                  borderRadius : 25,
                }}
                activeOpacity={0.6}
                // check if quote is liked or not and save or remove from firebase
                onPress={() => {
                    if(isLiked){
                        deleteData(randomId())
                        SetisLiked(!isLiked)
                    }
                    else{
                        addData(Quote, Author, isLiked)
                        SetisLiked(!isLiked)
                    }
                }}

                >
                  {
                    isLiked ?   <AntDesign name="heart" size={20} color="red" /> :    <AntDesign name="heart" size={20} color="white" />
                  }      
                </TouchableOpacity>
              </View>
        )
    }
    
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.pink,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.pink}/>
      <View style={{
        backgroundColor: COLORS.white,
        width: '90%',
        alignItems: 'center',
        borderRadius : 20, 
        padding : 20, 
        marginBottom : 20,
      }}>
        <Text style={{
          justifyContent: 'center',
          fontSize: SIZES.font * 1.5,
          fontWeight: 'bold',
       
        }}>Quotes of the Day</Text>
        <View style ={{
          marginTop : 20,
          paddingHorizontal : 20
        }}>
          <FontAwesome5 name="quote-left" size={20} color="black" style={{
           marginBottom : -15,
           marginLeft: -5
          }} />
          <Text style={{
             fontSize: 16,
             lineHeight: 26,
             letterSpacing: 1.1,
             fontWeight: '400',
             textAlign: 'center',
             marginBottom: 10,
             paddingHorizontal: 30,
          }}>{Quote}
          </Text>
          <FontAwesome5 name="quote-right" size={20} color="black" style={{
           textAlign: "right",
           marginTop : -20,
           marginLeft : -10
          }}/>
        </View>
        <View style={{
          marginRight : '-40%',
          marginTop : 15
        }}>
        <Text style={{
           fontWeight: '300',
           fontStyle: 'italic',
          fontSize: 16,
          }}>__ {Author}</Text>
          </View>
        <TouchableOpacity style={{
          marginTop : 20,
          paddingHorizontal : 75,
          paddingVertical : 15,
          backgroundColor: isLoading ? COLORS.gray : COLORS.primary,
          borderRadius : 25
        }}
        onPress={handleQuote}
        >
          <Text style={{
            color: isLoading ? COLORS.dark : COLORS.white,
            fontSize: SIZES.font*1.1,
            fontWeight: '700',
            letterSpacing : 1.1
          }}>{
            isLoading ? 'Loading...' : 'New Quote'
          }</Text>
        </TouchableOpacity>
        {/* 3 button */}
        <Button_Section/>
      </View>
    </SafeAreaView>
  )
}

export default Home