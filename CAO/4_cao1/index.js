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

const cars = {
  bmw: ["i3", "i8", "1 series", "3 series", "5 series"],
  mb: ["A class", "C class", "E class", "S class"],
  vw: ["Golf", "Arteon", "UP"],
};

app.get("/cars/:model", (req, res) => {
  req.params;
  res.send(cars);
});

// paliedziama(listen) aplikacija ant porto(3000)
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
