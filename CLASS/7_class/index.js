const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());

const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

// GET all teachers
// eslint-disable-next-line consistent-return
app.get('/teachers', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('Teachers')
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// PUT new teacher
app.post('/teachers', async (req, res) => {
  try {
    const con = await client.connect(); // same
    const dbRes = await con.db('MyDatabase').collection('Teachers').insertOne({
      name: 'Giedrius',
      surname: 'Passatas',
      job: 'Welder',
      uni: 'VTDK',
    });
    await con.close(); // same
    res.send(dbRes); // same
  } catch (err) {
    res.status(500).send({ err }); // same
  }
});

// GET jobs by dynamic
// eslint-disable-next-line consistent-return
app.get('/teachers/byoldest', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('Teachers')
      .find()
      .sort({ age: -1 })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// GET jobs by dynamic
// eslint-disable-next-line consistent-return
app.get('/teachers/:job', async (req, res) => {
  try {
    const con = await client.connect();
    const teacherJob = req.params.job;
    const data = await con
      .db('MyDatabase')
      .collection('Teachers')
      .find({ job: teacherJob })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on the port ${port}`);
});
