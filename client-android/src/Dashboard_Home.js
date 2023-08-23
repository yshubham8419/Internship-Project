import {StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView, Image ,Dimensions} from 'react-native'
import React, { useContext, useState } from 'react';
import { black, blue, white ,lightgray} from './Constants';
import { AppContext } from './AppContext';
import axios from 'axios';

async function findQuiz(serverUrl,quizId, onSuccess, onFaliure) {
    const data = {
      "quizID" : quizId
    }
    const loginurl = serverUrl+"/getQuiz"
    axios.post(loginurl, data)
      .then(response => {
        if (response.data.success) onSuccess(response.data)
        else onFaliure(response.data)
      })
      .catch(error => {
        onFaliure({ 'message': error })
      })
  }

const Dashboard_Home =({navigation})=>{
    
    const {height:screenHeight} = Dimensions.get('window');
    const {width:screenWidth}=Dimensions.get('window');
    const [localQuizId,setLocalQuizID] = useState("");
    const [quizFound,setQuizFound] = useState(false);
    const [quizTitle,setQuizTitle]=useState('Random title')
    const {setQuestion,setOption,setQuizId,setQuizPrepared,setTitle,setDescription,username,serverUrl}=useContext(AppContext)
    const profileImageWidth = 0.7*screenWidth


    const onQuizFound=(data)=>{
        setQuizFound(true)
        setQuizTitle(data.quizTitle)
        setTitle(data.quizTitle)
        setDescription(data.quizDescription)
        setQuestion(data.questions)
        setQuizId(data.quizID)
        setQuizPrepared(true)
        setOption(data.options)
    }
    const onQuizNotFound =(data)=>{
        setQuizPrepared(false)
        setQuizFound(false)
    }

    
    const styles=StyleSheet.create({
        formContainer:{   
            width:screenWidth,
            marginTop:(0.30*screenHeight),         
            borderTopLeftRadius:50,
            borderTopRightRadius:50,
            height:(0.70*screenHeight),
            backgroundColor:white,
            alignItems:'center'
        },
        profileImageContainer:{
            width:profileImageWidth,
            height : profileImageWidth,
            borderRadius:(profileImageWidth/2),
            marginTop: -(profileImageWidth/2),
            alignItems:'center',
            overflow:'hidden'
        },
        username:{
            marginTop:'1%',
            height:(0.057*screenHeight),
            fontSize:(0.04*screenHeight),
            fontWeight: '900',
            color:black,
            textAlignVertical:'center',
            textAlign:'center',
            letterSpacing:0.9

        },
        welcome:{
            marginTop:'0.5%',
            color:blue,
            textAlign:'center',
            fontSize:(0.028*screenHeight),
            fontWeight:'700'
        },
        searchQuizContainer:{
            backgroundColor:'#A1a1a2',
            borderRadius:(0.03*screenHeight),
            width:(0.83*screenWidth),
            height:(0.06*screenHeight),
            flexDirection:'row',
            alignItems:"center"
        },
        searchAndResults:{
            marginTop:'6%',
            borderRadius:(0.03*screenHeight),
            width:(0.83*screenWidth),
            overflow:'hidden',
            backgroundColor:'#D0D0D088',
        }
        ,
        result:{
            width:'100%',
            height:(0.09*screenHeight),
            flexDirection:'row',
            alignItems:'center'
        },
        searchImage:{
            marginLeft:'4%'
        },
        searchInput:{
            color:white,
            flex:1
        },
        quizFoundIcon:{
            marginLeft:(0.03*screenWidth),
            marginTop:(0.01*screenHeight)
        },
        quizFoundTitle:{
            marginLeft:(0.02*screenWidth),
            fontSize:20
        },
        bg:{
            width:screenWidth,
            height:screenHeight,
            position:'absolute'
        }
    });
    return(
        <ScrollView>
            <Image  source={require('./assets/Dashboard-Phone-Light.jpg')} style={styles.bg}/>
            <View style = {styles.formContainer}>
                <View style={styles.profileImageContainer}>
                    <Image source={require('./assets/tempprofile.png')} style={{height:'100%',width:'100%'}}/>
                </View>
                <Text style={styles.username} numberOfLines={1}>
                    @{username}
                </Text>
                <Text style={styles.welcome}>
                    Welcome back!
                </Text>
                <View style={styles.searchAndResults}>
                    <View style={styles.searchQuizContainer} >
                        <Image style = {styles.searchImage} source = {require('./assets/searchIcon.png')}/>
                        <TextInput value={localQuizId} onChangeText={setLocalQuizID} placeholder='Enter Quiz Id' placeholderTextColor={'#f0f0f0'} style={styles.searchInput} onBlur={
                            ()=>{findQuiz(serverUrl,localQuizId,onQuizFound,onQuizNotFound) ;console.log('findingQuiz')}
                        } />
                    </View>

                    {quizFound && <TouchableOpacity onPress={()=>{
                        navigation.navigate('Quiz')
                        }}
                        style={styles.result}>
                        
                        <Image source={require('./assets/quizfoundIcon.png') }style={styles.quizFoundIcon}></Image>
                        <Text style={styles.quizFoundTitle}>{quizTitle}</Text>
                    </TouchableOpacity>}
                </View>
                {!quizFound && <Image source={require('./assets/padhakuBoy.png')} style={{width:(0.8*screenWidth)}} resizeMode='contain'></Image>}
            </View>
        </ScrollView>
    );
}
export default Dashboard_Home;