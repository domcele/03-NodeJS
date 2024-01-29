const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // pasako, jog musu aplikacija bendraus JSON formatu

app.get("/", (req, res) => {
  res.send("OK");
});

const brands = ["BWM", "bentley", "VW", "Porche"];

app.get("/brands", (req, res) => {
  res.send(brands);
});

// /brands/B => ["BMW"]
// /brands/G => [];
// /brands/b => .toLowerCase()
// dinaminis route - leidzia irasyti bet koki dinamini kontenta
app.get("/brands/:firstLetter", (req, res) => {
  // grazinti visus brandus, kurie prasideda duota raide
  // const firstLetter = req.params.firstLetter; -> old way
  const { firstLetter } = req.params; // su dvitaskiu einantys parametrai
  console.log(firstLetter);

  const filteredBrands = brands.filter(
    (brand) => brand[0].toLowerCase() === firstLetter.toLowerCase()
  );
  res.send(filteredBrands);
});

// POST API kuris prideda branda i masyva
app.post("/brands", (req, res) => {
  const { brand } = req.body; // siunciamas body is frontend, butinai turi buti objektas ar masyvas
  brands.push(brand);
  res.send(brands);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
