const DatXeOto = require("../Schema/schema").DatXeOto; // Đảm bảo rằng bạn đã import mô hình DatXeOto
const TramDung = require("../Schema/schema").TramDung; // Đảm bảo rằng bạn đã import mô hình TramDung
const ChiTietXeOto = require("../Schema/schema").ChiTietXeOto;

const GetDatXeOto = async (req, res) => {
  try {
    const datXeOto = await DatXeOto.find({});
    res.status(200).json({ datXeOto });
  } catch (e) {
    res.status(500).json("not get dat xe o to");
  }
};
let new_value_car = 2;

const BookingCar = async (req, res) => {
  try {
    const {
      MaDetailCar,
      MaCus,
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

    const MaDX = `DX${new_value_car}`;
    new_value_car += 1; // Ensure this variable is defined and managed correctly

    const CreateDatXeOto = new DatXeOto({
      MaDX,
      MaDetailCar,
      MaCus,
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

    res.status(200).json(result);
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
    const { id } = req.params;
    await DatXeOto.findByIdAndDelete(id);
    res.status(200).json({ message: "DatXeOto deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete dat xe o to");
  }
};
const HistoryBookingCar = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const his = await DatXeOto.findById(id);

    if (!his) {
      return res.status(404).json({ message: "Booking record not found" });
    }

    res.status(200).json({ his });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const FindBookingCarID = async (req, res) => {
  const { MaDX } = req.query;

  if (!MaDX) {
    return res.status(400).json({ message: "MaDX is required" });
  }

  try {
    const datXes = await DatXeOto.find({
      MaDX: { $regex: MaDX, $options: "i" },
    });
    if (!datXes.length) {
      return res.status(404).json({ message: "No  found with the given MaDX" });
    }
    res.status(200).json({ datXes });
  } catch (error) {
    res.status(500).json({ message: "Error finding madx", error });
  }
};

module.exports = {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  HistoryBookingCar,
};
