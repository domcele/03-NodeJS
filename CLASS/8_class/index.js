const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // Importuojame iš šio modulio klientą
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(URI);

app.get('/students', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('Students')
      .aggregate([
        {
          $lookup: {
            from: 'Teachers', // The collection to join with
            localField: 'teacherId', // The field from the students collection
            foreignField: '_id', // The field from the teachers collection
            as: 'teacher', // The output array where the joined data will be
          },
        },
        {
          $unwind: {
            path: '$teacher',
            // preserveNullAndEmptyArrays: true, // show students without an owner
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// metodas kaip prideti objectId be objectId nurodant mongodb (is string i object)
// app.post('/students', async (req, res) => {
//   try {
//     const newStudent = {
//       ...req.body,
//       teacherId: new ObjectId(`${req.body.ownerId}`),
//     };
//     const con = await client.connect();
//     const dbRes = await con
//       .db('MyDatabase')
//       .collection('Students')
//       .insertOne(newStudent);
//     await con.close();
//     res.send(dbRes);
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// });

// TODO aggregate
app.get('/teachers', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('Teachers')
      .aggregate([
        {
          $lookup: {
            from: 'Students', // The collection to join with
            localField: 'studentId', // The field from the students collection
            foreignField: '_id', // The field from the teachers collection
            as: 'students', // The output array where the joined data will be
          },
        },
        {
          $unwind: {
            path: '$students',
            preserveNullAndEmptyArrays: true, // show students without an owner
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

// pridejimas i mongodb kartu su mongodb raw iterpimu rankiniu budu
app.post('/teachers', async (req, res) => {
  try {
    const newTeacher = req.body;
    const con = await client.connect();
    const dbRes = await con
      .db('MyDatabase')
      .collection('Teachers')
      .insertOne(newTeacher);
    await con.close();
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
