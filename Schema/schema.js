const mongoose = require("mongoose");

const KhachHangSchema = new mongoose.Schema({
  MaCus: {
    type: String,
    required: true,
    unique: true,
    maxlength: 5,
  },
  TenKH: {
    type: String,
    maxlength: 100,
  },
  Sdt: {
    type: String,
    maxlength: 10,
  },
});

const DanhSachSanBaySchema = new mongoose.Schema({
  MaSB: { type: String, required: true }, // Chỉnh sửa lỗi chính tả "uinque" thành "unique"
  TenSanBay: { type: String, required: true, maxlength: 100 },
  ThanhPho: { type: String, required: true, maxlength: 100 },
});

const TuyenSchema = new mongoose.Schema({
  MaTuyen: { type: String, required: true, unique: true, maxlength: 5 },
  DiemKhoiHanh: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DanhSachSanBay",
    required: true,
  },
  DiemKetThuc: {
    type: String,
    maxlength: 300,
    required: true,
  },
  ThoiGianKhoiHanh: { type: Date, required: true },
  ThoiGianKetThuc: { type: Date, required: true },
});

const PhuongTienSchema = new mongoose.Schema({
  MaPT: { type: String, required: true, unique: true, maxlength: 5 },
  MaTuyen: { type: String, ref: "Tuyen" },
  MaLoai: { type: Boolean, required: true },
  TenPhuongTien: { type: String, required: true, maxlength: 100 },
  SoGheToiDa: { type: Number, required: true },
});

const TramDungSchema = new mongoose.Schema({
  MaTram: { type: String, required: true, unique: true, maxlength: 5 },
  MaTuyen: { type: mongoose.Schema.Types.ObjectId, ref: "Tuyen" },
  DiaChi: { type: String, required: true, maxlength: 100 },
  SoKM: { type: Number, required: true },
  GiaTienVe: { type: Number, required: true, maxlength: 100 },
});

const ChiTietXeOtoSchema = new mongoose.Schema({
  MaDetailCar: { type: String, required: true, unique: true, maxlength: 5 },
  TenHangXe: { type: String, required: true, maxlength: 100 },
  TenChuSoHuu: { type: String, required: true, maxlength: 100 },
  SoHanhLyToiDa: { type: Number, required: true },
  BienSoXe: { type: String, required: true, maxlength: 10 },
  CongTy: { type: String, required: true, maxlength: 100 },
  SDT_TaiXe: { type: String, required: true, maxlength: 10 },
  SoGheToiDa: { type: Number, required: true, maxlength: 100 },
  SoTien_1km: { type: Number, required: true, maxlength: 100 },
  MaSB: { type: String, ref: "DanhSachSanBay" },
});

const DatXeOtoSchema = new mongoose.Schema({
  MaDX: { type: String, required: true, unique: true, maxlength: 5 },
  MaDetailCar: { type: String, ref: "ChiTietXeOto" },
  MaCus: { type: String, ref: "KhachHang" },
  MaTram: { type: String, ref: "TramDung" },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  SoLuongHanhKhach: { type: Number, required: true },
  NgayGioDat: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  Trangthai: { type: Boolean, required: true },
});

