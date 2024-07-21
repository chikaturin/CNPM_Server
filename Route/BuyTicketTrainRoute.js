const express = require("express");
const route = express.Router();

const {
  GetPhieusdattau,
  BuyTicketTrain,
  SchedularChange,
  CancelTicketTrain,
} = require("../Controller/BuyTicketTrainController.js");

route.post("/GetPhieusdattau", GetPhieusdattau);
route.post("/BuyTicketTrain", BuyTicketTrain);
route.put("/SchedularChange/:id", SchedularChange);
route.delete("/CancelTicketTrain/:id", CancelTicketTrain);

module.exports = route;
