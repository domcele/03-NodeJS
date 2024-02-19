const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // Importuojame iš šio modulio klientą
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const client = new MongoClient(URI);

// GET - all
app.get('/courses', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('Courses')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/courses/qty', async (req, res) => {
  try {
    const con = await client.connect();
    const count = await con
      .db('MyDatabase')
      .collection('Courses')
      .countDocuments();
    await con.close();
    res.send({ count });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/courses/qty/Volga', async (req, res) => {
  try {
    const con = await client.connect();
    const instructor = 'Volga_Maldaite';
    const count = await con
      .db('MyDatabase')
      .collection('Courses')
      .countDocuments({ instructor });
    await con.close();
    res.send({ instructor, count });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/courses/qty/:instructor', async (req, res) => {
  try {
    const con = await client.connect();
    const { instructor } = req.params;
    const count = await con
      .db('MyDatabase')
      .collection('Courses')
      .countDocuments({ instructor });
    await con.close();
    res.send({ instructor, count });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/courses/uniqcode', async (req, res) => {
  try {
    const con = await client.connect();
    const uniqcode = await con
      .db('MyDatabase')
      .collection('Courses')
      .distinct('code');
    await con.close();
    res.send({ uniqcode });
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.get('/courses/ages/:sort', async (req, res) => {
  try {
    const con = await client.connect();
    const { sort } = req.params;
    const sortParam = sort === 'asc' ? 1 : -1;
    const uniqcode = await con
      .db('MyDatabase')
      .collection('Courses')
      .find()
      .sort({ age: sortParam })
      .toArray();
    await con.close();
    res.send({ uniqcode });
  } catch (error) {
    res.status(500).send({ error });
  }
});

// pridejimas i mongodb kartu su mongodb raw iterpimu rankiniu budu
app.post('/courses', async (req, res) => {
  try {
    const newCourse = req.body;
    const con = await client.connect();
    const dbRes = await con
      .db('MyDatabase')
      .collection('Courses')
      .insertOne(newCourse);
    await con.close();
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
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

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});

/*
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
*/
