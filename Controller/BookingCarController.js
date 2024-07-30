const { LichSuDatXeOto } = require("../Schema/schema");

const DatXeOto = require("../Schema/schema").DatXeOto; // Đảm bảo rằng bạn đã import mô hình DatXeOto
const TramDung = require("../Schema/schema").TramDung; // Đảm bảo rằng bạn đã import mô hình TramDung
const ChiTietXeOto = require("../Schema/schema").ChiTietXeOto;
const CounterDatXeOto = require("../Schema/schema").CounterDatXe;
const GetDatXeOto = async (req, res) => {
  try {
    const datXeOto = await DatXeOto.find({});
    res.status(200).json({ datXeOto });
  } catch (e) {
    res.status(500).json("not get dat xe o to");
  }
};

const BookingCar = async (req, res) => {
  try {
    const {
      MaDetailCar,
      Sdt,
      MaTram,
      DiemSanBay,
      DiemDon_Tra,
      NgayGioDat,
      ThanhTien,
      SoKm,
      Description,
    } = req.body;

    const tramDung = await TramDung.findById(MaTram);
    const chiTietXe = await ChiTietXeOto.findById(MaDetailCar);

    if (!chiTietXe) {
      return res.status(404).json({ message: "Chi tiết xe không tồn tại" });
    }

    if (!tramDung) {
      return res.status(404).json({ message: "Trạm dừng không tồn tại" });
    }

    const CounterDatXe = await CounterDatXeOto.findOneAndUpdate(
      { _id: "datXeCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const MaDX = `DX${CounterDatXe.seq}`;

    const CreateDatXeOto = new DatXeOto({
      MaDX,
      MaDetailCar,
      Sdt,
      MaTram,
      DiemSanBay,
      DiemDon_Tra,
      NgayGioDat,
      SoKm,
      ThanhTien,
      Trangthai: false,
      Description,
    });

    const result = await CreateDatXeOto.save();

    res.status(200).json(result); // Đảm bảo result chứa trường Sdt
  } catch (e) {
    console.error("Lỗi khi tạo DatXeOto:", e);
    res.status(500).json({ error: "Không thể tạo DatXeOto" });
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

    await DatXeOto.findByIdAndUpdate(id, {
      $set: { NgayGioDat: newNgayGioDat },
    });
    res.status(200).json({ message: "Đã cập nhật Ngày giờ đặt thành công." });
  } catch (e) {
    console.error("Lỗi khi cập nhật DatXeOto:", e);
    res.status(500).json({ error: "Không thể cập nhật Ngày giờ đặt." });
  }
};

const CancelBooking = async (req, res) => {
  try {
    const { MaDX } = req.params;
    if (!MaDX) {
      return res.status(400).json("Thiếu thông tin");
    }

    await DatXeOto.deleteOne({ MaDX });
    await LichSuDatXeOto.deleteOne({ MaDX });

    res.status(200).json({ message: "DatXeOto đã được hủy thành công." });
  } catch (e) {
    console.error("Lỗi khi hủy DatXeOto:", e);
    res.status(500).json({ error: "Không thể hủy đặt xe." });
  }
};

const FindBookingCarID = async (req, res) => {
  try {
    const { id } = req.params;
    const datXeOto = await DatXeOto.findById(id);

    if (!datXeOto) {
      return res.status(404).json({ message: "DatXeOto not found" });
    }

    res.status(200).json(datXeOto);
  } catch (e) {
    console.error("Error fetching DatXeOto by ID:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const FindBookingCarMaDX = async (req, res) => {
  const { MaDX } = req.query;

  if (!MaDX) {
    return res.status(400).json({ message: "MaDX is required" });
  }

  try {
    const datXes = await DatXeOto.find({
      MaDX: { $regex: MaDX, $options: "i" },
    });

    if (!datXes.length) {
      return res
        .status(404)
        .json({ message: "No booking found with the given MaDX" });
    }

    res.status(200).json({ datXes });
  } catch (error) {
    console.error("Error finding cars by MaDX:", error);
    res.status(500).json({ message: "Error finding cars", error });
  }
};

module.exports = {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  FindBookingCarMaDX,
};
