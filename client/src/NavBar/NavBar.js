import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { white } from '../Constants';
import { AppContext } from "../AppContext";

function NavBar() {
  const location = useLocation()
  const { isQuizPrepared } = useContext(AppContext)
  const navStyle = {
    width: (location.pathname === '/FindQuiz') ? '30vw' : '6vw',
    height: '94vh',
    backgroundColor: white,
    marginLeft: '3vw',
    float: 'left',
    borderTopLeftRadius: '3vw',
    borderTopRightRadius: '3vw',
    marginTop: '6vh',
    display: 'flex',
    flexDirection: 'row',
  };

  const styles = {
    navContainer: {
      display: 'flex',
      backgroundColor: 'black',
      float: 'left',
      height: '100%',
      width: '6vw',
      borderTopLeftRadius: '3.5vw',
      borderTopRightRadius: '3.5vw',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    },
    logo: {
      height: '5vw',
      width: '5vw',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginTop: '3vh',
    },
    create: {
      height: '3vw',
      width: '3vw',
      marginTop: '15vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      opacity: (location.pathname === '/CreateQuiz' ? 1 : 0.5)
    },
    quiz: {
      height: '3vw',
      width: '3vw',
      marginTop: '4vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      opacity: (location.pathname === '/TakeQuiz' ? 1 : 0.5)
    },
    leaderboard: {
      height: '3vw',
      width: '3vw',
      marginTop: '4vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      opacity: (location.pathname === '/LeaderBoard' ? 1 : 0.5)
    },
    logout: {
      height: '3vw',
      width: '3vw',
      marginTop: '4vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      opacity: 0.5
    },
    textContainer: {
      marginTop: '4vh',
      paddingLeft: '3vw',
      height: '3vw',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconImg:{
      height:'3vw',
      width:'3vw'
    },
    navText:{
      fontSize:'3.2vh'
    }
  }

  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && <nav style={navStyle}>
        <div style={styles.navContainer}>
          <Link to="/FindQuiz">
            <img style={styles.logo} src={require('./assets/logo.png')}></img>
          </Link>
          <Link style={styles.create} to="/CreateQuiz">
            <img  style={styles.iconImg}src={require('./assets/createIcon.png')}></img>
          </Link>
          <Link style={styles.quiz} to={isQuizPrepared ? '/TakeQuiz' : '/FindQuiz'} >
            <img style={styles.iconImg} src={require('./assets/quizIcon.png')}></img>
          </Link>
          <Link style={styles.leaderboard} to={isQuizPrepared ? '/LeaderBoard' : '/FindQuiz'}>
            <img  style={styles.iconImg}src={require('./assets/leaderboardIcon.png')}></img>
          </Link>
          <Link style={styles.logout} to='/'>
            <img  style={styles.iconImg}src={require('./assets/logoutIcon.png')} onClick = {() => {sessionStorage.clear()}}></img>
          </Link>
        </div>

        
        {location.pathname === '/FindQuiz' && <div style={{ width: '24vw', marginTop: 'calc(14vh + 5vw)'}}>
          <Link to="/CreateQuiz" style={{ color: 'black', textDecoration: 'none' }}>
            <div style={styles.textContainer}>
              <h3 style={styles.navText} >Create</h3> 
            </div>
          </Link>
          <Link to={isQuizPrepared ? '/TakeQuiz' : '/FindQuiz'} style={{ color: 'black', textDecoration: 'none' }}>
            <div style={styles.textContainer}>
              <h3 style={styles.navText} >Quiz</h3>
            </div>
          </Link>
          <Link to={isQuizPrepared ? '/LeaderBoard' : '/FindQuiz'} style={{ color: 'black', textDecoration: 'none' }}>
            <div style={styles.textContainer}>
              <h3 style={styles.navText} >Leaderboard</h3>
            </div>
          </Link>
          <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
            <div style={styles.textContainer} onClick = {() => {sessionStorage.clear()}}>
              <h3 style={styles.navText} >Logout</h3>
            </div>
          </Link>
        </div>

        }
      </nav>}
    </>
  );
}


export default NavBar;
