const express = require("express");
const route = express.Router();
const {
  GetPhuongTien,
  CreatePhuongTien,
  UpdatePhuongTien,
  DeletePhuongTien,
} = require("../Controller/PhuongTienController.js");

route.get("/GetPhuongTien", GetPhuongTien);
route.post("/CreatePhuongTien", CreatePhuongTien);
route.put("/UpdatePhuongTien/:id", UpdatePhuongTien);
route.delete("/DeletePhuongTien/:id", DeletePhuongTien);

module.exports = route;
