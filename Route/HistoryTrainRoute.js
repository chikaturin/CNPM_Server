const express = require("express");
const route = express.Router();

const {
  GetLichSuDatTau,
  DeleteLichSuDatTau,
  CreateHistoryTrain,
} = require("../Controller/HistoryTrainController.js");

route.get("/GetLichSuDatTau", GetLichSuDatTau);
route.post("/CreateHistoryTrain", CreateHistoryTrain);
route.delete("/DeleteLichSuDatTau", DeleteLichSuDatTau);

module.exports = route;
