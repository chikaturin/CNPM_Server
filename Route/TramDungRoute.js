const express = require("express");
const route = express.Router();
const {
  GetTramDung,
  CreateTramDung,
  GetTramDungID,
  DeleteTramDung,
} = require("../Controller/TramDungController.js");

route.get("/GetTramDung", GetTramDung);
route.post("/CreateTramDung", CreateTramDung);
route.get("/GetTramDungID/:id", GetTramDungID);
route.delete("/DeleteTramDung/:id", DeleteTramDung);

module.exports = route;
