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

const brands = ["Audi", "Kia", "Mercedes", "Subaru"];

app.get("/brands", (req, res) => {
  res.send(brands);
});

app.post("/brands", (req, res) => {
  const { brand } = req.body;
  brands.push(brand);
  res.send(brands);
});

// paliedziama(listen) aplikacija ant porto(3000)
app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
