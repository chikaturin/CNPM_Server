const express = require("express");
const router = express.Router();
const { LichSuDatTau } = require("../Schema/schema.js");

const GetLichSuDatTau = async (req, res) => {
  try {
    const lichSuDatTau = await LichSuDatTau.find({});
    res.status(200).json({ lichSuDatTau });
  } catch (e) {
    res.status(500).json("Không thể lấy lịch sử đặt tàu");
  }
};

const CreateHistoryTrain = async (req, res) => {
  try {
    const { MaKH, MaDX, Date } = req.body;

    if (!MaKH || !MaDX) {
      return res.status(400).json({ message: "MaKH và MaDX là bắt buộc" });
    }

    const newBooking = new LichSuDatTau({ MaKH, MaDX, Date });

    await newBooking.save();

    res.status(201).json({ newBooking });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tạo đặt tàu", error });
  }
};

const DeleteLichSuDatTau = async (req, res) => {
  try {
    const { MaDX } = req.params;
    await LichSuDatTau.findOneAndDelete({ MaDX });
    res.status(200).json({ message: "Lịch sử đặt tàu đã bị xóa thành công" });
  } catch (e) {
    res.status(500).json("Không thể xóa lịch sử đặt tàu");
  }
};

module.exports = {
  GetLichSuDatTau,
  CreateHistoryTrain,
  DeleteLichSuDatTau,
};
