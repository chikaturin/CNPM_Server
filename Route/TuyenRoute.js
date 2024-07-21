const express = require("express");
const route = express.Router();
const {
  GetTuyen,
  CreateTuyen,
  DeleteTuyen,
} = require("../Controller/TuyenControler.js");

route.get("/GetTuyen", GetTuyen);
route.post("/CreateTuyen", CreateTuyen);
route.delete("/DeleteTuyen/:id", DeleteTuyen);

module.exports = route;
