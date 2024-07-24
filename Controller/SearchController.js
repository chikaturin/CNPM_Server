const express = require("express");
const session = require("express-session");
const { DanhSachSanBay, TramDung } = require("../Schema/schema.js");

const app = express();

const SuggestsAirpost = async (req, res) => {
  try {
    const { query } = req.query;
    const suggestions = await DanhSachSanBay.find({
      TenSanBay: { $regex: query, $options: "i" },
    }).limit(10);

    const tramdungtuongung = await TramDung.find({
      MaTuyen: { $in: suggestions.map((sanBay) => sanBay.MaSB) },
    });

    res.json({
      sanBays: suggestions.map((sanBay) => sanBay.TenSanBay),
      tramDungs: tramdungtuongung.map((tramDung) => tramDung.DiaChi),
    });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra khi lấy gợi ý sân bay.",
      error: err.message,
    });
  }
};

const SuggestsTramDung = async (req, res) => {
  try {
    const { query } = req.query;
    const tramDungSuggestions = await TramDung.find({
      DiaChi: { $regex: query, $options: "i" },
    }).limit(10);

    const maTuyens = tramDungSuggestions.map((tramDung) => tramDung.MaTuyen);

    const sanBayTuongUng = await DanhSachSanBay.find({
      MaSB: { $in: maTuyens },
    });

    res.json({
      tramDungs: tramDungSuggestions.map((tramDung) => tramDung.DiaChi),
      sanBays: sanBayTuongUng.map((sanBay) => sanBay.TenSanBay),
    });
  } catch (err) {
    res.status(500).json({
      message: "Có lỗi xảy ra khi lấy gợi ý trạm dừng.",
      error: err.message,
    });
  }
};

module.exports = {
  SuggestsAirpost,
  SuggestsTramDung,
};
