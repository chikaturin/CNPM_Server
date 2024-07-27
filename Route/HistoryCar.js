const express = require("express");
const route = express.Router();

const {
  GetLichSuDatXeOto,
  createHistory,
  updateHistory,
  DeleteLichSuDatXeOto,
} = require("../Controller/HistoryCarController.js");

route.get("/GetLichSuDatXeOto", GetLichSuDatXeOto);
route.post("/createHistory", createHistory);
route.put("/updateHistory/:id", updateHistory);
route.delete("/DeleteLichSuDatXeOto", DeleteLichSuDatXeOto);

module.exports = route;
