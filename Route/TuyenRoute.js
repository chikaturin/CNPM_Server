const express = require("express");
const route = express.Router();
const {
  GetTuyen,
  CreateTuyen,
  TuyenMaTuyen,
  DeleteTuyen,
} = require("../Controller/TuyenControler.js");

route.get("/GetTuyen", GetTuyen);
route.get("/TuyenID/:id", TuyenMaTuyen);
route.post("/CreateTuyen", CreateTuyen);
route.delete("/DeleteTuyen/:id", DeleteTuyen);
route.get("/TuyenMaSB", TuyenMaTuyen);

module.exports = route;
