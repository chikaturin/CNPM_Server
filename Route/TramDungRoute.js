const express = require("express");
const route = express.Router();
const {
  GetTramDung,
  CreateTramDung,
  UpdateTramDung,
  DeleteTramDung,
} = require("../Controller/TramDungController.js");

route.post("/GetTramDung", GetTramDung);
route.post("/CreateTramDung", CreateTramDung);
route.put("/UpdateTramDung/:id", UpdateTramDung);
route.delete("/DeleteTramDung/:id", DeleteTramDung);

module.exports = route;
