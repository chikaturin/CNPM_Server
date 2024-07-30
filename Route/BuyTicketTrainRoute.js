const express = require("express");
const route = express.Router();

const {
  GetPhieusdattau,
  BuyTicketTrain,
  SchedularChange,
  CancelTicketTrain,
  FindBuyTicketTrainMaDX,
} = require("../Controller/BuyTicketTrainController.js");

route.post("/GetPhieusdattau", GetPhieusdattau);
route.post("/BuyTicketTrain", BuyTicketTrain);
route.get("/FindBuyTicketTrainMaDX/:MaVeTau", FindBuyTicketTrainMaDX);
route.put("BuyTicketTrain/SchedularChange/:id", SchedularChange);
route.delete("/CancelTicketTrain/:MaDX", CancelTicketTrain);

module.exports = route;
