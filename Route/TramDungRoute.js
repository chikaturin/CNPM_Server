const express = require("express");
const route = express.Router();
const {
  GetTramDung,
  CreateTramDung,
  UpdateTramDung,
  DeleteTramDung,
} = require("../Controller/TramDungController.js");

route.get("/GetTramDung", GetTramDung);
route.post("/CreateTramDung", CreateTramDung);
route.delete("/DeleteTramDung/:id", DeleteTramDung);

module.exports = route;
