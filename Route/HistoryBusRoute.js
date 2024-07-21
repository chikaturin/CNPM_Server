const express = require("express");
const route = express.Router();

const {
  GetLichSuXeBus,
  DeleteLichSuXeBus,
} = require("../Controller/HistoryBusController.js");

route.get("/GetHistoryBus", GetLichSuXeBus);
route.delete("/DeleteHistoryBus", DeleteLichSuXeBus);

module.exports = route;
