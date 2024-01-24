const express = require("express"); //importas
const app = express(); // sukuriame express aplikacija
const port = 3000; // uostas

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

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
