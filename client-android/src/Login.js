import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Dimensions, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react';
import { black, blue, white, lightgray } from './Constants';
import { AppContext } from './AppContext';
import axios from 'axios';


async function tryLogin(serverUrl,username, password, onSuccess, onFaliure) {
  const data = {
    "name": username,
    "password": password
  }
  const url = serverUrl+"/login"
  axios.post(url, data)
    .then(response => {
      response.data['username'] = username;
      console.log(response.data);
      if (response.data.success) onSuccess(response.data)
      else onFaliure(response.data)
    })
    .catch(error => {
      onFaliure({ 'message': error })
    })
}

const Login = ({ navigation }) => {

  const { isDarkTheme, toggleDarkTheme, setSessionId, setUsername ,serverUrl } = useContext(AppContext);
  const [localUsername, setLocalUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginInProgress, setLoginInProgress] = useState(false)
  const { height: screenHeight } = Dimensions.get('window');
  const { width: screenWidth } = Dimensions.get('window');
  const page = isDarkTheme ? dark.page : light.page;
  const formContainer = isDarkTheme ? dark.formContainer : light.formContainer;
  const inputContainer = isDarkTheme ? dark.inputContainer : light.inputContainer;
  const heading = isDarkTheme ? dark.heading : light.heading;
  const input = isDarkTheme ? dark.input : light.input;
  const login = isDarkTheme ? dark.login : light.login;
  const borderTextContainer = isDarkTheme ? dark.borderTextContainer : light.borderTextContainer;
  const borderText = isDarkTheme ? dark.borderText : light.borderText;
  const signupText = isDarkTheme ? dark.signupText : light.signupText;
  const signupQuestion = isDarkTheme ? dark.signupQuestion : light.signupQuestion;
  const imageButton = isDarkTheme ? dark.imageButton : light.imageButton;
  const imageSource = isDarkTheme ? require('./assets/switchInDark.png') : require('./assets/switchInLight.png');


  const onLoginSucceed = (data) => {
    setUsername(data.username)
    setLoginInProgress(false)
    setSessionId(data.sessionId)

    navigation.navigate("Dashboard")
  }

  const onLoginFaliure = (data) => {
    setLoginInProgress(false)
    ToastAndroid.show(data.message, ToastAndroid.SHORT);
  }
  

  const styles = StyleSheet.create({
    page: {
      height: screenHeight,
      width: screenWidth,
    },
    backgroundImage: {
      width: screenWidth,
      height: screenHeight,
      position: 'absolute'
    },
    logoContainer: {
      marginLeft: 8,
      marginTop: 8,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center'
    },
    logoText: {
      marginLeft: '3%',
      color: white,
      fontWeight: '700'
    },
    scrollview: {
      width: screenWidth
    },
    formContainer: {
      position: 'absolute',
      alignItems: 'center',
      width: screenWidth,
      marginTop: (0.35 * screenHeight),
      height: (0.65 * screenHeight),
      borderTopLeftRadius: (0.06 * screenHeight),
      borderTopRightRadius: (0.06 * screenHeight)
    },
    inputContainer: {
      marginTop: (0.05 * screenHeight),
      alignItems: 'center',
      width: screenWidth
    },
    heading: {
      width: (0.8 * screenWidth),
      marginTop: (0.1 * screenHeight),
      fontSize: 35,
      fontWeight: 'bold'
    },
    signupContainer: {
      marginTop: (0.02 * screenHeight),
      width: (0.8 * screenWidth),
      flexDirection: 'row'
    },
    input: {
      width: (0.8 * screenWidth),
      height: (0.06 * screenHeight),
      borderWidth: 1,
      borderRadius: (0.02 * screenHeight),
      paddingLeft: (0.055 * screenWidth),
      paddingVertical: 0
    },
    login: {
      marginTop: (0.04 * screenHeight),
      width: (0.8 * screenWidth),
      height: (0.065 * screenHeight),
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
    extraImg: {
      height: (0.4 * screenHeight),
      width: (0.4 * screenHeight),
      marginTop: (-0.27 * screenHeight),
      position: 'absolute',
    },
    switchContainer: {
      position: 'absolute',
      marginLeft: (0.78 * screenWidth),
      marginTop: (0.005 * screenHeight)
    },
    switchImage: {
      aspectRatio: 1,
      width: (0.08 * screenWidth)
    },
    logoImg: {
      aspectRatio: 1,
      width: (0.15 * screenWidth)
    }
  });

  return (
    <ScrollView>
      <View style={[styles.page, page]}>
        <Image source={require('./assets/Signup-Login-BG.jpg')} style={styles.backgroundImage} />
        <View style={styles.logoContainer}>
          <Image source={require('./assets/logo.png')} style={styles.logoImg} />
          <Text style={styles.logoText}>QuizMaster</Text>
        </View>

        <View style={[styles.formContainer, formContainer]} >
          <Image source={require('./assets/extraLogIn.png')} style={styles.extraImg} />

          <Text style={[styles.heading, heading]}>
            Login
          </Text>

          <View style={[styles.inputContainer, inputContainer]}>
            <TextInput value={localUsername} style={[styles.input, input]} onChangeText={setLocalUsername} />
            <View style={[styles.borderTextContainer, borderTextContainer]}>
              <Text style={[styles.borderText, borderText]}>Username</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={[styles.input, input]} secureTextEntry={true} value={password} onChangeText={setPassword} />
            <View style={[styles.borderTextContainer, borderTextContainer]}>
              <Text style={[styles.borderText, borderText]}>Password</Text>
            </View>
          </View>


          <TouchableOpacity
            disabled={loginInProgress}
            style={[styles.login, login, { opacity: loginInProgress ? 0.7 : 1 }]}
            onPress={() => {
              setLoginInProgress(true)
              tryLogin(serverUrl,localUsername, password, onLoginSucceed, onLoginFaliure)
            }}>
            <Text style={{ color: white, marginTop: 11, fontWeight: 'bold', fontSize: 16 }}>{loginInProgress ? "Logging you In..." : "Login"}</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={[signupQuestion]}>
              Don't have an account?{'\u00A0'}
            </Text>
            <TouchableOpacity disabled={loginInProgress} onPress={() => navigation.navigate("Register")}>
              <Text style={[signupText, { opacity: loginInProgress ? 0.5 : 1 }]}>
                Signup
              </Text>
            </TouchableOpacity>
          </View>

        </View>
        <TouchableOpacity onPress={() => toggleDarkTheme()} style={styles.switchContainer} >
          <Image source={imageSource} style={styles.switchImage} resizeMode='contain' />
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}





const light = StyleSheet.create({
  page: {
    backgroundColor: blue
  },
  formContainer: {
    backgroundColor: white
  },
  heading: {
    color: black
  },
  input: {
    backgroundColor: white,
    color: black,
    borderColor: black
  },
  login: {
    backgroundColor: blue,
    color: white,
  },
  borderTextContainer: {
    backgroundColor: white,
  },
  borderText: {
    color: black,
  },
  signupText: {
    color: blue,
  },
  signupQuestion: {
    color: black
  },
  imageButton: {
    backgroundColor: white,
  }
});


const dark = StyleSheet.create({
  page: {
    backgroundColor: blue
  },
  formContainer: {
    backgroundColor: black
  },
  heading: {
    color: white
  },
  input: {
    backgroundColor: black,
    color: white,
    borderColor: lightgray
  },
  login: {
    backgroundColor: blue,
    color: black,
  },
  borderTextContainer: {
    backgroundColor: black,
  },
  borderText: {
    color: lightgray,
  },
  signupText: {
    color: blue,
  },
  signupQuestion: {
    color: white
  },
  imageButton: {
    backgroundColor: black,
  }
});

export default Login;
