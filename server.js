const mongodb = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const api = require('./routes/api.js')

const DB_NAME = 'devdb'
const COLLECTION_NAME_1 = 'coll1'
const COLLECTION_NAME_2 = 'coll2'

const DB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`

const APP_PORT = process.env.PORT || 3000

let app = undefined
let collectionStore = {}

async function setupDb() {
  try {
    const db = await mongodb.connect(DB_URI);

    const coll1 = db.collection(COLLECTION_NAME_1)
    if (coll1 === undefined) {
      db.createCollection(COLLECTION_NAME_1)
    } 
    collectionStore[COLLECTION_NAME_1] = coll1
    
    const coll2 = db.collection(COLLECTION_NAME_2)
    if (coll2 === undefined) {
      db.createCollection(COLLECTION_NAME_2)
    }
    collectionStore[COLLECTION_NAME_2] = coll2
    
    console.log('DB Connected')
  }
  catch (err) {
    console.log(err)
  }
}

async function setupServer() {
  app = express()

  function setCORS(req ,res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  }

  function setCollectionStore(req, res, next) {
    req.collectionStore = collectionStore
    next();
  }

  app.use(express.static('public'))
  app.use(setCORS)
  app.use(setCollectionStore)
  app.use(api)

  try {
    await app.listen(APP_PORT)
  }
  catch(err) {
    console.log(err)
  }

  console.log('Server Listening on port ' + APP_PORT)
}

async function run() {
  try {
    await setupDb()
    await setupServer()
  }
  catch (err) {
    console.log(err)
  }
}

run()
