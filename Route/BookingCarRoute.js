const express = require("express");
const route = express.Router();

const {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  HistoryBookingCar,
} = require("../Controller/BookingCarController.js");

route.post("/GetDatXeOto", GetDatXeOto);
route.post("/BookingCar", BookingCar);
route.post("/Ma", FindBookingCarID);
route.put("/BookingCar/SchedularChange/:id", SchedularChange);
route.delete("/BookingCar/CancelBooking/:id", CancelBooking);
route.delete("/BookingCar/HistoryBookingCar/:id", HistoryBookingCar);

module.exports = route;
