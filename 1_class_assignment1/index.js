const express = require("express"); //importas
const app = express(); // sukuriame express aplikacija
const port = 3001; // uostas

// sukuriame route "/" (kelia), kuriuo uzejus grazinsim (GET metodas) teksta "Hello world"
app.get("/", (req, res) => {
  res.send("Express app is created"); // issiuncia kvietejui atsakyma
});

const users = ["Alex", "Rose", "Megan"];
app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
