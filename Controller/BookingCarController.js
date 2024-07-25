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

// Hàm tạo đơn đặt xe
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
      Description, // Thêm trường Description từ client
    } = req.body;

    // Tìm thông tin trạm dừng và chi tiết xe
    const tramDung = await TramDung.findById(MaTram);
    const chiTietXe = await ChiTietXeOto.findById(MaDetailCar);

    if (!chiTietXe) {
      return res.status(404).json({ message: "Chi tiết xe không tồn tại" });
    }

    if (!tramDung) {
      return res.status(404).json({ message: "Trạm dừng không tồn tại" });
    }

    // Sinh mã đặt xe
    const MaDX = `DX${new_value_car}`; // Sử dụng giá trị hiện tại để tạo mã
    new_value_car += 1;

    // Tạo đối tượng DatXeOto và lưu vào cơ sở dữ liệu
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
      Trangthai: true, // Đảm bảo rằng tên trường khớp với tên trường từ client
      Description, // Lưu mô tả từ client
    });

    const result = await CreateDatXeOto.save();

    // Trả về kết quả
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
    const his = await DatXeOto.findById(id);
    res.status(200).json({ his });
  } catch (e) {
    res.status(500).json("not delete dat xe o to");
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
