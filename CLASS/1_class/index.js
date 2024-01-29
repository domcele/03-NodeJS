const express = require("express"); //importas
const cors = require("cors"); // importuojam cors moduli
const app = express(); // sukuriame express aplikacija
const port = 3000; // uostas

app.use(cors()); // pritaikom cors taisykles

// sukuriame route "/" (kelia), kuriuo uzejus grazinsim (GET metodas) teksta "Hello world"
app.get("/", (req, res) => {
  res.send("Hello world"); // issiuncia kvietejui atsakyma
});

const cars = ["audi", "bmw", "VW"];
app.get("/cars", (req, res) => {
  res.send(cars);
});

const students = [{ id: 1, name: "Domas", age: 29 }];

app.get("/students", (req, res) => {
  res.send(students);
});

// ASSIGNMENT
const users = ["Alex", "Rose", "Megan"];
app.get("/users", (req, res) => {
  res.send(users);
});

// paliedziama(listen) aplikacija ant porto(3000)
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
