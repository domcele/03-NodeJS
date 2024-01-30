const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Importas is userdata.json
let userdata = require("./userdata");

// GET all
app.get("/users", (req, res) => {
  res.send(userdata);
});

// {
//   "id": 1,
//   "first_name": "Kelwin",
//   "last_name": "Pirouet",
//   "email": "kpirouet0@mac.com",
//   "gender": "Non-binary",
//   "car": "Dodge"
// }

// filtravimas
app.get("/users/car/:brand", (req, res) => {
  const { brand } = req.params;
  const filteredUsers = userdata.filter(
    (user) => user.car.toLowerCase() === brand.toLocaleLowerCase()
  );
  res.send(filteredUsers);
});

//kad grazintu visus el pastsu 1319@asdk.com
app.get("/users/emails", (req, res) => {
  const emails = userdata.map((user) => user.email);
  res.send(emails);
});

app.get("/users/females", (req, res) => {
  // 1var.
  // const females = [];
  // const filteredUsers = userdata
  //   .filter((user) => user.gender === "Female")
  //   .forEach((female) =>
  //     females.push(`${female.first_name} ${female.last_name}`)
  //   );

  // 2var.
  //   const filteredFemales = userdata.filter((user) => user.gender === "Female");
  //   const fullNames = filteredFemales.map(
  //     (female) => `${female.first_name} ${female.last_name}`
  //   );
  //   res.send(fullNames);
  // });

  // 3var. - blogas variantas
  // const fullNames = data.map(user => user.gender === "Female" && `${female.first_name} ${female.last_name}`)

  // 4var. - geriausias variantas
  const fullNames = [];
  userdata.forEach((user) => {
    if (user.gender === "Female") {
      fullNames.push(`${user.first_name} ${user.last_name}`);
    }
  });

  res.send(fullNames);
});

// priims user id ir pagal ji grazins atititnkama vartotojo objekta
app.get("/users/:id", (req, res) => {
  const id = +req.params.id;
  const user = userdata.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "user not found" });
  }
});

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
