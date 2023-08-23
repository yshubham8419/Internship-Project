const {MongoClient} = require('mongodb')
const url='mongodb://127.0.0.1:27017/'
const client = new MongoClient(url);

const dbName = 'quizApp';

async function dbconnect (collectionName) {

    // Setting up the connection

    const result = await client.connect();
    const db = result.db(dbName);
    return db.collection(collectionName);

}

module.exports = dbconnect;
