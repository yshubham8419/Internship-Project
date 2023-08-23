import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Image, Dimensions, FlatList, ToastAndroid, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { black, white, lightgray } from './Constants';
import axios from 'axios';
import { AppContext } from './AppContext';
import Clipboard from '@react-native-clipboard/clipboard';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

async function SendQuiz(serverUrl, data, onSuccess, onFaliure) {
  const url = serverUrl + "/createQuiz"
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

const Dashboard_Create = ({navigation}) => {


  const { height: screenHeight } = Dimensions.get('window');
  const { width: screenWidth } = Dimensions.get('window');
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [numbers, setNumbers] = useState([1])
  const [question, setQuestion] = useState([""]);
  const [option, setOption] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState([""]);
  const [current, setCurrent] = useState(0);
  const [updatevar, update] = useState(false);
  const [sending, setSending] = useState(false);
  const { serverUrl } = useContext(AppContext)
  const [isPopupVisible, setPopupVisible] = useState(false)
  const [quizId, setQuizId] = useState('')
  const isFocused = useIsFocused();


  const resetStateVariables = () => {
    setTitle("")
    setDescription("")
    setNumbers([1])
    setQuestion([""]);
    setOption(["", "", "", ""])
    setAnswer([""])
    setCurrent(0)
    update(false)
    setSending(false)
    setPopupVisible(false)
    setQuizId("")
  }
  

  useEffect(() => {
    if (!isFocused && isPopupVisible) {
      resetStateVariables();
    }
  }, [isFocused]);

  const onCopyClicked = () => {
    Clipboard.setString(quizId)
  }
  const onOkClicked = () => {
    resetStateVariables()
  }
  const onSendSuccess = (data) => {
    setQuizId(data.quizId)
    setPopupVisible(true)
    setSending(false)
  }

  const onSendFailure = (data) => {
    setSending(false)
  }

  const onAddPress = () => {
    const newquestion = [...question]; newquestion.push("")
    const newoption = [...option]; newoption.push("", "", "", "")
    const newanswer = [...answer]; newanswer.push("")
    const newnumbers = [...numbers]; newnumbers.push(numbers.length + 1)
    setAnswer(newanswer);
    setQuestion(newquestion)
    setOption(newoption)
    setNumbers(newnumbers)
    setCurrent(newnumbers.length - 1)
    console.log(question, option, answer, numbers)
  }

  const onDeletePress = () => {
    const newquestion = [...question]; newquestion.splice(current, 1);
    const newoption = [...option]; newoption.splice(current * 4, 4);
    const newanswer = [...answer]; newanswer.splice(current, 1);
    const newnumbers = [...numbers]; newnumbers.splice(newnumbers.length - 1, 1);
    if (newnumbers.length == 0) {
      newquestion.push("")
      newoption.push("", "", "", "")
      newanswer.push("")
      newnumbers.push(1)
    }
    setAnswer(newanswer);
    setQuestion(newquestion)
    setOption(newoption)
    setNumbers(newnumbers)
    setCurrent(newnumbers.length - 1)
  }

  const handleItemClick = (item) => {
    setCurrent(item - 1);
  };

  const onSubmit = () => {
    let newanswer = []
    for (const element of answer) {
      if (element.charAt(0) == 'a' || element.charAt(0) == 'A')
        newanswer.push(1)
      else if (element.charAt(0) == 'b' || element.charAt(0) == 'B')
        newanswer.push(2)
      else if (element.charAt(0) == 'c' || element.charAt(0) == 'C')
        newanswer.push(3)
      else if (element.charAt(0) == 'd' || element.charAt(0) == 'D')
        newanswer.push(4)
      else
        newanswer.push(5)
    }
    const data = {
      quizTitle: title,
      quizDescription: description,
      question: question,
      option: option,
      answer: newanswer
    }
    setSending(true);
    SendQuiz(serverUrl, data, onSendSuccess, onSendFailure)
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
      justifyContent: 'space-around',
    },
    questionAndNumber: {
      width: (0.8 * screenWidth),
      height: (0.1 * screenHeight),
    },
    optionContainer: {
      flexDirection: 'row',
      backgroundColor: lightgray,
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
      flexDirection: 'row',
      marginTop: 2
    },
    titleInput: {
      textAlignVertical: 'top',
      marginTop: -8
    },
    titleText: {
      fontSize: 20,
      marginLeft: (0.02 * screenWidth)
    },
    questionText: {
      fontSize: 15
    },
    CorrectOptionText: {
      marginLeft: (0.03 * screenWidth),
      fontWeight: '900'
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

    delete: {
      width: (0.2 * screenWidth),
      height: (0.05 * screenHeight),
      marginTop: (0.007 * screenHeight),
      position: 'absolute',
      marginLeft: (0.55 * screenWidth),
      backgroundColor: '#707070',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8
    }
    ,
    submit: {
      width: (0.2 * screenWidth),
      height: (0.05 * screenHeight),
      position: 'absolute',
      marginLeft: (0.55 * screenWidth),
      marginTop: (0.064 * screenHeight),
      backgroundColor: white,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      opacity: sending ? 0.5 : 1
    },
    bg: {
      width: screenWidth,
      height: screenHeight,
      position: 'absolute'
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
      <Image source={require('./assets/LeaderboardBGLight.png')} style={styles.bg} />
      <View style={styles.page}>
        <Text style={styles.pageHeading}>
          Create
        </Text>
        <View style={styles.Container}>
          <View></View>
          <View style={styles.titleAndDescription}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Title:</Text>
              <TextInput style={[styles.titleInput, { fontSize: 20, width: (0.63 * screenWidth), }]} multiline numberOfLines={2} value={title} onChangeText={setTitle} ></TextInput>
            </View>
            <View style={styles.title}>
              <Text style={styles.titleText}>Description:</Text>
              <TextInput style={[styles.titleInput, { fontSize: 17, width: (0.46 * screenWidth) }]} multiline numberOfLines={2} value={description} onChangeText={setDescription}></TextInput>
            </View>
          </View>
          <View style={styles.questionAndNumber}>
            <Text style={styles.questionText}>
              Question {current + 1} :
            </Text>
            <TextInput style={{ flex: 1, textAlignVertical: 'top' }} multiline value={question[current]} onChangeText={(text) => { question[current] = text; update(!updatevar) }} />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.optionNameContainer}>
              <Text style={styles.optionName}>A.</Text>
            </View>

            <TextInput style={styles.optionInput} value={option[current * 4]} onChangeText={(text) => { option[current * 4] = text; update(!updatevar) }} />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.optionNameContainer}>
              <Text style={styles.optionName}>B.</Text>
            </View>

            <TextInput style={styles.optionInput} value={option[current * 4 + 1]} onChangeText={(text) => { option[current * 4 + 1] = text; update(!updatevar) }} />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.optionNameContainer}>
              <Text style={styles.optionName}>C.</Text>
            </View>

            <TextInput style={styles.optionInput} value={option[current * 4 + 2]} onChangeText={(text) => { option[current * 4 + 2] = text; update(!updatevar) }} />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.optionNameContainer}>
              <Text style={styles.optionName}>D.</Text>
            </View>

            <TextInput style={styles.optionInput} value={option[current * 4 + 3]} onChangeText={(text) => { option[current * 4 + 3] = text; update(!updatevar) }} />
          </View>
          <View style={styles.optionContainer}>
            <View style={styles.CorrectOptionText}>
              <Text>Correct option</Text>
            </View>

            <TextInput style={styles.optionInput} value={answer[current]} onChangeText={(text) => { answer[current] = text; update(!updatevar) }} />
          </View>
          <TouchableOpacity onPress={onAddPress}>
            <Image source={require('./assets/Dashboard_create/new.png')} style={styles.newButton} >

            </Image>
          </TouchableOpacity>
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
            <TouchableOpacity style={styles.delete} onPress={onDeletePress}>
              <Text>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity disable={sending} style={styles.submit} onPress={onSubmit}>
              <Text >{sending ? "Sending" : "Submit"}</Text>
            </TouchableOpacity>

          </View>
          <View></View>
        </View>
        {isPopupVisible && <View style={{ width: screenWidth, height: screenHeight, backgroundColor: '#00000033',position:'absolute' }}>
          <View style={{
            width: 0.84 * screenWidth,
            height: 0.5 * screenHeight,
            backgroundColor: white,
            marginTop: 0.2 * screenHeight,
            marginLeft: 0.08 * screenWidth,
            borderRadius: 0.03 * screenWidth,
            alignItems: 'center',
            elevation: 5
          }} >
            <Text style={{ fontSize: 23, marginTop: 0.1 * screenHeight }}>Your Quiz has been hosted!</Text>
            <Text style={{ marginTop: 0.05 * screenHeight, fontSize: 18, maxWidth: 0.6 * screenWidth }} numberOfLines={2}>{title}</Text>
            <Text style={{ maxWidth: 0.5 * screenWidth }} numberOfLines={2}>{description}</Text>
            <Text style={{ marginTop: 0.05 * screenHeight }}>QuizId:</Text>
            <View style={{ backgroundColor: '#D9D9D9', marginTop: 0.01 * screenHeight, width: 0.65 * screenWidth, height: 0.05 * screenHeight, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
              <Text style={{ marginLeft: 0.02 * screenWidth }}>{quizId}</Text>
              <TouchableOpacity onPress={onCopyClicked}>
                <Image source={require("./assets/copyIcon.png")} style={{ width: 0.08 * screenWidth, height: 0.04 * screenHeight, marginRight: 0.02 * screenWidth }}></Image>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onOkClicked} style={{ marginTop: 0.02 * screenHeight, borderRadius: 0.01 * screenHeight, backgroundColor: "blue", width: 0.12 * screenWidth, height: 0.04 * screenHeight, justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ color: 'white', }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>}
      </View>

    </ScrollView>
  );
}
export default Dashboard_Create;