const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

// GET all memberships
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

// PUT new membership
app.post('/services', async (req, res) => {
  try {
    const con = await client.connect();
    const servicesData = req.body;
    const dbRes = await con
      .db('MyDatabase')
      .collection('services')
      .insertOne(servicesData);
    await con.close();
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.delete('/services/:id', async (req, res) => {
  try {
    const con = await client.connect();
    const idDelete = req.body;
    const dbRes = await con
      .db('MyDatabase')
      .collection('services')
      .deleteOne(idDelete);
    await con.close();
    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'services', // The collection to join with
            localField: 'service_id', // The field from the users collection
            foreignField: '_id', // The field from the teachers collection
            as: 'services', // The output array where the joined data will be
          },
        },
        {
          $unwind: {
            path: '$services',
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

// GET all users
// eslint-disable-next-line consistent-return
app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('users')
      .find()
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// POST new user to membership
app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const usersData = {
      ...req.body,
      service_id: new ObjectId(`${req.body.service_id}`),
    };
    const dbRes = await con
      .db('MyDatabase')
      .collection('users')
      .insertOne(usersData);
    await con.close();

    res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get('/users/names/:sort', async (req, res) => {
  try {
    const con = await client.connect();
    const { sort } = req.params;
    const sortParam = sort === 'asc' ? 1 : -1;
    const data = await con
      .db('MyDatabase')
      .collection('users')
      .aggregate([
        {
          $lookup: {
            from: 'services',
            localField: 'service_id',
            foreignField: '_id',
            as: 'services',
          },
        },
        {
          $unwind: {
            path: '$services',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { name: sortParam },
        },
      ])
      .toArray();
    await con.close();
    return res.send({ data });
  } catch (error) {
    res.status(500).send({ error });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on the port ${port}`);
});
