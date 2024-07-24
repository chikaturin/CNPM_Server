const express = require("express");
const route = express.Router();
const {
  GetTuyen,
  CreateTuyen,
  TuyenID,
  DeleteTuyen,
} = require("../Controller/TuyenControler.js");

route.get("/GetTuyen", GetTuyen);
route.get("/TuyenID/:id", TuyenID);
route.post("/CreateTuyen", CreateTuyen);
route.delete("/DeleteTuyen/:id", DeleteTuyen);

module.exports = route;
