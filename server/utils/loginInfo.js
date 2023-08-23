const dbconnect = require('../lib/dbConnection')

const collectionName = 'credentials';

async function insertUser (uName, passwd) {
    const db = await dbconnect(collectionName);
    db.insertOne({username : uName, password : passwd})
}

async function readUser (uName) {
    const db = await dbconnect(collectionName);
    const users = await db.find({username : uName}).toArray();
    return users[0];
}


module.exports = {insertUser, readUser};
