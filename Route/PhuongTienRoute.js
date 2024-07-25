const express = require("express");
const route = express.Router();
const {
  GetPhuongTien,
  CreatePhuongTien,
  SearchFindPhuongTien,
  DeletePhuongTien,
} = require("../Controller/PhuongTienController.js");

route.get("/GetPhuongTien", GetPhuongTien);
route.get("/SearchFindPhuongTien/:type", SearchFindPhuongTien);
route.post("/CreatePhuongTien", CreatePhuongTien);
route.delete("/DeletePhuongTien/:id", DeletePhuongTien);

module.exports = route;
