const express = require("express");
const route = express.Router();
const {
  GetDanhSachSanBay,
  DeleteDanhSachSanBay,
  CreateDanhSachSanBay,
  GetSanBayID,
  getSanBaybyTenSanBay,
} = require("../Controller/ListAirplanController.js");

route.get("/GetDanhSachSanBay", GetDanhSachSanBay);
route.get("/GetSanBayID/:id", GetSanBayID);
route.post("/CreateDanhSachSanBay", CreateDanhSachSanBay);
route.delete("/DeleteDanhSachSanBay/:id", DeleteDanhSachSanBay);
route.get("/getSanBaybyTenSanBay", getSanBaybyTenSanBay);
module.exports = route;
