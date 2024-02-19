const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

// GET all teachers
// eslint-disable-next-line consistent-return
app.get('/services', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('services')
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// PUT new teacher
// app.post('/teachers', async (req, res) => {
//   try {
//     const con = await client.connect(); // same
//     const teacherData = req.body;
//     const dbRes = await con
//       .db('MyDatabase')
//       .collection('Teachers')
//       .insertOne(teacherData);
//     await con.close(); // same
//     res.send(dbRes); // same
//   } catch (err) {
//     res.status(500).send({ err }); // same
//   }
// });

// // GET sorted age
// // eslint-disable-next-line consistent-return
// app.get('/teachers/ages/:sort', async (req, res) => {
//   try {
//     const con = await client.connect();
//     const { sort } = req.params;
//     const sortParam = sort === 'asc' ? 1 : -1;
//     const data = await con
//       .db('MyDatabase')
//       .collection('Teachers')
//       .find()
//       .sort({ age: sortParam })
//       .toArray();
//     await con.close();
//     return res.send({ data });
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

// // GET jobs by dynamic
// // eslint-disable-next-line consistent-return
// app.get('/teachers/jobs/:job', async (req, res) => {
//   try {
//     const con = await client.connect();
//     const teacherJob = req.params.job; // Access the job parameter using req.params
//     const data = await con
//       .db('MyDatabase')
//       .collection('Teachers')
//       .find({ job: teacherJob })
//       .toArray();
//     await con.close();
//     return res.send({ data });
//   } catch (error) {
//     res.status(500).send({ error });
//   }
// });

const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on the port ${port}`);
});
