const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

let data = JSON.parse(`[{
  "id": 1,
  "name": "Petras",
  "surname": "Kazimeras"
}, {
  "id": 2,
  "name": "Eimantas",
  "surname": "Lapinas"
}, {
  "id": 3,
  "name": "Zigmas",
  "surname": "Vaikuckis"
}]`);

app.get('/users', (req, res) => {
  res.send(data);
});

app.post('/users', (req, res) => {
  const newId = data.length + 1;
  const newUser = {
    id: newId,
    name: 'Veronijus',
    surname: 'Jamalaikis',
  };
  data.push(newUser);
  res.send(data);
});

app.get('/users/:id', (req, res) => {
  const id = +req.params.id;
  const foundUser = data.find((user) => user.id === id);
  res.send(foundUser);
});

app.put('/users/:id', (req, res) => {
  const id = +req.params.id;
  const updateUser = {
    id: id,
    name: 'Galapagas',
    surname: 'Faustafkas',
  };

  const updatedData = data.map((user) => (user.id === id ? updateUser : user));

  data = updatedData;
  res.send(data);
});

app.delete('/users/:id', (req, res) => {
  const id = +req.params.id;
  const updatedData = data.filter((user) => user.id !== id);

  data = updatedData;
  res.send(data);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
