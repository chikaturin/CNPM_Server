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

    const CounterDatXe = await CounterDatXeOto.findOneAndUpdate(
      { _id: "datXeCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const MaDX = `DX${CounterDatXe.seq}`;

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

const UpdateState = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBooking = await DatXeOto.findByIdAndUpdate(
      id,
      { $set: { Trangthai: true } },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await LichSuDatXeOto.create({
      MaDX: updatedBooking.MaDX,
      MaKH: "KH02",
      Date: updatedBooking.NgayGioDat.toString(),
    });

    res
      .status(200)
      .json({ message: "Đã cập nhật trạng thái đặt xe thành công." });
  } catch (e) {
    console.error("Lỗi khi cập nhật trạng thái DatXeOto:", e);
    res.status(500).json({ error: "Không thể cập nhật trạng thái đặt xe." });
  }
};

const CancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await DatXeOto.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "DatXeOto đã được hủy thành công." });
  } catch (e) {
    console.error("Lỗi khi hủy DatXeOto:", e);
    res.status(500).json({ error: "Không thể hủy đặt xe." });
  }
};
const FindBookingCarID = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id là bắt buộc" });
  }

  try {
    const datXes = await DatXeOto.findById(id);
    if (!datXes) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đặt xe với id được cung cấp" });
    }
    res.status(200).json({ datXes });
  } catch (error) {
    console.error("Lỗi khi tìm đặt xe theo id:", error);
    res.status(500).json({ message: "Lỗi khi tìm đặt xe theo id", error });
  }
};

module.exports = {
  GetDatXeOto,
  BookingCar,
  SchedularChange,
  CancelBooking,
  FindBookingCarID,
  UpdateState,
};
