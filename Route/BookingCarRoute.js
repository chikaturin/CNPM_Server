const express = require("express");
const route = express.Router();

const {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  FindBookingCarMaDX,
  UpdateState,
} = require("../Controller/BookingCarController.js");

route.post("/GetDatXeOto", GetDatXeOto);
route.post("/BookingCar", BookingCar);
route.get("/FindBookingCarID", FindBookingCarID);
route.get("/FindBookingCarMaDX", FindBookingCarMaDX);
route.put("/BookingCar/SchedularChange/:id", SchedularChange);
route.delete("/BookingCar/CancelBooking/:id", CancelBooking);
route.post("/UpdateState/:id", UpdateState);

module.exports = route;
