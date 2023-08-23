import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../AppContext";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


async function getLeaderBoard(serverUrl, data, onSuccess, onFailure) {
    const url = serverUrl+"/getLeaderboard"
    axios.post(url, data)
      .then(response => {
        if (response.data.success) onSuccess(response.data)
        else onFailure(response.data)
      })
      .catch(error => {
        onFailure({ 'message': error })
      })
  }

function LeaderBoard(props) {
    const {quizId,serverUrl, sessionId,isQuizPrepared} = useContext(AppContext)
    const [getting,setGetting]=useState(false)
    const [list,setList]=useState([]);
    const [gotList,setgotList]=useState(false);
    const navigate = useNavigate();

    useEffect(
        ()=>{
            if(!sessionId) {
                //console.log(sessionId);
                //console.log("hello people");
                navigate("/login");
                return ;
            }
            if(!isQuizPrepared){
                navigate('/FindQuiz')
                return ;
            }
            const data={
                quizID:quizId
            }
            setGetting(true)
            getLeaderBoard(serverUrl,data,onGetSucceed,onGetFailed)
            return ()=>{
                setList([])
                setgotList(false)
            };
        },[]
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
        console.log(myarr)
    }

    const onGetFailed=(data)=>{
        setGetting(false)
        setgotList(false)
    }

    const styles={
        page:{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            height:'94vh',
            width:'75vw',
            backgroundColor:'white',
            marginTop:'6vh',
            marginLeft:'7.5vw',
            borderTopLeftRadius:'2vw',
            borderTopRightRadius:'2vw',
        },
        gridContainer2:{
            height:'85vh',
            width:'70vw',
            backgroundColor:'#A1A1A288',
            marginTop:'6vh',
            borderRadius:'2vw',
            overflow:'hidden'
        },
        gridContainer:{
            height:'81vh',
            width:'69vw',
            backgroundColor:'transparent',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '1vh',
            overflowY: 'scroll',
            marginLeft:'2vw',
            marginTop:'2vh'
        },
        profileImage:{
            height:'100%',
            width:'25%',
            borderRadius:'1vh'
        },
        lbItem:{
            width:'20vw',
            height:'13vh',
            backgroundColor:'white',
            borderRadius:'0.5vw',
            display:'flex',
            flexDirection:"row",
        },
        rank:{
            marginLeft:'1vw',
            width:'1vw',
            fontSize:'2.5vh'
        },
        username:{
            marginTop:'8vh',
            marginLeft:'-1vw',
            width:'1vw',
            whiteSpace: 'nowrap',
            fontSize:'2.5vh'
        },
        points:{
            marginLeft:'10vw',
            fontSize:'min(1vw,2.5vh)'
        }
    }
    return (
        <div style={styles.page}>
            <h1 style={{fontWeight: 'Bold', margin: '2rem 0 0 0 '}}>LeaderBoard</h1>
            <div style={styles.gridContainer2}>
                <div style = {styles.gridContainer}>
                {
                    list.map((item, index) => (
                        <div style={styles.lbItem}>
                            <img style={styles.profileImage} src={require('./assets/profile1.jpg')} ></img>
                            <h2 style={styles.rank}>{list[index].rank}.</h2>
                            <h2  style={styles.username}>{list[index].username}</h2>
                            <h4 style={styles.points}>{list[index].points} pts</h4>
                        </div>
                    ))
                }
                </div>

            </div>
        </div>
    );
}

export default LeaderBoard;