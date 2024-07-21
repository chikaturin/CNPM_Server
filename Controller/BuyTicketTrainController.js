const PhieuDatTau = require("../Schema/schema.js").PhieuDatTau;

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
      MaCus,
      MaPT,
      SLVeNguoiLon,
      SLVeTreEm,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh,
      ThanhTien,
      TrangThai,
    } = req.body;
    if (
      !MaVeTau ||
      !MaCus ||
      !MaPT ||
      !SLVeNguoiLon ||
      !SLVeTreEm ||
      !DiemDon ||
      !DiemTra ||
      !NgayGioKhoiHanh ||
      !ThanhTien
    ) {
      return res.status(400).json("Thiếu thông tin");
    }
    MaCus = await KhachHang.findbyId({ MaCus: MaCus });
    MaPT = await PhuongTien.findbyId({ MaPT: MaPT });
    if (SLVeNguoiLon <= 0) {
      return res
        .status(400)
        .json({ message: "Số lượng vé người lớn phải lớn hơn 0." });
    }
    const phieudattau = new PhieuDatTau({
      MaCus,
      MaPT,
      SLVeNguoiLon,
      SLVeTreEm,
      DiemDon,
      DiemTra,
      NgayGioKhoiHanh,
      ThanhTien:
        MaPT.GiaTienVe * SLVeNguoiLon + MaPT.GiaTienVe * 0.5 * SLVeTreEm,
      TrangThai,
    });
    await phieudattau.save();
    res.status(200).json({ phieudattau });
  } catch (e) {
    res.status(500).json("not create phieu dat tau");
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
    const { MaVeTau } = req.body;
    if (!MaVeTau) {
      return res.status(400).json("Thiếu thông tin");
    }
    await PhieuDatTau.deleteOne({ MaVeTau });
    res.status(200).json("delete phieu dat tau success");
  } catch (e) {
    res.status(500).json("not delete phieu dat tau");
  }
};

module.exports = {
  GetPhieusdattau,
  BuyTicketTrain,
  SchedularChange,
  CancelTicketTrain,
};
