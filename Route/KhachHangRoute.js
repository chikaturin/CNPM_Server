const express = require("express");
const route = express.Router();
const GetKhachHang = require("../Controller/KhachHangController.js");

route.post("/GetKhachHang", GetKhachHang);

module.exports = route;
