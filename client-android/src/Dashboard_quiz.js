import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Dimensions, FlatList, ToastAndroid, Clipboard} from 'react-native'
import React, { useContext, useState } from 'react';
import { black, blue, white, lightgray } from './Constants';
import { AppContext } from './AppContext';
import axios from 'axios';

async function SendQuiz(serverUrl,data, onSuccess, onFaliure) {
  const url = serverUrl+"/submitQuiz"
  axios.post(url, data)
    .then(response => {
      console.log(response.data);
      if (response.data.success) onSuccess(response.data)
      else onFaliure(response.data)
    })
    .catch(error => {
      onFaliure({ 'message': error })
    })
}

const Dashboard_Quiz= () => {
  
  const { height: screenHeight } = Dimensions.get('window');
  const { width: screenWidth } = Dimensions.get('window');
  const {question,option,quizId,isQuizPrepared,title,description,username,serverUrl}=useContext(AppContext)
  

  let arr=[]
  let arr2 = []
  for(let i=1;i<=question.length;i++){
    arr.push(i);
    arr2.push(5)
  }


  const [answer,setAnswer] = useState(arr2)
  const [numbers, setNumbers] = useState(arr)
  const [current, setCurrent] = useState(0);
  const [updatevar, update] = useState(false);
  const [sending , setSending] = useState(false);

  const onSendSuccess=(data)=>{
    setSending(false)
    console.log("passed")
    console.log(data)
    ToastAndroid.show('You got '+data.marks+" marks",ToastAndroid.SHORT)
    
  }
  const onSendFailure = (data)=>{
    console.log("failed")
    setSending(false)
  }
  

  const handleItemClick = (item) => {
    setCurrent(item - 1);
  };
  
  const onSubmit=()=>{
    const data ={
      username:username,
      quizID :quizId,
      sumbittedAnswers:answer
    }
    setSending(true);
    SendQuiz(serverUrl,data,onSendSuccess,onSendFailure)
  }



  const styles = StyleSheet.create({
    page: {
      width: screenWidth,
      height: screenHeight,
      alignItems: 'center'
    },
    pageHeading: {
      fontSize: 32,
      fontWeight: '500',
      marginTop: (0.02 * screenHeight)
    }
    ,
    Container: {
      width: (0.9 * screenWidth),
      height: (0.83 * screenHeight),
      backgroundColor: '#d0d0d0',
      borderRadius: (0.05 * screenWidth),
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    titleAndDescription: {
      width: (0.8 * screenWidth),
      height: (0.2 * screenHeight),
      backgroundColor: white,
      borderRadius: (0.02 * screenHeight), 
      justifyContent:'space-around'
    },
    questionAndNumber: {
      width: (0.8 * screenWidth),
      height: (0.1 * screenHeight),
    },
    optionContainer: {
      flexDirection: 'row',
      height: (0.05 * screenHeight),
      width: (0.8 * screenWidth),
      overflow: 'hidden',
      borderRadius: (0.025 * screenHeight),
      alignItems: 'center'
    },
    optionNameContainer: {
      height: (0.05 * screenHeight),
      aspectRatio: 1,
      borderRadius: (0.025 * screenHeight),
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    optionName: {
      fontWeight: '800'
    }
    ,
    optionInput: {
      flex: 1
    }
    ,
    newButton: {
      height: (0.05 * screenHeight),
      aspectRatio: 1
    },
    allQuestion: {
      height: (0.12 * screenHeight),
      width: (0.8 * screenWidth),
      backgroundColor: '#80808077',
      borderRadius: (0.03 * screenHeight),
      flexDirection: 'row',
    },
    title: {
      height:(0.08*screenHeight),
      flexDirection: 'row',
      marginTop: 2
    },
    titleInput: {
      textAlignVertical: 'top',
    },
    titleText: {
      fontSize: 20,
      marginLeft: (0.02 * screenWidth),
    },
    questionText: {
      fontSize: 15
    },
    questionItem: {
      marginTop: 5,
      marginLeft: 4,
      width: (0.1 * screenWidth),
      aspectRatio: 1,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    listContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: (0.5 * screenWidth)
    },
    submit: {
      width: (0.2 * screenWidth),
      height: (0.05 * screenHeight),
      position: 'absolute',
      marginLeft: (0.55 * screenWidth),
      marginTop:(0.035*screenHeight),
      backgroundColor: white,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:8,
      opacity:sending?0.5:1
    },
    prevAndNext:{
      height: (0.06 * screenHeight),
      width: (0.8 * screenWidth),
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center'

    },
    prev:{
      height: (0.06 * screenHeight),
      width: (0.25 * screenWidth),
      textAlignVertical:'center',
      textAlign: 'center',
      backgroundColor:'#191A28',
      color:white,
      fontSize:18,
      borderRadius:(0.03 * screenHeight)
    },
    bg:{
      width:screenWidth,
      height:screenHeight,
      position:'absolute'
    }

  });

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View style={[styles.questionItem, { backgroundColor: (item == current + 1 ? white : black) }]}>
        <Text style={{ color: (item == current + 1 ? black : white) }}>{item}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView>
      <Image  source={require('./assets/LeaderboardBGLight.png')} style={styles.bg}/>
      <View style={styles.page}>
        <Text style={styles.pageHeading}>
        </Text>
        <View style={styles.Container}>
          <View></View>
          <View style={styles.titleAndDescription}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Title:</Text>
              <Text style={[styles.titleInput, { fontSize: 20, width: (0.63 * screenWidth), }]} numberOfLines={2} >
              {" "+title}
              </Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Description:</Text>
              <Text style={[styles.titleInput, { fontSize: 17, width: (0.46 * screenWidth) }]} numberOfLines={2} >
                {" "+description}
              </Text>
            </View>
          </View>
          <View style={styles.questionAndNumber}>
            <Text style={styles.questionText}>
              Question {current + 1} :
            </Text>
            <Text  style={{ flex: 1, textAlignVertical: 'top' }} >{question[current]}</Text>
          </View>
          <TouchableOpacity onPress={()=>{answer[current]=1;update(!updatevar)}}>
            <View style={[styles.optionContainer,{backgroundColor:answer[current]==1?white:lightgray}]}>
              <View style={styles.optionNameContainer}>
                <Text style={styles.optionName}>A.</Text>
              </View>

              <Text style={styles.optionInput}>{option[current][0]}</Text>

            </View>
          </TouchableOpacity >
          <TouchableOpacity onPress={()=>{answer[current]=2;update(!updatevar)}}> 
          <View style={[styles.optionContainer,{backgroundColor:answer[current]==2?white:lightgray}]}>
            <View style={styles.optionNameContainer}>
              <Text style={styles.optionName}>B.</Text>
            </View>

            <Text style={styles.optionInput} >{option[current][1]}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{answer[current]=3;update(!updatevar)}}>
          <View style={[styles.optionContainer,{backgroundColor:answer[current]==3?white:lightgray}]}>
            <View style={styles.optionNameContainer}>
              <Text style={styles.optionName}>C.</Text>
            </View>

            <Text style={styles.optionInput}>{option[current][2]}</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{answer[current]=4;update(!updatevar)}}>
          <View style={[styles.optionContainer,{backgroundColor:answer[current]==4?white:lightgray}]}>
            <View style={styles.optionNameContainer}>
              <Text style={styles.optionName}>D.</Text>
            </View>

            <Text style={styles.optionInput} >{option[current][3]}</Text>
          </View>
          </TouchableOpacity>
          
          <View style={styles.prevAndNext}>
            <TouchableOpacity onPress={()=>{if(current!=0)setCurrent(current-1)}}>
              <Text style={styles.prev} >
                &lt;  Prev
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{if(current!=question.length-1)setCurrent(current+1)}}>
              <Text style={styles.prev}>
                Next  &gt;
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.allQuestion}>
            <View style={styles.listContainer}>
              <Text style={{ fontSize: 50 }}>
                &#91;
              </Text>
              <FlatList
                data={numbers}
                renderItem={renderItem}
                keyExtractor={(item) => item}
                horizontal
              />
              <Text style={{ fontSize: 50 }}>
                &#93;
              </Text>

            </View>
            <TouchableOpacity disable = {sending} style={styles.submit} onPress={onSubmit}>
              <Text >{sending?"Sending" :"Submit"}</Text>
            </TouchableOpacity>
          </View>
          <View></View>
        </View>

      </View>

    </ScrollView>
  );
}
export default Dashboard_Quiz;