const express = require("express");
const route = express.Router();

const {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  FindBookingCarMaDX,
} = require("../Controller/BookingCarController.js");

route.get("/GetDatXeOto", GetDatXeOto);
route.post("/BookingCar", BookingCar);
route.get("/FindBookingCarID", FindBookingCarID);
route.get("/FindBookingCarMaDX", FindBookingCarMaDX);
route.put("/BookingCar/SchedularChange/:id", SchedularChange);
route.delete("/CancelBooking/:MaDX", CancelBooking);

module.exports = route;
