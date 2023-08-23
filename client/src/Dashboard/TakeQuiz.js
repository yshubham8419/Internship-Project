import './modal.css';
import React, { useContext, useEffect, useState } from 'react';
import { white } from "../Constants";
import { AppContext } from "../AppContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

async function SendQuiz(serverUrl,data, onSuccess, onFailure) {
    const url = serverUrl+"/submitQuiz"
    axios.post(url, data)
      .then(response => {
        console.log(response.data);
        if (response.data.success) onSuccess(response.data)
        else onFailure(response.data)
      })
      .catch(error => {
        onFailure({ 'message': error })
      })
  }
  

function TakeQuiz(props) {

    const {question,option,quizId,isQuizPrepared,title,description,username,serverUrl,sessionId}=useContext(AppContext)
  

    let arr=[]
    let arr2 = []
    for(let i=1;i<=question.length;i++){
    arr.push(i);
    arr2.push(5)
    }


    const [answer] = useState(arr2)
    const [numbers, setNumbers] = useState(arr)
    const [current, setCurrent] = useState(0);
    const [updatevar, update] = useState(false);
    const [sending , setSending] = useState(false);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(!sessionId) {
                console.log(sessionId);
                console.log("hello people");
                navigate("/login");
            }
            if(!isQuizPrepared){
                navigate('/FindQuiz')
            }
            return ()=>{
                
            };
        },[]
    );

    const onSendSuccess=(data)=>{
    setSending(false)
    console.log("passed")
    console.log(data)

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
        window.location.href = "#hidden";
    }

    const headHome = () => {
        window.location.href = "/FindQuiz";
    }

    const headLeaderboard = () => {
        window.location.href = "/Leaderboard";
    }

    const styles = {
        pageContainer:{
            height:'94vh',
            width:'80vw',
            backgroundColor: white,
            marginLeft:'5vw',
            marginTop:'6vh',
            borderTopLeftRadius:'2vw',
            borderTopRightRadius:'2vw',
            display:'flex',
            flexDirection:'row',
        },
        formContainer:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            width:'50vw',
            marginTop:'4vh',
        },
        questionTab:{
            height:'87vh',
            width:'34%',
            backgroundColor:'#A1A1A288',
            marginTop:'4vh',
            borderRadius:'2vh',
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        },
        heading:{
            fontSize:'4vh',
            width:'44vw',
            height:'5vh',
        },
        formContainer2:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            marginTop:'0',
            width:'44vw',
            backgroundColor:'#A1A1A288',
            height:'87vh',
            borderRadius:'3vh',
            justifyContent:'space-around'
            
        },
        titleAndDescription:{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-around',
            marginTop:'2vh',
            backgroundColor:white,
            height:'18vh',
            width:'40vw',
            borderRadius:'3vh',
            alignItems:'center'
        },
        questionContainer:{
            height:'12vh',
            width:'40vw',
        },
        optionContainer:{
            height:'6vh',
            width:'40vw',
            borderRadius:'1vh',
            border:'none',
            display:'flex',
            flexDirection:'row',
            alignItems:'center'
        },
        lastOptionContainer:{
            height:'6vh',
            width:'40vw',
            borderRadius:'1vh',
            border:'none',
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            marginBottom:'4vh'
        },
        newIcon:{
            height:'6vh',
            aspectRatio:1
        },
        titleContainer:{
            marginTop:'2vh',
            width:'94%',
            height:'45%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start',

        },
        descriptionContainer:{
            width:'94%',
            height:'45%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'flex-start'
        },
        // titleText:{
        //     display:'inline-block',
        //     margin:'0',
        //     fontSize:'4vh',
        //     fontWeight: 'Bold'
        // },
        questionText:{
            margin:'0',
            fontSize:'2.7vh',
            fontWeight:'bold',
        },
        // descriptionText:{
        //     display:'inline-block',
        //     margin:'0',
        //     fontSize:'3vh'
        // },
        questionInput:{
            flex:'1',
            fontSize:'2vh',
            marginTop:'2vh',
            border:'none',
            outline:'none',
            resize:'none',
            width:'39vw',
            backgroundColor:'#00000000',
            cursor:'default'
        },
        optionInput:{
            flex:1,
            height:'100%',
            border:'none',
            outline:'none',
            backgroundColor:'transparent',
            fontSize:'2vh',
            marginLeft:'0.5vw',
            cursor:'default'
        },
        optionText:{
            marginLeft:'1.5vw',
            fontSize:'2.3vh'
        },
        questionTxt2:{
            marginTop:'5vh',
            fontSize:'3vh'
        },
        listContainer:{
            height:'30vh',
            width:'21vw',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '10px',
            overflowY: 'scroll',
            marginLeft:'1vw'
        },
        outerListContainer:{
            marginTop:'1vh',
            height:'30vh',
            width:'19vw',
            overflow:'hidden'
        }
        ,
        button:{
            border:'none',
            height:'5vh',
            width:'10vw',
            borderRadius:'1vh'
        }
    }

    return (
        <div style={styles.pageContainer}>
            <div style={styles.formContainer}>
                <div style={styles.formContainer2}>
                    <div style={styles.titleAndDescription}>
                        <div style={styles.titleContainer}>
                            {/* <h2 style={styles.titleText}>Title:</h2> */}
                            <textarea readOnly={true} value={title} style={{
                                flex:'1',fontSize:'4vh',border:'none',outline:'none',resize:'none',marginLeft:'1vw',cursor:'default',fontWeight:'bold',paddingTop:'0'}} ></textarea>
                        </div>
                        <div style={styles.descriptionContainer}>
                        {/* <h2 style={styles.descriptionText}>Description:</h2> */}
                        <textarea readOnly={true} value={description} style={{
                            flex:'1',fontSize:'2.8vh',border:'none',outline:'none',resize:'none',marginLeft:'1vw',cursor:'default',fontWeight:'bold', paddingTop:'0'}} ></textarea>
                        </div>
                    </div>
                    <div style={styles.questionContainer}>
                        <h2 style={styles.questionText}>Question {current+1}:</h2>
                        <textarea readOnly={true} style={styles.questionInput} value={question[current]} ></textarea>
                    </div>
                    <button 
                        onClick={(e)=>{answer[current]=1;update(!updatevar)}}
                        style={{...styles.optionContainer,...{backgroundColor : (answer[current]===1)?'white':'#A1A1A2'}}}>
                        <h2 style={styles.optionText}>A.</h2>
                        <input readOnly={true} style={styles.optionInput} value={option[current][0]}></input>
                    </button>
                    <button 
                        onClick={(e)=>{answer[current]=2;update(!updatevar)}}
                        style={{...styles.optionContainer,...{backgroundColor : (answer[current]===2)?'white':'#A1A1A2'}}}>
                        <h2 style={styles.optionText}>B.</h2>
                        <input readOnly={true} style={styles.optionInput} value={option[current][1]}></input>
                    </button>
                    <button 
                        onClick={(e)=>{answer[current]=3;update(!updatevar)}}
                        style={{...styles.optionContainer,...{backgroundColor : (answer[current]===3)?'white':'#A1A1A2'}}}>
                        <h2 style={styles.optionText}>C.</h2>
                        <input readOnly={true} style={styles.optionInput} value={option[current][2]}></input>
                    </button>
                    <button
                        onClick={(e)=>{answer[current]=4;update(!updatevar)}}
                        style={{...styles.lastOptionContainer,...{backgroundColor : (answer[current]===4)?'white':'#A1A1A2'}}}>
                        <h2 style={styles.optionText}>D.</h2>
                        <input readOnly={true} style={styles.optionInput} value={option[current][3]}></input>
                    </button>

                </div>
                
            </div>
            <div style={styles.questionTab}>
                <h1 style={styles.questionTxt2}>Questions
                </h1>
                <div style={{width:'20vw',height:'3px',backgroundColor:'black',marginTop:'1vh'}}></div>
                <div style={styles.outerListContainer}>
                    <div style={styles.listContainer}>
                        {
                            numbers.map((item, index) => (
                                <div  onClick={(e)=>{handleItemClick(index+1)}} style={{
                                    width:'3vw',height:'3vw',backgroundColor:index===current?'white':'black',
                                    borderRadius:'0.5vw',color:index===current?'black':'white',alignItems:'center',
                                    display:'flex',
                                    justifyContent:'center'}}>
                                <h1 style={{cursor:'default',fontSize:'2vw'}}>{numbers[index]}</h1>
                                </div>
                            ))
                    }
                    </div>
                </div>
                <div style={{width:'20vw',height:'3px',backgroundColor:'black',marginTop:'1vh'}}></div>
                <div style = {{display:'flex',flexDirection:'row',alignItems:'center',marginTop:'4vh'}}>
                    <div style={{width:'3vw',height:'3vw',backgroundColor:'black',borderRadius:'0.5vw'}}></div>
                    <h2 style={{width:'10vw', marginLeft:'1vw',cursor:'default',fontSize:'2.5vh'}}>Completed</h2>
                </div>
                <div style = {{display:'flex',flexDirection:'row',alignItems:'center',marginTop:'1vh'}}>
                    <div style={{width:'3vw',height:'3vw',backgroundColor:'white',borderRadius:'0.5vw'}}></div>
                    <h2 style={{width:'10vw', marginLeft:'1vw',cursor:'default',fontSize:'2.5vh'}}>Current</h2>
                </div>
                <div style={{display:'flex',flexDirection:'row',marginTop:'12vh',width:'21vw',justifyContent:'space-around'}}>
                <button onClick={onSubmit} style={styles.button}>{sending?"Sending" :"Submit"}</button>
                </div>

                {/* Modal */}

                <div className="overlay" id='hidden'>
                    <div className="containerInvisible">
                        <b><h1> Your Attempt has been submitted</h1></b><br />
                        {/* <h2 className='title'>{Data.quizTitle}</h2>
                        <p className='description'>{Data.quizDescription}</p>
                        <p className='total'>Total questions : {Data.question.length}</p> */}
                        <div className="link">
                            {/* <h3>Link:</h3> */}
                            {/* <div className="copy-link">
                                <input type="text" className="Link" placeholder="QuizID" value="QuizID" /><button className='copyButton'><span className="material-icons">content_copy</span></button>
                            </div><br /> */}
                            <button className='btn btn-primary' id='homeButton' onClick={headHome}>Head to HomePage</button>
                            {/* <button className='btn btn-primary' id='leaderboardButton' onClick={headLeaderboard}>Head to Leaderboard</button> */}
                        </div>
                    </div>
                </div>
                {/* END */}
            </div>
        </div>
    );
}

export default TakeQuiz;