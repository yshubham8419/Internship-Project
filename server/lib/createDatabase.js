const {MongoClient}=require('mongodb')
//const url='mongodb://127.0.0.1:27017/'
const url='mongodb+srv://anshaggarwal490:ansh123@quizapp.vlbn2oi.mongodb.net/'
const client=new MongoClient(url);
const database='quizApp'
const collectionName=['credentials','quizData', 'leaderboard']

async function createDb(){
    let result=await client.connect();
    let db=result.db(database);
    for(var i = 0; i < collectionName.length; i++) {
        db.createCollection(collectionName[i], function (err) {
            if (err) throw err;
            console.log("database and Collection created!");
            client.close();
          });
    }
    
}
createDb();
module.exports={database,collectionName};
