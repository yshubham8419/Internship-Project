import bootstrap from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {

    const styles = {
        navbar: {
            marginTop:'2.5rem',
            marginLeft: '8vw',
            marginRight:"8vw"
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            alignItems:'center',
        },
        logo: {
            height: '5rem',
            width: '5rem',
            marginRight: '1rem',
        },
        title: {
            fontWeight: 'bold',
            paddingTop:'3vh',
            color:'white',
            fontSize:'2rem',
        },
        buttonSignUp:{
          border:'none',
          height:'2.4rem',
          width:'7rem',
          borderRadius:'1vh',
          backgroundColor:'#ffffff',
          fontWeight: 'bold',
          color:'grey'
        },
        buttonLogin:{
            border:'none',
            height:'2.4rem',
            width:'7rem',
            borderRadius:'1vh',
            backgroundColor:'transparent',
            fontWeight:'bold',
            color:'white'
        },
        centerDiv:{
            marginLeft: '8vw',
            marginRight:'8vw',
            padding:'0'
        },
        joinTitle:{
            fontWeight:'bold',
            color:'white',
            fontSize:'4.5rem',
            marginTop:'7rem',
            lineHeight:'1'
        },
        description:{
            //fontWeight:'bold',
            color:'grey',
            fontSize:'1.5rem',
            marginTop:'2rem',
            lineHeight:'1.7'
        },
        computerImage:{
            height:'32vw',    //30rem
            marginLeft:'10.1vw' //9.7rem
        },
        footer:{
            background:'linear-gradient(to right, #02c8fa, #7feafa)',
            margin:'0',
            textAlign:'center',
            paddingTop:'1rem',
            paddingBottom:'1rem',
            color:'white',
            fontWeight:'bold',
            fontSize:'2.3rem'
        },
        unp:{
            height:'5rem',
            marginLeft:'3vw',
            marginRight:'3vw',
        }

      }

    function handleSignUp() {
        window.location.href = "/signup";
    }

    function handleLogin() {
        window.location.href = "/login";
    }


    return (
        <div class="container-fluid" style={{padding:'0'}}>

            {/* Nav Bar */}

            <nav class="navbar navbar-expand-lg" style = {styles.navbar}>
                <div style = {styles.header}>
                    <img src = {require("./assets/logo.png")} style={styles.logo}></img>

                    <p style={styles.title}>QuizMasters</p>
                </div>
                
                <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbar">
                    <ul class="navbar-nav ms-auto" style={{alignItems:"center"}}>
                        <li class="nav-item"><button onClick={handleSignUp} class="nav-link" style={styles.buttonSignUp}>Sign Up</button></li>
                        <li class="nav-item"><button onClick={handleLogin} href="/login" class="nav-link" style={styles.buttonLogin}>Login</button></li>
                    </ul>
                </div>
            </nav>


            {/* Title */}

            <div class="row" style = {styles.centerDiv}>

                <div class="col-lg-6 container-fluid" style={{padding:'0'}}>
                    <p style={styles.joinTitle}>Join <br />QuizMasters Now!</p>
                    <p style={styles.description}>A platform for all your quiz needs! <br />Create and Compete in Quizzes all over the world!</p>
                </div>

                <div class="col-lg-6 container-fluid" style={{padding:'0'}}>
                    <img class="title-image" src={require('./assets/computer.png')} alt="computer-image" style={styles.computerImage} />
                </div>

            </div>


            {/* Footer */}

            <footer style = {styles.footer} id="footer">
                <div class="container-fluid" style={{padding:'0'}}>
                <p style = {{margin:'0'}}>Featured On <img src={require('./assets/UNP-logo.png')} style={styles.unp}/>.Education</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;