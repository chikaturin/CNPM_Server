const express = require("express");
const route = express.Router();

const {
  GetBuyTicketBus,
  BuyTicketBus,
  SchedularChange,
  CancelBooking,
} = require("../Controller/BuyTicketBusController.js");

route.get("/GetBuyTicketBus", GetBuyTicketBus);
route.post("/BuyTicketBus", BuyTicketBus);
route.put("/BuyTicketBus/SchedularChange/:id", SchedularChange);
route.delete("/BuyTicketBus/CancelBooking/:id", CancelBooking);

module.exports = route;
