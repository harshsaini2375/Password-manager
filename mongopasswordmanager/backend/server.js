const bodyParser = require('body-parser');
const express = require('express')
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser')
require('dotenv').config()
const cors = require('cors')


const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3000

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

// Use connect method to connect to the server
client.connect();


// get all password
app.get('/', async (req, res) => {

    // setting databasename
    const db = client.db(dbName);

    // creating collection
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();

    res.json(findResult)
})

// save password
app.post('/', async (req, res) => {

    let password = req.body

    // setting databasename
    const db = client.db(dbName);

    // creating collection
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(password);

    res.json({success:true})
})

// delete password
app.delete('/', async (req, res) => {

    let password = req.body
    console.log(req.body);
    

    // setting databasename
    const db = client.db(dbName);

    // creating collection
    const collection = db.collection('documents');
    const findResult = await collection.deleteOne(password);

    res.json({success:true, result:findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})