import {StyleSheet, Text, View,Image ,Dimensions, FlatList} from 'react-native'
import React, { useContext, useState } from 'react';
import { black, blue, white } from './Constants';
import { AppContext } from './AppContext';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
async function getLeaderBoard(serverUrl, data, onSuccess, onFaliure) {
    const url = serverUrl+"/getLeaderboard"
    axios.post(url, data)
      .then(response => {
        if (response.data.success) onSuccess(response.data)
        else onFaliure(response.data)
      })
      .catch(error => {
        onFaliure({ 'message': error })
      })
  }
  

const LeaderBoard =()=>{
    const {height:screenHeight} = Dimensions.get('window');
    const {width:screenWidth}=Dimensions.get('window');
    const {quizId,serverUrl} = useContext(AppContext)
    const [getting,setGetting]=useState(false)
    const [list,setList]=useState([]);
    const [gotList,setgotList]=useState(false);

    useFocusEffect(
        React.useCallback(()=>{
            const data={
                quizID:quizId
            }
            setGetting(true)
            getLeaderBoard(serverUrl,data,onGetSucceed,onGetFailed)
            return ()=>{
                setList([])
                setgotList(false)
            };
        },[])
    );
    
    const onGetSucceed=(data)=>{
        setGetting(false)
        setgotList(true)
        const myarr = new Array() 
        var i = 1
        for(const element of data.list){
            const temparr={
                username:element[0],
                points:element[1],
                rank:i,
            }
            i++;
            myarr.push(temparr);
        }
        setList(myarr)
    }

    const onGetFailed=(data)=>{
        setGetting(false)
        setgotList(false)
    }

    

    
    const styles=StyleSheet.create({
        page:{
            width:screenWidth,
            height:screenHeight,
            alignItems:'center'
        },
        pageHeading:{
            fontSize:32,
            fontWeight:'500',
            marginTop:(0.05*screenHeight)
        }
        ,
        listContainer:{
            width:(0.8*screenWidth),
            height:(0.8*screenHeight),
            backgroundColor:'#909090dd',
            borderRadius:(0.1*screenWidth),
            alignItems:'center',
        },
        lbItems:{
            width:(0.6*screenWidth),
            height:(0.1*screenHeight),
            backgroundColor:white,
            borderRadius:(0.02*screenHeight),
            flexDirection:'row',
            marginVertical:10
        },
        profileImage:{
            backgroundColor:blue,
            width:(0.17*screenWidth),
            height:(0.1*screenHeight),
            borderRadius:(0.02*screenHeight)
        },
        rank:{
            fontSize:25,
            color:black,
            fontWeight:'700',
            marginLeft:(0.2*screenWidth),
            marginTop:(0.01*screenHeight),
            position:'absolute'

        },
        usernames:{
            fontSize:25,
            color:black,
            fontWeight:'700',
            marginLeft:(0.2*screenWidth),
            marginTop:(0.05*screenHeight),
            position:'absolute'
        },
        points:{
            fontSize:15,
            color:black,
            marginLeft:(0.45*screenWidth),
            marginTop:(0.005*screenHeight),
            position:'absolute'
        }
        ,
        bg:{
            width:screenWidth,
            height:screenHeight,
            position:'absolute'
        }
    });


    const RenderItem=({item})=>{
        return(
            <View style = {styles.lbItems}  key={item.rank}>
                        <Image source = {require('./assets/LeaderBoard/profile1.png')} style={styles.profileImage} resizeMode='contain' />
                        <Text style = {styles.rank}>{item.rank}.</Text>
                        <Text style = {styles.usernames}>{item.username}</Text>
                        <Text style={styles.points}>{item.points} pts</Text>
                    </View> 
        );
    }


    return(
        <View style={styles.page}>
            <Image  source={require('./assets/LeaderboardBGLight.png')} style={styles.bg}/>
            <Text style={styles.pageHeading}>
                LeaderBoard
            </Text>
            <View style={styles.listContainer}>
            <FlatList
                data={list}
                renderItem={({item })=><RenderItem item ={item}/>}
                keyExtractor={(item)=>item.rank.toString()}
            />
            </View>
        </View>
    );
}

export default LeaderBoard;