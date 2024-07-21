const PhieuDatXeBus = require("../Schema/schema.js").PhieuDatXeBus;

const GetBuyTicketBus = async (req, res) => {
  try {
    const buyTicketBus = await PhieuDatXeBus.find();
    res.status(200).json({ buyTicketBus });
  } catch (e) {
    res.status(500).json("not get buy ticket bus");
  }
};

let new_value_bus = 1;

const BuyTicketBus = async (req, res) => {
  try {
    const {
      MaCus,
      MaPT,
      SLVe,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh,
      ThanhTien,
      TrangThai,
    } = req.body;
    if (
      !MaCus ||
      !MaPT ||
      !SLVe ||
      !DiemDon ||
      !DiemTra ||
      !NgayGioKhoiHanh ||
      !ThanhTien
    ) {
      return res.status(400).json("Thiếu thông tin");
    }

    if (SLVe <= 0) {
      return res.status(400).json({ message: "Số lượng vé phải lớn hơn 0." });
    }

    const MaDX = `DX${new_value_bus}`;
    new_value_bus += 1;
    const MaKH = await KhachHang.findbyId({ MaCus: MaCus });
    const MaXeBus = await PhuongTien.findbyId({ MaPT: MaPT });
    const buyTicketBus = new PhieuDatXeBus({
      MaVeBus: MaDX,
      MaCus: MaKH._id,
      MaPT: MaXeBus.GiaTienVe,
      SLVe,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh,
      ThanhTien: MaXeBus.GiaTienVe * SLVe,
    });
    await buyTicketBus.save();
    res.status(200).json({ buyTicketBus });
  } catch (e) {
    res.status(500).json("not create buy ticket bus");
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

    await PhieuDatXeBus.findByIdAndUpdate(id, {
      $set: { NgayGioDat: newNgayGioDat },
    });
    res.status(200).json({ message: "Đã cập nhật Ngày giờ đặt thành công." });
  } catch (e) {
    console.error("Lỗi khi cập nhật PhieuDatXeBus:", e);
    res.status(500).json({ error: "Không thể cập nhật Ngày giờ đặt." });
  }
};
const CancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await PhieuDatXeBus.findByIdAndDelete(id);
    res.status(200).json({ message: "PhieuDatXeBus deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete dat xe o to");
  }
};

module.exports = {
  GetBuyTicketBus,
  BuyTicketBus,
  SchedularChange,
  CancelBooking,
};
