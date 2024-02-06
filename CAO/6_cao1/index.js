const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const app = express();
app.use(express.json());

const URI = process.env.DB_CONNECTION_STRING;
const client = new MongoClient(URI);

// find().toArray(); suranda ir grąžinu visus elementus
app.get('/', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiam prie DB
    const data = await con.db('MyDatabase').collection('Students').find().toArray(); // atliekam veiksmus
    await con.close(); // atsijungiam
    return res.send(data); // grazinam duomenis
  } catch (err) {
    res.status(500).send({ err });
  }
});

// .insertOne({ name: 'Giedrius', surname: ...... }); - prideda vieną elementą
app.post('/', async (req, res) => {
  try {
    const con = await client.connect(); // same
    const dbRes = await con.db('MyDatabase').collection('Students').insertOne({
      name: 'Giedrius',
      surname: 'Passatas',
      age: 23,
      uni: 'VTDK',
    });
    await con.close(); // same
    res.send(dbRes); // same
  } catch (err) {
    res.status(500).send({ err }); // same
  }
});

// .insertOne(body); - prideda vieną elementą
app.post('/newStudent', async (req, res) => {
  try {
    const newStudent = req.body;
    const con = await client.connect(); // same
    const dbRes = await con.db('MyDatabase').collection('Students').insertOne(newStudent);
    await con.close(); // same
    res.send(dbRes); // same
  } catch (err) {
    res.status(500).send({ err }); // same
  }
});

// .countDocuments()
app.get('/count', async (req, res) => {
  try {
    const con = await client.connect();
    const count = await con.db('MyDatabase').collection('Students').countDocuments(); // pvz.: 5
    await con.close();
    res.send({ count }); // wrap in object braces
  } catch (error) {
    res.status(500).send({ error });
  }
});

// .findOne({ _id: new ObjectId(id) });
app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MyDatabase')
      .collection('Students')
      .findOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const objectId = new ObjectId(id);
    const data = await con
      .db('MyDatabase')
      .collection('Students')
      .updateOne(
        { _id: objectId },
        {
          $set: {
            name: 'Liubarts',
            surname: 'Kamparskis',
            age: 54,
            uni: 'Profke',
          },
        },
      );
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const objectId = new ObjectId(id);
    const data = await con.db('MyDatabase').collection('Students').deleteOne({ _id: objectId });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send({ error });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});

// "name: Liubarts", "surname: Kamparskis", "age: 54", "uni: Profke"
