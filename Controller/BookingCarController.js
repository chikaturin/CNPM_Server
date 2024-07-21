const DatXeOto = require("../Schema/schema.js").DatXeOto;

const GetDatXeOto = async (req, res) => {
  try {
    const datXeOto = await DatXeOto.find({});
    res.status(200).json({ datXeOto });
  } catch (e) {
    res.status(500).json("not get dat xe o to");
  }
};
let new_value_car = 1;

const BookingCar = async (req, res) => {
  try {
    const {
      MaDetailCar,
      MaCus,
      MaTram,
      DiemDon,
      DiemTra,
      SoLuongHanhKhach,
      NgayGioDat,
      SoKm,
    } = req.body;

    if (SoLuongHanhKhach <= 0) {
      return res
        .status(400)
        .json({ message: "Số lượng hành khách phải lớn hơn 0." });
    }
    const tramDung = await TramDung.findById(MaTram);
    const chiTietXe = await ChiTietXeOto.findById(MaDetailCar);
    if (!chiTietXe) {
      return res.status(404).json({ message: "Chi tiết xe không tồn tại" });
    }

    if (SoLuongHanhKhach > chiTietXe.SoGheToiDa) {
      return res.status(400).json({
        message: "Số lượng hành khách tối đa là " + chiTietXe.SoGheToiDa,
      });
    }
    const MaDX = `DX${new_value_car}`;
    new_value_car += 1;
    const CreateDatXeOto = new DatXeOto({
      MaDetailCar,
      DiemDon,
      DiemTra,
      SoLuongHanhKhach,
      NgayGioDat,
      SoKm: tramDung.SoKM,
      ThanhTien: chiTietXe.SoTien_1km * SoKm,
    });
    await CreateDatXeOto.save();

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

module.exports = {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
};