const AppraiseCarSchema = new mongoose.Schema({
  MaDX: { type: String, ref: "DatXeOto" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const PhieuDatTauSchema = new mongoose.Schema({
  MaVeTau: { type: String, required: true, unique: true, maxlength: 5 },
  MaCus: { type: String, ref: "KhachHang" },
  MaPT: { type: String, ref: "PhuongTien" },
  SLVeNguoiLon: { type: Number, required: true },
  SLVeTreEm: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
});

const AppraiseTrainSchema = new mongoose.Schema({
  MaTau: { type: String, ref: "PhieuDatTau" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const PhieuDatXeBusSchema = new mongoose.Schema({
  MaVeBus: { type: String, required: true, unique: true, maxlength: 5 },
  MaCus: { type: String, ref: "KhachHang" },
  MaPT: { type: String, ref: "PhuongTien" },
  SLVe: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: Date, required: true },
  ThanhTien: { type: Number, required: true },
  TrangThai: { type: Boolean, required: true },
});

const AppraiseBusSchema = new mongoose.Schema({
  MaBus: { type: String, ref: "PhieuDatXeBus" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, require: true },
  NoiDung: { type: String, require: true, maxlength: 500 },
});

const LichSuDatXeOtoSchema = new mongoose.Schema({
  MaDX: { type: String, ref: "DatXeOto", maxlength: 5 },
});

const LichSuDatTauSchema = new mongoose.Schema({
  MaVeTau: {
    type: String,
    ref: "PhieuDatTau",
    maxlength: 5,
  },
});

const LichSuDatXeBusSchema = new mongoose.Schema({
  MaVeBus: {
    type: String,
    ref: "PhieuDatXeBus",
    maxlength: 5,
  },
});

// trigger

let new_value_train = 1;
PhieuDatTauSchema.pre("save", async function (next) {
  this.MaVeTau = `PTTau${new_value}`;
  this.ThanhTien = ThanhTien;
  new_value_train += 1;

  next();
});

let new_value_phuongTien = 1;
PhuongTienSchema.pre("save", async function (next) {
  try {
    this.MaPT = `PT${new_value}`;
    new_value_phuongTien += 1;

    next();
  } catch (err) {
    next(err);
  }
});

let new_value_detailCar = 1;
ChiTietXeOtoSchema.pre("save", async function (next) {
  try {
    this.MaDetailCar = `DetailCar${new_value}`;
    new_value_detailCar += 1;

    next();
  } catch (err) {
    next(err);
  }
});

DatXeOtoSchema.post("save", async function (doc) {
  try {
    if (doc.TrangThai === 1) {
      const lichSuDatXeOto = new LichSuDatXeOto({
        MaDX: doc.MaDX,
      });
      await lichSuDatXeOto.save();
    }
  } catch (err) {
    console.error("Error adding to LichSuDatXeOto:", err);
  }
});

PhieuDatXeBusSchema.post("save", async function (doc) {
  try {
    if (doc.TrangThai === 1) {
      const lichSuDatXeBus = new LichSuDatXeBus({
        MaVeBus: doc.MaVeBus,
      });
      await lichSuDatXeBus.save();
    }
  } catch (err) {
    console.error("Error adding to LichSuDatXeBus:", err);
  }
});

PhieuDatTauSchema.post("save", async function (doc) {
  try {
    if (doc.TrangThai === 1) {
      const lichSuDatTau = new LichSuDatTau({
        MaVeTau: doc.MaVeTau,
      });
      await lichSuDatTau.save();
    }
  } catch (err) {
    console.error("Error adding to LichSuDatTau:", err);
  }
});

const KhachHang = mongoose.model("KhachHang", KhachHangSchema);
const DanhSachSanBay = mongoose.model("DanhSachSanBay", DanhSachSanBaySchema);
const Tuyen = mongoose.model("Tuyen", TuyenSchema);
const PhuongTien = mongoose.model("PhuongTien", PhuongTienSchema);
const TramDung = mongoose.model("TramDung", TramDungSchema);
const ChiTietXeOto = mongoose.model("ChiTietXeOto", ChiTietXeOtoSchema);
const DatXeOto = mongoose.model("DatXeOto", DatXeOtoSchema);
const AppraiseCar = mongoose.model("AppraiseCar", AppraiseCarSchema);
const PhieuDatTau = mongoose.model("PhieuDatTau", PhieuDatTauSchema);
const AppraiseTrain = mongoose.model("AppraiseTrain", AppraiseTrainSchema);
const PhieuDatXeBus = mongoose.model("PhieuDatXeBus", PhieuDatXeBusSchema);
const AppraiseBus = mongoose.model("AppraiseBus", AppraiseBusSchema);
const LichSuDatXeOto = mongoose.model("LichSuDatXeOto", LichSuDatXeOtoSchema);
const LichSuDatTau = mongoose.model("LichSuDatTau", LichSuDatTauSchema);
const LichSuDatXeBus = mongoose.model("LichSuDatXeBus", LichSuDatXeBusSchema);

module.exports = {
  KhachHang,
  DanhSachSanBay,
  Tuyen,
  PhuongTien,
  TramDung,
  ChiTietXeOto,
  DatXeOto,
  AppraiseCar,
  PhieuDatTau,
  AppraiseTrain,
  PhieuDatXeBus,
  AppraiseBus,
  LichSuDatXeOto,
  LichSuDatTau,
  LichSuDatXeBus,
};
