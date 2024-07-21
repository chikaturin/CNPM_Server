const express = require("express");
const route = express.Router();

const {
  search,
  SuggestsAirpost,
  SuggestsTramDung,
} = require("../Controller/SearchController.js");

route.post("/Search", search);
route.get("/SuggestsAirpost", SuggestsAirpost);
route.get("/SuggestsTramDung", SuggestsTramDung);

module.exports = route;
