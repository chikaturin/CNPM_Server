const express = require("express");
const route = express.Router();

const {
  GetLichSuXeBus,
  CreateLichSuBus,
  DeleteLichSuXeBus,
} = require("../Controller/HistoryBusController.js");

route.get("/GetHistoryBus", GetLichSuXeBus);
route.post("/CreateHistoryBus", CreateLichSuBus);
route.delete("/DeleteHistoryBus", DeleteLichSuXeBus);

module.exports = route;
