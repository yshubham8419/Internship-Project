const dbconnect = require('../lib/dbConnection')

const collectionName = 'leaderboard';

async function getLeaderboard (ID) {
    const db = await dbconnect(collectionName);
    const leaderboards = await db.find({quizID : ID}).toArray();

    return leaderboards[0];
}


async function updateLeaderboard(ID, uname, marks) {
    const db = await dbconnect(collectionName);
    const quizzes = await db.find({quizID : ID}).toArray();

    if(quizzes.length == 0) {
        var ranks = [];
        ranks.push([uname, marks]);

        db.insertOne({quizID : ID,
            ranks});

        return;
    }

    const quiz = quizzes[0];

    var ranksArray = quiz.ranks;

    ranksArray.push(['NULL', 0]);
    var i;

    for(i = ranksArray.length - 1; i > 0; i--) {
        if(ranksArray[i - 1][1] >= marks) {
            break;
        }

        ranksArray[i][1] = ranksArray[i - 1][1];
        ranksArray[i][0] = ranksArray[i - 1][0];
    }

    ranksArray[i] = [uname, marks];

    db.updateOne( { quizID: ID },
        {
        $set: {
            ranks : ranksArray
        }
    })
}

module.exports = {updateLeaderboard, getLeaderboard};
