const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DanhSachSanBay = require("../Schema/schema.js").DanhSachSanBay;
const TramDung = require("../Schema/schema.js").TramDung;
const Tuyen = require("../Schema/schema.js").Tuyen;

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: "Search",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Middleware to handle CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const search = async (req, res) => {
  try {
    const { diemKhoiHanh, diemKetThuc, ngayDi, gioDi, tramDungId } = req.body;

    if (diemKhoiHanh) {
      const tramDung = await TramDung.findById(tramDungId).populate("MaTuyen");
      if (!tramDung) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy trạm dừng với ID này" });
      }

      const sanBay = await DanhSachSanBay.findById(
        tramDung.MaTuyen.DiemKhoiHanh
      );
      if (!sanBay) {
        return res.status(404).json({
          message: "Không tìm thấy sân bay liên kết với trạm dừng này",
        });
      }

      req.session.searchResult = {
        sanBay: sanBay.TenSanBay,
        tramDung: tramDung.DiaChi,
        ngayDi,
        gioDi,
        tramDungId: tramDung._id,
      };

      return res.status(200).json({
        sanBay: sanBay.TenSanBay,
        tramDung: tramDung.DiaChi,
        ngayDi,
        gioDi,
      });
    }

    if (tenSanBay) {
      const sanBay = await DanhSachSanBay.findOne({ TenSanBay: tenSanBay });
      if (!sanBay) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sân bay với tên này" });
      }

      const tramDung = await TramDung.find({ MaTuyen: sanBay._id });
      if (!tramDung.length) {
        return res.status(404).json({
          message: "Không tìm thấy trạm dừng liên kết với sân bay này",
        });
      }

      req.session.searchResult = {
        sanBay: sanBay.TenSanBay,
        tramDung: tramDung.map((tram) => tram.DiaChi),
        ngayDi,
        gioDi,
        tramDungId: tramDung.map((tram) => tram._id),
      };

      return res.status(200).json({
        sanBay: sanBay.TenSanBay,
        tramDung: tramDung.map((tram) => tram.DiaChi),
        ngayDi,
        gioDi,
      });
    }

    res
      .status(400)
      .json({ message: "Vui lòng cung cấp địa chỉ hoặc tên sân bay" });
  } catch (e) {
    console.error("Lỗi khi tìm kiếm:", e);
    res.status(500).json({ error: "Không thể tìm kiếm thông tin" });
  }
};

const SuggestsAirpost = async (req, res) => {
  try {
    const { query } = req.query;
    const suggestions = await DanhSachSanBay.find({
      TenSanBay: { $regex: query, $options: "i" },
    }).limit(10);

    const tramdungtuongung = await TramDung.find({ MaTuyen: suggestions });

    res.json({
      sanBays: suggestions.map((DanhSachSanBay) => DanhSachSanBay.TenSanBay),
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
    // Tìm kiếm trạm dừng theo địa chỉ
    const tramDungSuggestions = await TramDung.find({
      DiaChi: { $regex: query, $options: "i" },
    }).limit(10);

    // Lấy danh sách mã tuyến từ các trạm dừng tìm được
    const maTuyens = tramDungSuggestions.map((tramDung) => tramDung.MaTuyen);

    // Tìm các sân bay tương ứng với các mã tuyến
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

const book = async (req, res) => {
  try {
    const { customerName, customerContact } = req.body;
    const searchResult = req.session.searchResult;

    if (!searchResult) {
      return res
        .status(400)
        .json({ message: "No search result found in session." });
    }

    const booking = new Booking({
      customerName,
      customerContact,
      sanBay: searchResult.sanBay,
      tramDung: searchResult.tramDung,
      ngayDi: searchResult.ngayDi,
      gioDi: searchResult.gioDi,
    });

    await booking.save();

    // Clear the session search result after booking
    req.session.searchResult = null;

    res.status(201).json({ message: "Booking created successfully." });
  } catch (err) {
    console.error("Lỗi khi đặt chỗ:", err);
    res.status(500).json({ error: "Không thể tạo đặt chỗ." });
  }
};

module.exports = {
  search,
  SuggestsAirpost,
  SuggestsTramDung,
  book,
};
