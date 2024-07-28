const express = require("express");
const route = express.Router();

const {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  UpdateState,
} = require("../Controller/BookingCarController.js");

route.post("/GetDatXeOto", GetDatXeOto);
route.post("/BookingCar", BookingCar);
route.post("/FindBookingCarID", FindBookingCarID);
route.put("/BookingCar/SchedularChange/:id", SchedularChange);
route.delete("/BookingCar/CancelBooking/:id", CancelBooking);
route.post("/UpdateState/:id", UpdateState);

module.exports = route;
