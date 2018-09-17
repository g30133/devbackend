const express = require('express');
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

const router = express.Router();
const jsonParser = bodyParser.json();

///////////////////////////////////////////////////////////////

async function onEcho(req, res) {
  const message = req.params.message
  res.json({ response: message})
}
router.get('/echo/:message', onEcho)

async function onSanity(req, res) {
  const result1 = req.collectionStore['coll1'].find().toArray()
  const result2 = req.collectionStore['coll2'].find().toArray()
  const result = {}
  result.response = 'ok'
  result.result1 = result1
  result.result2 = result2
  res.json(result)
}
router.get('/sanity', onSanity)

/////////////////////////////////////////////////////////////////

async function onTetrisScoreLoadAll(req, res) {
  console.log('onTetrisScoresLoad()')
  const collection = req.collectionStore['tetrisScores']

  try {
    const result = await collection.find().toArray()
    res.json(result);
  }
  catch (err) {
    console.log(err)
  }
}
router.get('/tetrisScores/loadall', onTetrisScoreLoadAll)

async function onTetrisScoreSave(req, res) {
  console.log('onTetrisScoreSave()')
  const collection = req.collectionStore['tetrisScores']

  const name = req.body.name
  const score = req.body.score

  const newEntry = { name: name, score: score }

  try {
    const result = await collection.insertOne(newEntry)
    res.json(result)
  }
  catch (err) {
    console.log(err)
  }
}
router.post('/tetrisScores/save', jsonParser, onTetrisScoreSave);

async function onTetrisScoresDelete(req, res) {
  console.log('onTetrisScoresDelete()')
  const collection = req.collectionStore['tetrisScores']

  try {
    const result = await collection.deleteMany()
    res.json(result)
  }
  catch (err) {
    console.log(err)
  }
}
router.delete('/tetrisScores', jsonParser, onTetrisScoresDelete);

///////////////////////////////////////////////////////////////////

async function onApi2Load(req, res) {
  console.log('onApi2Load()')
  const collection = req.collectionStore['coll2']

  try {
    const result = await collection.find().toArray()
    res.json(result);
  }
  catch (err) {
    console.log(err)
  }
}
router.get('/api2/load', onApi2Load)

async function onApi2Save(req, res) {
  console.log('onApi2Save()')
  const collection = req.collectionStore['coll2']

  const name = req.body.name
  const text = req.body.text

  const newEntry = { name: name, text: text }

  try {
    const result = await collection.insertOne(newEntry)
    res.json(result)
  }
  catch (err) {
    console.log(err)
  }
}
router.post('/api2/save', jsonParser, onApi2Save);

async function onApi2Delete(req, res) {
  console.log('onApi2Delete()')
  const collection = req.collectionStore['coll2']

  try {
    const result = await collection.deleteMany()
    res.json(result)
  }
  catch (err) {
    console.log(err)
  }
}
router.delete('/api2', jsonParser, onApi2Delete);

///////////////////////////////////////////////////////////////////

module.exports = router;
