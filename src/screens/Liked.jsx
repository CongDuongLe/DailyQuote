import { View, Text, FlatList, TouchableOpacity, ToastAndroid} from 'react-native'
import React,{useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {COLORS, SIZES} from '../constant/Constant'
import { StatusBar } from 'expo-status-bar'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { doc, deleteDoc, addDoc, setDoc, } from "firebase/firestore";




const FakeData = [
  {
    id: 1,
    quote : 'I am the very model of a modern major general.',
    author : 'General',
    isLiked : true
  },
  {
    id: 2,
    quote : 'I have a dream that one day this nation will rise up and live out the true meaning of its creed: "We hold these truths to be self-evident, that all',
    author : 'President',
    isLiked : false
  },
  {
    id: 3,
    quote : 'Friendship brings in a lot of honesty and trust into any relationship, especially a marriage.',
    author : 'Farhan Akhtar',
    isLiked : true
  },
  {
    id: 4,
    quote : 'I cant imagine a person becoming a success who doesnt give this game of life everything he is got.',
    author : 'Walter Cronkite',
    isLiked : true
  },
  {
    id: 5,
    quote : 'The greatest part of our happiness depends on our dispositions, not our circumstances.',
    author : 'Martha Washington',
    isLiked : false
  },
  {
    id: 6,
    quote : 'I am not a product of my circumstances. I am a product of my decisions.',
    author : 'Stephen Covey',
    isLiked : true
  },
  {
    id: 7,
    quote : 'The best way to predict the future is to create it.',
    author : 'Abraham Lincoln',
    isLiked : true
  },
  {
    id: 8,
    quote : 'The best way to find yourself is to lose yourself in the service of others.',
    author : 'Mahatma Gandhi',
    isLiked : false
  },
]
  



const Liked = () => {
  const [isLiked,SetisLiked] = useState(false)
  // send likeQuote to FlatList
  const [Quote, SetQuote] = useState([])
  const [Author, SetAuthor] = useState([])
  const [data, SetData] = useState([])

  // get all likequotes from google firestore
  const getData = async () => {
    try {
      const docRef = await collection(db, 'likequotes')
      const docs = await getDocs(docRef)
      SetData(docs)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])
  // handle remove likequotes from firestore
  const removeData = async (id) => {
    try {
      const docRef = await doc(db, 'likequotes', id)
      await deleteDoc(docRef)
      ToastAndroid.show('Quote deleted from your liked quotes', ToastAndroid.SHORT)
    } catch (error) {
      console.log(error)
    }
  }

  // handleCopy
  const handleCopy = ({item}) => {
    Clipboard.setString(item.quote)
    ToastAndroid.show('Quote copied to clipboard', ToastAndroid.SHORT)
  }
  // render Item flatlist
  const renderItem = ({item}) => {
    return(
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth : 1,
        borderRadius : 20,
        backgroundColor: COLORS.white,
        borderColor: COLORS.gray,
        marginVertical : 5,
        width: '100%',
        
      }}>
        <View style={{
          flexDirection: 'column',
          height: 'auto',
          width: '75%',
          paddingLeft :15,
          paddingRight : 7,
          paddingVertical : 10,
        }}>
          <Text style={{
            fontSize: SIZES.font * 1.1,
            marginBottom : 2,
          }}>{item.quote}</Text>
          <Text style={{
            fontSize: SIZES.font * 0.9,
            color: COLORS.primary,
            fontWeight: 'bold',
          }}>{item.author}</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '15%',
          marginRight : '3%',
        }}>
          {/* Copy Quote to clipboard */}
          <TouchableOpacity style={{
            paddingHorizontal: '5%'
          }}
          onPress={() => handleCopy({item})}
          >
          <MaterialCommunityIcons name="content-copy" size={24} color="black" />
          </TouchableOpacity>


          {/* Unlike Quotes */}
          <TouchableOpacity style={{
            paddingRight : 10
          }}
           
          >
          <MaterialCommunityIcons name="heart-broken" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }



  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.pink,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.pink}/>
      {/* Header */}
        <View style={{
          backgroundColor: COLORS.white,
          width: '90%',
          height: '10%',
          borderRadius: 20,
          alignItems: 'center',
          marginVertical : '3%'
        }}>
          <MaterialCommunityIcons name="format-quote-open-outline" size={26} color="black"
            style={{
              marginLeft: '-70%',
              paddingTop: '3%',
              marginBottom: '-4%',
            }}
          />
          <Text style={{
            justifyContent: 'center',
            fontSize: SIZES.font * 1.3,
            fontWeight: 'bold',
          }}>Your liked Quotes</Text>
          <MaterialCommunityIcons name="format-quote-close-outline" size={26} color="black"
            style={{
              marginRight: '-70%',
              paddingBottom: '3%',
              marginTop: '-4%',
            }}
          />
        </View>
      {/* Render Like Quote */}
      <View style={{
        flex: 1,
        width: '90%',
      }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  )
}

export default Liked