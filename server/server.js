const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const {insertUser, readUser} = require('./utils/loginInfo')
const {insertQuiz, getQuiz, getMarks} = require('./utils/quizActions')
const {updateLeaderboard, getLeaderboard} = require('./utils/leaderboardActions');


const app = express();
app.use(bodyParser.json());      

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});    

app.get('/signup', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../client/public/signup.html'));
});

app.post('/signup', async (req, res) => {
    //checking whether same username exists
    if(await readUser(req.body.name) != null) {
        //console.log('wow');
        res.send({'success':false, "message": "user with the same username already exists"})
    }

    else {
        try {
            console.log(req.body)
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const uName = req.body.name;

            insertUser(uName, hashedPassword);
            res.send({'success':true,"sessionId":uName})
            
        //   res.redirect('/login');
        }

        catch{
            res.send({'success':false,'message':'error occured'});
        }
    }

});

// app.get('/login', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '/../client/public/login.html'));
// });

app.post('/login', async (req, res) => {
    const user = await readUser(req.body.name);
    console.log(req.body);
    if(user == null) {
        return res.send({"success":false,"message":"Failed to login1"});
    }

    try {
    	
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send({"success":true,"sessionId":user.username});
        }

        else{
            res.send({"success": false,"message":'Failed to login2'});
        }
    }
    catch{
        res.status(500).send();
    }
});


// app.get('/createQuiz', (req, res) => {
//     res.sendFile(path.resolve(__dirname + '/../client/public/createQuiz.html'));
// });

app.post('/createQuiz', async (req, res) => {
    const title = req.body.quizTitle;
    const desc = req.body.quizDescription;
    const ques = req.body.question;
    const opts = req.body.option;
    const ans = req.body.answer;
    console.log(req.body)

    const quizID = await insertQuiz(title, desc, ques, opts, ans);
    res.send({"success":true,"quizId": quizID});
});


app.post('/getQuiz', async (req, res) => {
    const data = await getQuiz(req.body.quizID);
    console.log(data)
    if(data===null)
    	res.send({"success":false})
    else{
    	data["success"]=true;
    	res.send(data);
    }
});

app.post('/submitQuiz', async (req, res) => {
    const subAnswers = req.body.sumbittedAnswers;
    const uname = req.body.username;
    const ID = req.body.quizID;

    const marks = await getMarks(ID, subAnswers);

    await updateLeaderboard(ID, uname, marks);
    console.log(marks)
    res.send({"success":true,"marks": marks});
});

app.post('/getLeaderboard', async (req, res) => {
    const currentLeaderboard = await getLeaderboard(req.body.quizID);
	
    res.send({"success":true,
    "list":currentLeaderboard===undefined?[]:currentLeaderboard.ranks});
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}.`)
});
