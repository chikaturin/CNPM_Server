const express = require("express");
const route = express.Router();

const {
  GetChiTietXeOto,
  GetChiTietXeOtoID,
  CreateChiTietXeOto,
  UpdateChiTietXeOto,
  DeleteChiTietXeOto,
  FinDetailCarID,
} = require("../Controller/DetailCarController.js");

route.get("/GetDetailCar", GetChiTietXeOto);
route.get("/GetDetailCarID/:id", GetChiTietXeOtoID);
route.post("/CreateDetailCar", CreateChiTietXeOto);
route.put("/UpdateDetailCar/:id", UpdateChiTietXeOto);
route.delete("/DeleteDetailCar/:id", DeleteChiTietXeOto);
route.get("/FindDetailCarID", FinDetailCarID);

module.exports = route;
