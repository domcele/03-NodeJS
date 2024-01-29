const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // pasako, jog musu aplikacija bendraus JSON formatu

const port = 3000;

let users = [
  { id: 1, name: "Domas", surname: "Pav", role: "ADMIN" },
  { id: 2, name: "Jonas", surname: "Ponas", role: "MANEGER" },
];

// GET returns all users
app.get("/users", (req, res) => {
  res.send(users);
});

// POST creates a new user
app.post("/users", (req, res) => {
  const fakeId = users.length + 1;
  const user = { ...req.body, id: fakeId }; // creating new user with id
  if (user.name && user.surname && user.role) {
    users.push(user); // updating list
    res.send(user); // returning created list
  } else {
    res.status(400).send({
      message: "User data is missing. Required fields: name, surname, role",
    });
  }
});

// PUT updates an existing user
app.put("/users/:id", (req, res) => {
  // const { id } = req.params;
  const id = +req.params.id; // req.params ateina stringas
  const updatingUser = req.body;

  console.log(id);
  console.log(updatingUser);
  // 1 budas kaip ieskoti ID ir pakeisto pagal ta pati ID
  // users = users.map((user) => (user.id === id ? updatingUser : user)); // 1 budas kaip surasti id ir ji pakeisti

  // 2 budas kaip ieskoti ID ir pakeisto pagal ta pati ID
  const foundIndex = users.findIndex((user) => user.id === id);
  if (foundIndex !== -1) {
    users.splice(foundIndex, 1, updatingUser);
    res.send(updatingUser);
  } else {
    res.status(400).send({
      message: "User data is missing. Required fields: name, surname, role",
    });
  }
});

// DELETE Deletes an existing user
app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  const foundIndex = users.findIndex((user) => user.id === id);
  if (foundIndex !== -1) {
    users.splice(foundIndex, 1);
    res.send({ message: "DELETED" });
  } else {
    res.status(400).send({
      message: "User data is missing. Required fields: name, surname, role",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
