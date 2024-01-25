const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// sukuriame route "/" (kelia), kuriuo uzejus grazinsim (GET metodas) OK, kad veikia
app.get("/", (req, res) => {
  res.send("OK"); // issiuncia kvietejui atsakyma
});

const userNames = ["Dominykas", "Antanas", "Tadas"];

app.get("/userNames", (req, res) => {
  res.send(userNames);
});

app.post("/userNames", (req, res) => {
  const { firstName, lastName } = req.body;
  userNames.push(firstName + " " + lastName);
  res.send(firstName + lastName);
});

// paliedziama(listen) aplikacija ant porto(3000)
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
