const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // pasako, jog musu aplikacija bendraus JSON formatu

const port = 3001;

let phonedata = require("./data");

// get all info
app.get("/phones", (req, res) => {
  res.send(phonedata);
});

// filtravimas
app.get("/phones/model/:brand", (req, res) => {
  const { brand } = req.params;
  const filteredBrand = phonedata.filter((phone) => phone.brand === brand);
  res.send(filteredBrand);
});

// brand ir name sujungimas ir grazinimas
app.get("/phones/brandname", (req, res) => {
  const { brand, name } = req.params;
  const brandNames = [];
  phonedata.forEach((phone) => {
    if (phone.brand === brand && phone.name === name) {
      brandNames.push(`${phone.brand} ${phone.name}`);
    }
  });
  res.send(brandNames);
});

// pagal id grazins objekta
app.get("/phones/:id", (req, res) => {
  const id = +req.params.id;
  const phone = phonedata.find((phone) => phone.id === id);
  res.send(phone);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
