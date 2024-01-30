const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // pasako, jog musu aplikacija bendraus JSON formatu

const port = 3000;

let phonedata = require("./data");

app.get("/phones", (req, res) => {
  res.send(phonedata);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
