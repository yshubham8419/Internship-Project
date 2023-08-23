import React, { useContext, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { AppContext } from "../AppContext";

async function tryRegister(serverUrl, username, password, repeatPassword, onSuccess, onFailure) {
    if (repeatPassword !== password) {
        onFailure({ 'message': "passwords didn't match" })
        return;
    }
    const data = {
        name: username,
        password: password
    };
    const registerurl = serverUrl + "/signup"
    console.log(username, password)
    axios.post(registerurl, data)
        .then(response => {
            console.log(response.data)
            if (response.data.success) onSuccess(response.data)
            else onFailure(response.data)
        })
        .catch(error => {
            onFailure({ 'message': error })
        })
}

function Signup(props) {
    const navigate = useNavigate();
    const { serverUrl, setSessionId } = useContext(AppContext);
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [registerInProgress, setRegisterInProgress] = useState(false)

    const onRegisterSucceed=(data)=>{
        setRegisterInProgress(false)
        setSessionId(data.sessionId)
        navigate('/FindQuiz')
    }
    const onRegisterFailure =(data)=>{
        console.log(data)
        setRegisterInProgress(false)
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
          paddingLeft:'2vw',
          height: '39vw',   //40rem
          position: 'relative',
          zIndex: '1',
        },
        rightDiv: {
          paddingLeft : '0vw',
          //paddingTop : '15vw',
          width: '67vw',
          borderRadius: '60px 0 0 60px',
          backgroundColor: 'white',
          display: 'grid',
          placeItems: 'center',
        },
        uNameInput: {
          display: 'flex',
          width: '42vw',
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
          width: '42vw',
          height: '50px',
          borderRadius: '15px',
          borderColor: 'gray',
          borderStyle: 'solid',
          fontSize: '18px',
          padding: '0px 20px',
          marginBottom: '3rem',
        },
        repPassInput: {
            display: 'flex',
            width: '42vw',
            height: '50px',
            borderRadius: '15px',
            borderColor: 'gray',
            borderStyle: 'solid',
            fontSize: '18px',
            padding: '0px 20px',
            marginBottom: '3rem',
        },
        button: {
          width: '24vw',
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
    
            <img src = {require("./assets/computer_1.png")} style = {styles.computer}></img>
          </div>
    
    
          <div style = {styles.rightDiv}>
            <div>
    
              <p style = {{fontWeight:'bold', fontSize:'3rem', textAlign:'left', marginBottom:'3vw'}}> Create Account </p>
              
              <input type="text" value={username} onChange={(e)=>{setUsername(e.target.value)}} style={styles.uNameInput} placeholder="Username" />
              
              <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} style={styles.passInput} placeholder="Password" />
              
              <input type='password' value={repeatPassword} onChange={(e)=>{setRepeatPassword(e.target.value)}} style={styles.repPassInput} placeholder="Repeat Password" />

              <div onClick={()=>{tryRegister(serverUrl, username, password, repeatPassword, onRegisterSucceed, onRegisterFailure); setRegisterInProgress(true)}} style={styles.button}>
                <h4 style={{cursor: 'pointer', fontSize: '2rem'}}>{registerInProgress?'Signing up...':"Create Account"}</h4>
              </div>

              <p style={styles.link}>Already have an account?
                <Link style={{ textDecoration: 'none' }} to="/login"> Login </Link>
              </p>
            </div>
          </div>
        </div>
      );
}

export default Signup;