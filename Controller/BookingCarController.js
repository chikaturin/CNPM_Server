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
let new_value_car = 1;

// Hàm tạo đơn đặt xe
const BookingCar = async (req, res) => {
  try {
    const { MaDetailCar, MaCus, MaTram, DiemDon, DiemTra, NgayGioDat, SoKm } =
      req.body;

    // Tìm thông tin trạm dừng và chi tiết xe
    const tramDung = await TramDung.findById(MaTram);
    const chiTietXe = await ChiTietXeOto.findById(MaDetailCar);

    if (!chiTietXe) {
      return res.status(404).json({ message: "Chi tiết xe không tồn tại" });
    }

    // Sinh mã đặt xe
    const MaDX = `DX${new_value_car}`; // Ví dụ: sử dụng thời gian hiện tại để tạo mã

    // Tạo đối tượng DatXeOto và lưu vào cơ sở dữ liệu
    const CreateDatXeOto = new DatXeOto({
      MaDX,
      MaDetailCar,
      MaCus,
      MaTram,
      DiemDon,
      DiemTra,
      NgayGioDat,
      SoKm,
      ThanhTien: chiTietXe.SoTien_1km * SoKm,
      Trangthai: true, // Hoặc giá trị mặc định nào đó
    });

    const result = await CreateDatXeOto.save();

    // Trả về kết quả
    res.status(200).json(result);
  } catch (e) {
    console.error("Lỗi khi tạo DatXeOto:", e);
    res.status(500).json({ error: "Không thể tạo DatXeOto" });
  }
};

// Hàm giả lập để lấy giá trị tự động tăng, bạn cần thay đổi theo cách bạn lưu trữ giá trị tự động tăng
async function getNewValueCar() {
  // Implement logic to get the next value for MaDX
  return 1; // Giá trị mẫu
}
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

module.exports = {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
};
