const mongoose = require("mongoose");

const KhachHangSchema = new mongoose.Schema({
  MaCus: {
    type: String,
    required: true,

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
  MaSB: { type: String, required: true },
  TenSanBay: { type: String, required: true, maxlength: 100 },
  ThanhPho: { type: String, required: true, maxlength: 100 },
});

const TuyenSchema = new mongoose.Schema({
  MaTuyen: { type: String, required: true, maxlength: 5 },
  DiemSanBay: { type: String, ref: "DanhSachSanBay", required: true },
  DiemKetThuc: { type: String, maxlength: 300, required: true },
  ThoiGianKhoiHanh: { type: Date, required: true },
  ThoiGianKetThuc: { type: Date, required: true },
});

const PhuongTienSchema = new mongoose.Schema({
  MaPT: { type: String, required: true, maxlength: 5 },
  MaTuyen: { type: String, required: true, ref: "Tuyen" },
  MaLoai: { type: Boolean, required: true },
  TenPhuongTien: { type: String, required: true, maxlength: 100 },
  SoGheToiDa: { type: Number, required: true },
  image: { type: String, required: true },
  TenCty: { type: String, required: true, maxlength: 100 },
});

const TramDungSchema = new mongoose.Schema({
  MaTram: { type: String, required: true, maxlength: 5 },
  MaTuyen: { type: String, ref: "Tuyen" },
  DiaChi: { type: String, required: true, maxlength: 100 },
  SoKM: { type: Number, required: true },
  GiaTienVe: { type: Number, required: true },
  GiaTienVeTau: { type: Number, required: true },
});

const ChiTietXeOtoSchema = new mongoose.Schema({
  MaDetailCar: { type: String, required: true },
  TenHangXe: { type: String, required: true, maxlength: 100 },
  TenChuSoHuu: { type: String, required: true, maxlength: 100 },
  SoHanhLyToiDa: { type: Number, required: true },
  BienSoXe: { type: String, required: true, maxlength: 10 },
  CongTy: { type: String, required: true, maxlength: 100 },
  SDT_TaiXe: { type: String, required: true, maxlength: 10 },
  SoGheToiDa: { type: Number, required: true },
  SoTien_1km: { type: Number, required: true },
  Image: { type: String, required: true },
  MaSB: { type: String, ref: "DanhSachSanBay" },
});

const DatXeOtoSchema = new mongoose.Schema({
  MaDX: { type: String, required: true, maxlength: 5 },
  MaDetailCar: { type: String, ref: "ChiTietXeOto" },
  Sdt: { type: String, ref: "KhachHang" },
  MaTram: { type: String, ref: "TramDung" },
  DiemSanBay: { type: String, required: true, maxlength: 100 },
  DiemDon_Tra: { type: String, required: true, maxlength: 100 },
  NgayGioDat: { type: String, required: true },
  ThanhTien: { type: Number, required: true },
  Trangthai: { type: Boolean, required: true },
  Description: { type: String, maxlength: 500 },
});

const AppraiseCarSchema = new mongoose.Schema({
  MaDX: { type: String, ref: "DatXeOto" },
  MaCus: { type: String, ref: "KhachHang" },
  SoSao: { type: Number, required: true },
  NoiDung: { type: String, required: true, maxlength: 500 },
});

const PhieuDatTauSchema = new mongoose.Schema({
  MaVeTau: { type: String, required: true, maxlength: 5 },
  MaPT: { type: String, ref: "PhuongTien" },
  MaTram: { type: String, ref: "TramDung" },
  SLVeNguoiLon: { type: Number, required: true },
  SLVeTreEm: { type: Number, required: true },
  DiemDon: { type: String, required: true, maxlength: 100 },
  DiemTra: { type: String, required: true, maxlength: 100 },
  NgayGioKhoiHanh: { type: String, required: true },
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
  MaVeBus: { type: String, required: true, maxlength: 5 },
  MaPT: { type: String, ref: "PhuongTien" },
  MaTram: { type: String, ref: "TramDung" },
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
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "DatXeOto" },
  Date: { type: String },
});

const LichSuDatTauSchema = new mongoose.Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "PhieuDatTau" },
  Date: { type: Date },
});

const LichSuDatXeBusSchema = new mongoose.Schema({
  MaKH: { type: String, required: true },
  MaDX: { type: String, ref: "PhieuDatXeBus" },
  Date: { type: String },
});

const counterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
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
const CounterLSB = mongoose.model("CounterLSB", counterSchema);
const CounterTuyen = mongoose.model("CounterTuyen", counterSchema);
const CounterPhuongTien = mongoose.model("CounterPhuongTien", counterSchema);
const CounterChitietxe = mongoose.model("CounterChitietxe", counterSchema);
const CounterTramDung = mongoose.model("CounterTramDung", counterSchema);
const CounterDatXe = mongoose.model("CounterDatXe", counterSchema);
const CounterDatTau = mongoose.model("CounterDatTau", counterSchema);
const CounterDatBuyt = mongoose.model("CounterDatBuyt", counterSchema);

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
  CounterLSB,
  CounterTuyen,
  CounterPhuongTien,
  CounterChitietxe,
  CounterTramDung,
  CounterDatXe,
  CounterDatTau,
  CounterDatBuyt,
};
