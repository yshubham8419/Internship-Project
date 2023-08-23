import React, { useContext, useState, useEffect } from 'react';
import { white ,blue } from '../Constants';
import { AppContext } from "../AppContext";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

async function findQuiz(serverUrl,quizId, onSuccess, onFailure) {
    const data = {
      "quizID" : quizId
    }
    const loginurl = serverUrl+"/getQuiz"
    axios.post(loginurl, data)
      .then(response => {
        if (response.data.success) onSuccess(response.data)
        else onFailure(response.data)
      })
      .catch(error => {
        onFailure({ 'message': error })
      })
  }

function FindQuiz(props) {

    const [localQuizId,setLocalQuizID] = useState("");
    const [quizFound,setQuizFound] = useState(false);
    const [quizTitle,setQuizTitle]=useState('Random title')
    const {setQuestion,setOption,setQuizId,setQuizPrepared,setTitle,setDescription,username,serverUrl, sessionId, setUsername}=useContext(AppContext)
    const navigate = useNavigate();

    setUsername(sessionId);                                  {/*Username is used for sessionId*/}

    useEffect(
        ()=>{
            if(!sessionId) {
                navigate("/login");
            }
            return ()=>{
                
            };
        },[]
    );


    const onQuizFound=(data)=>{
        setQuizFound(true)
        setQuizTitle(data.quizTitle)
        setTitle(data.quizTitle)
        setDescription(data.quizDescription)
        setQuestion(data.questions)
        setQuizId(data.quizID)
        setQuizPrepared(true)
        setOption(data.options)
        console.log(data.option)
    }
    const onQuizNotFound =(data)=>{
        setQuizPrepared(false)
        setQuizFound(false)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            findQuiz(serverUrl,localQuizId,onQuizFound,onQuizNotFound)
        }
    }
    
    const styles={
        formContainer:{   
            display:'flex',
            backgroundColor:white,
            width:'60vw',
            marginTop:'6vh',
            marginLeft:'6vh',
            borderTopLeftRadius:'3vw',
            borderTopRightRadius:'3vw',
            height: '94vh',
            alignItems:'center',
            flexDirection:'column'
         },
        usernameHeading:{
            textAlign: 'center',
            fontSize:'5vh',
            fontWeight:'Bold',
            marginTop:'3vh',
        },
        welcome:{
            textAlign:'center',
            color:blue,
            marginTop:'-1.5vh',
            width:'20vw',
            fontSize:'3vh'
        },
        container:{

        },
        inputContainer:{
            backgroundColor:'#A1A1A2',
            width:'40vw',
            height:'6vh',
            
            borderRadius:'3vh',
            display:'flex',
            alignItems:'center'
        },
        input:{
            flex:'1',
            height:'100%',
            backgroundColor:"#00000000",
            borderRadius:'3vh',
            border:'none',
            outline:'none',
            fontSize:'3vh',
            color:white,
            marginLeft:'0.5vw'
        },
        searchImg:{
            marginLeft:'2vw',
            height: '4vh',
            aspectRatio:1
        },
        profileImg:{
            marginTop:'6vh',
            height:'35vh',
            aspectRatio:1
        },
        resultContainer:{
            display:'flex',
            height:'9vh',
            alignItems:'center',
            // backgroundColor:'yellow'
        },
        calenderImage:{
            width:'2.5vw',
            aspectRatio:1,
            marginLeft:'3vw',
        },
        searchAndResult:{
            borderRadius:'3vh',
            backgroundColor:'#D0D0D088',
            marginTop:'5vh',
            overflow:'hidden',
            border:'none',
            width:'40vw',
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        },
        quizTitle:{
            width:'36.5vw',
            textAlign:'left',
            marginLeft:'1vw',
            fontSize:'3vh'

        },
        padhakuBoyImg:{
            height:'20vh',
            width:'30vw'
        }

    }

    return (
        <div style={styles.formContainer}>
            <img style={styles.profileImg}src={require('./assets/profileImage.png')}/>
            <h1 style={styles.usernameHeading}>@{username}</h1>
            <h2 style ={styles.welcome}>Welcome Back!</h2>
            
                <div  style={styles.searchAndResult}>
                    
                    <div style={styles.inputContainer}>
                        <img style ={styles.searchImg}src={require('./assets/Search.png')}/>
                        <input value={localQuizId}  
                            onChange={(e)=>{setLocalQuizID(e.target.value)}} 
                            type='text' 
                            style={styles.input}
                            onKeyDown={handleKeyDown}
                                />
                    </div>
                    <Link to={'/TakeQuiz'} style={{textDecoration:'none',color:'black'}}>
                    {quizFound &&
                        <div style ={styles.resultContainer}>
                            <img style={styles.calenderImage} src={require('./assets/calenderIcon.png')}></img>
                            <h1 style={styles.quizTitle}>{quizTitle}</h1>
                        </div>
                    }
                    </Link>
                </div>
            {!quizFound && <img style={styles.padhakuBoyImg} src ={require("./assets/padhakuBoy.png")}/>}
        </div>
    );
}

export default FindQuiz;
