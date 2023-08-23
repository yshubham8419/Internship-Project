import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import FindQuiz from "./Dashboard/FindQuiz";
import CreateQuiz from './Dashboard/CreateQuiz';
import LeaderBoard from './Dashboard/LeaderBoard';
import TakeQuiz from './Dashboard/TakeQuiz';
import NavBar from './NavBar/NavBar';
import Login from './Login/Login'
import Signup from "./Signup/Signup";
import Home from "./Home/Home";

function App() {
  const styles = {
    appStyle: {
      display: 'flex',
      background: 'linear-gradient(to right, #7DB2EB, #7DEBC1)'
    }
  };
  
  return (
    <Router>
        <div style={styles.appStyle}>
          <NavBar/>
          <Routes>
            <Route path='/' element ={<Home/>}/>
            <Route path='/login' element ={<Login/>}/>
            <Route path='/signup' element ={<Signup/>}/>
            <Route path="/FindQuiz" element={<FindQuiz/>}/>
            <Route path="/CreateQuiz" element={<CreateQuiz/>} />
            <Route path="/LeaderBoard" element={<LeaderBoard/>} />
            <Route path="/TakeQuiz" element={<TakeQuiz/>} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
