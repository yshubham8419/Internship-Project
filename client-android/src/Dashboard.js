import {StyleSheet, TouchableOpacity, View, Image ,Dimensions, Keyboard} from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import Dashboard_Home from './Dashboard_Home';
import Dashboard_Create from './Dashboard_Create';
import LeaderBoard from './LeaderBoard';
import Dashboard_Quiz from './Dashboard_quiz';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();


const Dashboard=({navigation})=>{
    
    const {height:screenHeight} = Dimensions.get('window');
    const {width:screenWidth}=Dimensions.get('window');
    const {isQuizPrepared, resetStates} = useContext(AppContext)
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
          resetStates()
        };
      }, []);
    
      const handleKeyboardShow = (event) => {
        setKeyboardVisible(true);
      };
    
      const handleKeyboardHide = () => {
        setKeyboardVisible(false);
    };
    

    const CustomTabBar = ({ state, descriptors, navigation , parentNavigation}) => {
        const navState = navigation.getState()
        const activeFragment = navState.routes[navState.index].name

        const styles=StyleSheet.create({
            container:{
                width:screenWidth,
                alignItems:'center',
                backgroundColor:'#00000000'
            },
            navigationContainer:{
                width:(0.80 *screenWidth),
                height:(0.075*screenHeight),
                borderRadius:(0.075*screenHeight/2),
                backgroundColor:'#191a28',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-around'
            },
            logo:{
                height:(0.065*screenHeight),
                aspectRatio:1
            },
            createIcon:{
                opacity:((activeFragment == 'Create')?1:0.5),
                height:(0.040*screenHeight),
                aspectRatio:1
            },
            quizIcon:{
                opacity:((activeFragment == 'Quiz')?1:0.5),
                height:(0.040*screenHeight),
                aspectRatio:1
            },
            supportIcon:{
                opacity:((activeFragment == 'Support')?1:0.5),
                height:(0.040*screenHeight),
                aspectRatio:1
            },
            LeaderBoardIcon:{
                opacity:((activeFragment == 'LeaderBoard')?1:0.5),
                height:(0.040*screenHeight),
                aspectRatio:1
            },
            bg:{
                width:screenWidth,
                height:screenHeight,
                position:'absolute'
            }
        });

        return (
            <View style = {styles.container}>
                {!isKeyboardVisible && <View style={styles.navigationContainer}>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Home')
                    }}>
                        <Image source = {require('./assets/nav/logo.png') }  style={styles.logo}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('Create')
                        }}>
                        <Image source = {require('./assets/nav/createIcon.png')} style={styles.createIcon} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>{
                        navigation.navigate(isQuizPrepared?"Quiz":"Home");
                        }}>
                        <Image source = {require('./assets/nav/quizIcon.png')} style={styles.quizIcon} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>{
                        navigation.navigate(isQuizPrepared?"LeaderBoard":"Home");
                        }}>
                        <Image source = {require('./assets/nav/leaderBoardIcon.png')} style={styles.LeaderBoardIcon} ></Image>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={()=>{
                        parentNavigation.goBack()
                        }}>
                        <Image source = {require('./assets/nav/logoutIcon.png')} style={styles.supportIcon} ></Image>
                    </TouchableOpacity>
                </View>}
            </View>
        );
    };


    return(
            <NavigationContainer independent={true}>
                <Tab.Navigator screenOptions={{headerShown:false}} t tabBar={(props)=><CustomTabBar {...props} parentNavigation={navigation}/>}>
                    <Tab.Screen name="Home" component={Dashboard_Home} />
                    <Tab.Screen name="Create" component={Dashboard_Create} />
                    <Tab.Screen name="Quiz" component={Dashboard_Quiz} />
                    <Tab.Screen name="LeaderBoard" component={LeaderBoard} />
                </Tab.Navigator>
            </NavigationContainer>

    );


}

export default Dashboard;