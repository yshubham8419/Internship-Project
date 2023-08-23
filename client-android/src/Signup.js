import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Image, Dimensions,ToastAndroid} from 'react-native'
import React, { useContext, useState } from 'react';;
import { black, blue, white ,lightgray } from './Constants';
import { AppContext } from './AppContext';
import axios from 'axios';


async function tryRegister(serverUrl,username,password,repeatPassword,onSuccess,onFaliure){
  if(repeatPassword!=password){
    onFaliure({'message':"passwords didn't match"})
    return;
  }
  const data ={
    name: username,
    password: password
  };
  const registerurl=serverUrl+"/signup"
  console.log(username,password)
  axios.post(registerurl,data)
    .then(response =>{
      console.log(response.data)
      if(response.data.success)onSuccess(response.data)
      else onFaliure(response.data)
    })
    .catch(error=>{
      onFaliure({'message' : error})
    })
}


const Register = ({navigation})=>{
  
  const { isDarkTheme,toggleDarkTheme,serverUrl } = useContext(AppContext);
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [repeatPassword,setRepeatPassword]=useState("")
  const [registerInProgress,setRegisterInProgress]=useState(false)
  const {height:screenHeight} = Dimensions.get('window');
  const {width:screenWidth}=Dimensions.get('window');
  const page = isDarkTheme?dark.page:light.page;
  const formContainer = isDarkTheme ? dark.formContainer : light.formContainer;
  const inputContainer = isDarkTheme ? dark.inputContainer : light.inputContainer;
  const heading = isDarkTheme ? dark.heading : light.heading;
  const input = isDarkTheme ? dark.input : light.input;
  const register = isDarkTheme ? dark.register : light.register;
  const borderTextContainer = isDarkTheme ? dark.borderTextContainer : light.borderTextContainer;
  const borderText = isDarkTheme ? dark.borderText : light.borderText;
  const loginText = isDarkTheme ? dark.loginText : light.loginText;
  const loginQuestion = isDarkTheme ? dark.loginQuestion : light.loginQuestion;
  const imageButton = isDarkTheme ? dark.imageButton : light.imageButton;
  const imageSource = isDarkTheme ? require('./assets/switchInDark.png') : require('./assets/switchInLight.png');


  const onRegisterSucceed=(data)=>{
    setRegisterInProgress(false)
    navigation.navigate("Login")
  }
  const onRegisterFaliure =(data)=>{
    setRegisterInProgress(false)
    ToastAndroid.show(data.message, ToastAndroid.SHORT);
  }


  
  const styles = StyleSheet.create({
    page: {
        height:screenHeight,
        width :screenWidth,
    },
    backgroundImage:{
      width:screenWidth,
      height:screenHeight,
      position:'absolute'
    },
    extraImg:{
      height:(0.4*screenHeight),
      width:(0.4*screenHeight),
      marginTop:(-0.3*screenHeight),
      position:'absolute',
    },
    logoContainer:{
      marginLeft:8,
      marginTop:8,
      position:'absolute',
      flexDirection:'row',
      alignItems:'center'
    },
    logoText:{
      marginLeft:'3%',
      color:white,
      fontWeight:'700'
    },
    scrollview:{
      width:screenWidth
    },
    formContainer:{
        alignItems:'center',
        width:screenWidth,
        marginTop: (0.35*screenHeight),
        height:(0.65*screenHeight),
        borderTopLeftRadius:(0.06*screenHeight),
        borderTopRightRadius:(0.06*screenHeight)
    },
    inputContainer:{
        marginTop:(0.04*screenHeight),
        alignItems:'center',
        width:screenWidth
    },
    heading:{
      width:(0.8*screenWidth),
      marginTop:(0.07*screenHeight),
      fontSize :35,
      fontWeight:'bold'
    },
    loginContainer:{
      marginTop:8,
      width:(0.8*screenWidth),
      flexDirection:'row'
    },
    input: {
        width: (0.8*screenWidth),
        height: (0.06*screenHeight),
        borderWidth: 1,
        borderRadius: (0.02*screenHeight),
        paddingLeft:(0.055*screenWidth),
        paddingVertical:0
      },
    register: {
        marginTop:(0.04*screenHeight),
        width: (0.8*screenWidth),
        height: (0.065*screenHeight),
        borderRadius: 8,
        alignItems: 'center',
    },
    borderTextContainer: {
      position: 'absolute',
      top: -10,
      left: '14%',
      paddingHorizontal: 5,
    },
    borderText: {
      fontSize: 12,
    },
    switchContainer:{
      position:'absolute',
      marginLeft:(0.78*screenWidth),
      marginTop:(0.005*screenHeight)
    },
    switchImage:{
      aspectRatio:1,
      width:(0.08*screenWidth)
    },
    logoImg:{
      aspectRatio:1,
      width:(0.15*screenWidth)
    }
  });
    return( <ScrollView showsVerticalScrollIndicator={false}>
            <View style= {[styles.page,page]}>
                <Image source = {require('./assets/Signup-Login-BG.jpg')}  style={styles.backgroundImage}/>
                <View style={styles.logoContainer}>
                  <Image source = {require('./assets/logo.png')} style={styles.logoImg}/>
                  <Text style={styles.logoText}>QuizMaster</Text>
                </View>
                
                <View style={[styles.formContainer,formContainer]} >
                    <Image source = {require('./assets/extraSignUp.png')} style={styles.extraImg}/>

                      <Text style={[styles.heading,heading]}>
                        Create Account
                      </Text>

                    <View style ={[styles.inputContainer,inputContainer]}>
                      <TextInput value={username} onChangeText={setUsername} style = {[styles.input,input]}/>
                      <View style={[styles.borderTextContainer,borderTextContainer]}>
                          <Text style={[styles.borderText,borderText]}>Username</Text>
                      </View>
                    </View>


                    <View style ={[styles.inputContainer,inputContainer]}>
                      <TextInput value={password} onChangeText={setPassword} style = {[styles.input,input]} secureTextEntry={true}/>
                      <View style={[styles.borderTextContainer,borderTextContainer]}>
                          <Text style={[styles.borderText,borderText]}>Password</Text>
                      </View>
                    </View>


                    <View style ={[styles.inputContainer,inputContainer]}>
                      <TextInput valuse={repeatPassword} onChangeText={setRepeatPassword} style = {[styles.input,input]} secureTextEntry={true}/>
                      <View style={[styles.borderTextContainer,borderTextContainer]}>
                          <Text style={[styles.borderText,borderText]}>Repeat Password</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={[styles.register,register,{opacity:registerInProgress?0.7:1}]}
                        disabled={registerInProgress}
                        onPress={()=>{
                          setRegisterInProgress(true)
                          tryRegister(serverUrl,username,password,repeatPassword,onRegisterSucceed,onRegisterFaliure)
                        }}>
                      <Text style={{ color: white, marginTop: 11,fontWeight:'bold',fontSize:16 }}>Create Account</Text>
                    </TouchableOpacity>

                    <View style = {styles.loginContainer}>
                      <Text style={[styles.loginQuestion,loginQuestion]}>
                        Already have an account?{'\u00A0'}
                      </Text>
                      <TouchableOpacity onPress={()=>navigation.navigate("Login") }
                        disabled={registerInProgress} >
                        <Text style={[loginText,{opacity:registerInProgress?0.4:1}]}>
                          Login
                        </Text>
                      </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity onPress={()=>toggleDarkTheme()} style={styles.switchContainer} >
                  <Image source={imageSource} style={styles.switchImage} resizeMode='contain'/>
                </TouchableOpacity>
            </View>
            </ScrollView>
    );
}






const light = StyleSheet.create({
  page:{
    backgroundColor:blue
  },
  formContainer:{
    backgroundColor:white
  },
  heading:{
    color:black
  },
  input:{
    backgroundColor:white,
    color: black,
    borderColor: black
  },
  register:{
    backgroundColor:blue,
    color: white,
  },
  borderTextContainer:{
    backgroundColor: white,
  },
  borderText:{
    color: black,
  },
  loginText:{
    color: blue,
  },
  loginQuestion:{
    color:black
  },
  imageButton:{
    backgroundColor: white,
  }
});






const dark = StyleSheet.create({
  page:{
    backgroundColor:blue
  },
  formContainer:{
    backgroundColor:black
  },
  heading:{
    color:white
  },
  input:{
    backgroundColor:black,
    color: white,
    borderColor: lightgray
  },
  register:{
    backgroundColor:blue,
    color: black,
  },
  borderTextContainer:{
    backgroundColor: black,
  },
  borderText:{
    color: lightgray,
  },
  loginText:{
    color: blue,
  },
  loginQuestion:{
    color:white
  },
  imageButton:{
    backgroundColor: black,
  }
});

export default Register;
