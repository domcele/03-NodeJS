const casual = require("casual");

casual.define("point", function () {
  return {
    x: Math.floor(Math.random() * 10) + 1,
  };
});

const city = casual.city;
const point = casual.point;
const suffix = "Mr";
const firstName = "Dominykas";
const lastName = "Pavilionis";
console.log(suffix + " " + firstName + " " + lastName, city, point);
