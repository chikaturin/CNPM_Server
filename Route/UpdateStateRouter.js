const express = require("express");
const route = express.Router();

const { UpdateState } = require("../Controller/UpdateStateController.js");

route.post("/UpdateState/:id", UpdateState);

module.exports = route;
