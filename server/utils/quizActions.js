const dbconnect = require('../lib/dbConnection')
const {genRandomID} = require('./randomID');

const collectionName = 'quizData';

async function insertQuiz (title, desc, ques, opts, ans) {
    const ID = genRandomID();
    
    var options2DArr = [];
    var tempOptions = [];
    var totalNum = opts.length;

    for(var i = 0; i < totalNum; i++) {
        tempOptions.push(opts[i]);

        if(i % 4 == 3) {
            options2DArr.push(tempOptions);
            tempOptions = [];
        }
    }

    const db = await dbconnect(collectionName);
    db.insertOne({quizTitle : title,
                quizDescription : desc, 
                quizID : ID,
                questions : ques, 
                options : options2DArr, 
                answers : ans});

    return ID;
}

async function getQuiz (ID) {
    const db = await dbconnect(collectionName);
    const quizzes = await db.find({quizID : ID}).toArray();
    if(quizzes.length==0) return null;
    return quizzes[0];
}

async function getMarks(ID, subAnswers) {
    const db = await dbconnect(collectionName);
    const quiz = await db.find({quizID : ID}).toArray();
    const answersArray = quiz[0].answers;

    var marks = 0;
    for(var i = 0; i < answersArray.length; i++) {
        marks += (answersArray[i] == subAnswers[i]);
    }


    return marks;
}


module.exports = {insertQuiz, getQuiz, getMarks};
