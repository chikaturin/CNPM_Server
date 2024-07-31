const PhieuDatTau = require("../Schema/schema.js").PhieuDatTau;
const CounterDatTau = require("../Schema/schema.js").CounterDatTau;
const PhuongTien = require("../Schema/schema.js").PhuongTien;
const lichSuDatTau = require("../Schema/schema.js").LichSuDatTau;

const GetPhieusdattau = async (req, res) => {
  try {
    const phieudattau = await PhieuDatTau.find({});
    res.status(200).json({ phieudattau });
  } catch (e) {
    res.status(500).json("not get phieu dat tau");
  }
};

const BuyTicketTrain = async (req, res) => {
  try {
    const {
      MaPT,
      MaTram,
      SLVeNguoiLon,
      SLVeTreEm,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh,
      ThanhTien,
      TrangThai,
    } = req.body;

    if (
      !MaPT ||
      !MaTram ||
      !SLVeNguoiLon ||
      !DiemDon ||
      !DiemTra ||
      !NgayGioKhoiHanh ||
      !ThanhTien
    ) {
      return res.status(400).json({ error: "Thiếu thông tin" });
    }

    const phuongTien = await PhuongTien.findById(MaPT);
    if (!phuongTien) {
      return res.status(400).json({ message: "Không tìm thấy phương tiện" });
    }

    if (SLVeNguoiLon <= 0) {
      return res
        .status(400)
        .json({ message: "Số lượng vé người lớn phải lớn hơn 0." });
    }

    const countterdattau = await CounterDatTau.findOneAndUpdate(
      { _id: "datbuytCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const MaVeTau = `DT${countterdattau.seq}`;

    const phieuDatTau = new PhieuDatTau({
      MaVeTau,
      MaPT,
      MaTram,
      SLVeNguoiLon,
      SLVeTreEm,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh,
      ThanhTien,
      TrangThai,
    });

    await phieuDatTau.save();
    res.status(200).json({ phieuDatTau });
  } catch (e) {
    res.status(500).json("Không tạo được phiếu đặt tàu");
  }
};

const FindBuyTicketTrainMaDX = async (req, res) => {
  try {
    const { MaVeTau } = req.params;
    const buyTicketTrain = await PhieuDatTau.findOne({ MaVeTau });

    if (!buyTicketTrain) {
      return res.status(404).json({ message: "Train ticket not found" });
    }

    res.status(200).json({ buyTicketTrain });
  } catch (e) {
    console.error("Error fetching train ticket by MaVeTau:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const SchedularChange = async (req, res) => {
  try {
    const { id } = req.params;
    const { NgayGioDat } = req.body;

    const newNgayGioDat = new Date(NgayGioDat);
    if (newNgayGioDat < new Date()) {
      return res.status(400).json({
        message: "Ngày giờ đặt phải lớn hơn hoặc bằng ngày hiện tại.",
      });
    }

    await PhieuDatTau.findByIdAndUpdate(id, {
      $set: { NgayGioDat: newNgayGioDat },
    });
    res.status(200).json({ message: "Đã cập nhật Ngày giờ đặt thành công." });
  } catch (e) {
    console.error("Lỗi khi cập nhật PhieuDatTau:", e);
    res.status(500).json({ error: "Không thể cập nhật Ngày giờ đặt." });
  }
};

const CancelTicketTrain = async (req, res) => {
  try {
    const { MaVeTau } = req.params;
    if (!MaVeTau) {
      return res.status(400).json({ message: "Thiếu thông tin" });
    }

    const deleteBookingResult = await PhieuDatTau.deleteOne({ MaVeTau });
    if (deleteBookingResult.deletedCount === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const deleteHistoryResult = await lichSuDatTau.deleteOne({ MaDX: MaVeTau });

    if (!deleteHistoryResult) {
      return res.status(404).json({ message: "Booking history not found" });
    }

    return res.status(200).json({ message: "Delete phieu dat tau success" });
  } catch (e) {
    console.error("Error deleting phieu dat tau:", e);
    return res.status(500).json({ message: "Error deleting phieu dat tau" });
  }
};

module.exports = {
  GetPhieusdattau,
  BuyTicketTrain,
  SchedularChange,
  CancelTicketTrain,
  FindBuyTicketTrainMaDX,
};
