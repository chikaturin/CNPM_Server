const express = require("express");
const route = express.Router();

const {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
} = require("../Controller/BookingCarController.js");

route.get("/GetDatXeOto", GetDatXeOto);
route.post("/BookingCar", BookingCar);
route.put("/BookingCar/SchedularChange/:id", SchedularChange);
route.delete("/BookingCar/CancelBooking/:id", CancelBooking);

module.exports = route;
