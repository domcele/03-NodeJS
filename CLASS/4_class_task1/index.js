const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // pasako, jog musu aplikacija bendraus JSON formatu

const port = 3002;

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
  const brandNames = [];
  phonedata.map((phone) => {
    brandNames.push(`${phone.brand} ${phone.name}`);
  });
  res.send(brandNames);
});

// grazins objektus su name ir stock, kuriu likuciu kiekis yra <= uz nurodyta
app.get("/phones/stocks", (req, res) => {
  const phoneLeftovers = [];
  phonedata
    .filter((phone) => phone.stock < 45)
    .forEach((phone) => {
      phoneLeftovers.push(
        `name: ${phone.brand} ${phone.name}, stock: ${phone.stock}`
      );
    });
  res.send(phoneLeftovers);
});

// grazinti prekes tarp kainos intervalo pvz. 600 - 900, minPrice, maxPrice
app.get("/phones/prices/:minPrice-:maxPrice", (req, res) => {
  const minPrice = +req.params.minPrice;
  const maxPrice = +req.params.maxPrice;

  const filteredPhones = phonedata.filter(
    (phone) => phone.price >= minPrice && phone.price <= maxPrice
  );

  res.send(filteredPhones);
});

// pagal id grazins objekta
app.get("/phones/:id", (req, res) => {
  const id = +req.params.id;
  const phone = phonedata.find((phone) => phone.id === id);
  res.send(phone);
});

// naujos prekes pridejimas
app.post("/phones", (req, res) => {
  // const { id, brand, name, stock, price } = req.body;

  const newPhone = {
    id: ++phonedata.length,
    brand: "Meskafonas Plus",
    name: "tritouzan fiftouzan",
    stock: 4,
    price: 9229.99,
  };

  phonedata.push(newPhone);

  res.send(phonedata);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
