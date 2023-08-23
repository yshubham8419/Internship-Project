import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from "../AppContext";
import axios from 'axios';


async function tryLogin(serverUrl,username, password, onSuccess, onFailure) {
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
      else onFailure(response.data)
    })
    .catch(error => {
      onFailure({ 'message': error })
    })
}

function Login(props) {
  const navigate=useNavigate();
  const { setSessionId, setUsername, serverUrl } = useContext(AppContext);
  const [localUsername, setLocalUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginInProgress, setLoginInProgress] = useState(false)
  const onLoginSucceed = (data) => {
    setUsername(data.username)
    setPassword('')
    setLoginInProgress(false)
    setSessionId(data.sessionId)
    navigate('/FindQuiz')
    //console.log(data)
  }

  const onLoginFailure = (data) => {
    setLoginInProgress(false)
    //console.log(data)
  }

  const styles = {
    main: {
      textAlign: 'center',
      display: 'flex',
      flex: 1,
      background: 'linear-gradient(to bottom left, #000000, #7DB2EB, #FFFFFF)',
    },
    leftDiv: {
      width: '33vw',
      height: '100vh',
      paddingBottom: '3.8rem',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0 0 20px',
    },
    logo: {
      height: '5vw', //'5rem',
      marginRight: '1rem',
      display:'inline',
    },
    title: {
      fontWeight: 'bold',
      paddingTop: '1rem',
      color: 'white',
      fontSize: '2vw', //'2rem',
      display: 'inline',
    },
    computer: {
      paddingLeft:'4vw',
      height: '38vw',   //40rem
      position: 'relative',
      zIndex: '1',
    },
    rightDiv: {
      paddingLeft : '8vw',
      //paddingTop : '15vw',
      width: '67vw',
      borderRadius: '60px 0 0 60px',
      backgroundColor: 'white',
      display: 'grid',
      placeItems: 'center',
    },
    uNameInput: {
      display: 'flex',
      width: '45vw',
      height: '50px',
      borderRadius: '15px',
      borderColor: 'gray',
      borderStyle: 'solid',
      fontSize: '18px',
      padding: '0px 20px',
      marginBottom: '3rem',
    },
    passInput: {
      display: 'flex',
      width: '45vw',
      height: '50px',
      borderRadius: '15px',
      borderColor: 'gray',
      borderStyle: 'solid',
      fontSize: '18px',
      padding: '0px 20px',
      marginBottom: '3rem',
    },
    button: {
      width: '17vw',
      height: '50px',
      borderRadius: '15px',
      backgroundColor: '#7DB2EB',
      color: 'white',
      border: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      marginBottom: '1rem',
    },
    link: {
      textAlign: 'left',
      fontSize: '1vw',
      fontWeight: '200px',
      color: 'grey',
    },
    
  };


  return (
    <div style = {styles.main}>

      <div style = {styles.leftDiv}>
        <div style = {styles.header}>
          <img src = {require("./assets/logo.png")} style = {styles.logo}></img>

          <p style = {styles.title}>QuizMasters</p>
        </div>

        <img src = {require("./assets/computer_2.png")} style = {styles.computer}></img>
      </div>


      <div style = {styles.rightDiv}>
        <div style={{paddingTop:'3rem'}}>

          <p style = {{fontWeight:'bold', fontSize:'3rem', textAlign:'left', marginBottom:'3vw'}}> Login </p>
          
          <input type="text" value={localUsername} onChange={(e)=>{setLocalUsername(e.target.value)}} style={styles.uNameInput} placeholder="Username" />
          
          <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} style={styles.passInput} placeholder="Password" />

          <div onClick={(e)=>{tryLogin(serverUrl, localUsername, password, onLoginSucceed, onLoginFailure); setLoginInProgress(true)}} style={styles.button}>
            <h4 style={{cursor: 'pointer', fontSize: '2rem'}}>{loginInProgress ? 'logging you in...' : "Login"}</h4>
          </div>

          <p style={styles.link}>Don't have an account?
            <Link style={{ textDecoration: 'none' }} to="/signup"> Sign Up </Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;