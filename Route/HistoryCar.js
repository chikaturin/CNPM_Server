const express = require("express");
const route = express.Router();

const {
  GetLichSuDatXeOto,
  DeleteLichSuDatXeOto,
} = require("../Controller/HistoryCarController.js");

route.get("/GetLichSuDatXeOto", GetLichSuDatXeOto);
route.delete("/DeleteLichSuDatXeOto", DeleteLichSuDatXeOto);

module.exports = route;
