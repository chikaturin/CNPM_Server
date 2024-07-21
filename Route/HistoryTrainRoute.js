const express = require("express");
const route = express.Router();

const {
  GetLichSuDatTau,
  DeleteLichSuDatTau,
} = require("../Controller/HistoryTrainController.js");

route.get("/GetLichSuDatTau", GetLichSuDatTau);
route.delete("/DeleteLichSuDatTau", DeleteLichSuDatTau);

module.exports = route;
