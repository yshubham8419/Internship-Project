import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Home({navigation}) {
    const { height: screenHeight } = Dimensions.get('window');
    const { width: screenWidth } = Dimensions.get('window');

    const styles = StyleSheet.create({
        page: {
            height: screenHeight,
            width: screenWidth
        },
        bg: {
            position: 'absolute',
        },
        logoImg: {
            position: 'absolute',
            aspectRatio: 1,
            height: (0.15 * screenWidth),
            marginLeft: 0.02 * screenWidth,
            marginTop: 0.02 * screenHeight
        },
        logotxt: {
            color: 'white',
            marginLeft: 0.25 * screenWidth,
            marginTop: 0.04 * screenHeight,
            fontSize: 28,
            fontWeight: '800'
        },
        computerImg: {
            position: 'absolute',
            height: 0.5 * screenHeight,
            width: 0.8 * screenWidth,
            marginTop: 0.07 * screenHeight,
            marginLeft: 0.1 * screenWidth
        },
        text: {
            fontSize: 24,
            fontWeight: '700',
            color: 'black',
            marginLeft: 0.1 * screenWidth
        },
        smalltext: {
            marginLeft: 0.1 * screenWidth
        },
        buttonContainer: {
            width: 0.3 * screenWidth,
            height: 0.06 * screenHeight,
            alignItems: 'center',
            justifyContent: 'center',
        },
        signup: {
            backgroundColor: 'white',
            borderRadius: 0.015 * screenHeight
        },
        container: {
            flexDirection: 'row',
            width: 0.4 * screenWidth,
            marginLeft: 0.2 * screenWidth,
            marginTop: 0.04 * screenHeight
        },
        container2: {
            backgroundColor: '#bbbb0044',
            width: screenWidth,
            height: 0.15 * screenHeight,
            marginTop: 0.06 * screenHeight,
            alignItems: 'center',
            justifyContent: 'center'

        },
        unplogo: {
            height: 0.1 * screenHeight,
            width: 0.1 * screenHeight,
        },
        text2: {
            fontSize: 20,
            fontWeight: '600',
        }

    });

    return (
        <View styles={styles.page}>
            <Image style={styles.bg}  source={require('./assets/Home-Light.jpg')}></Image>

            <Image style={styles.logoImg} resizeMode='contain' source={require('./assets/logo.png')}></Image>
            <Text style={styles.logotxt}>QuizMasters</Text>
            <Image resizeMode='contain' style={styles.computerImg} source={require('./assets/Home-computer.png')}></Image>
            <Text style={[styles.text, { marginTop: 0.45 * screenHeight }]}>Join</Text>
            <Text style={styles.text}>QuizMasters Now!</Text>
            <Text style={[styles.smalltext, { marginTop: 0.01 * screenHeight }]}>A platform for all your quiz needs!</Text>
            <Text style={styles.smalltext}>Create and Compete in Quizzes all over the world!</Text>
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{navigation.navigate('Register')}} style={[styles.buttonContainer, styles.signup]}>
                    <Text style={{ color: 'black' }}>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('Login')}} style={styles.buttonContainer}>
                    <Text style={{ color: 'black' }}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container2}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={styles.text2} >Featured On</Text>
                    <Image resizeMode='contain' style={styles.unplogo} source={require('./assets/UNPlogo.png')}></Image>
                    <Text style={styles.text2}>.Education</Text>
                </View>
            </View>

        </View>
    );
}

export default Home;