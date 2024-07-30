const {
  LichSuDatXeOto,
  DatXeOto,
  LichSuDatXeBus,
  PhieuDatXeBus,
  LichSuDatTau,
  PhieuDatTau,
} = require("../Schema/schema");

const UpdateState = async (req, res) => {
  try {
    const { id } = req.params;

    let updatedBooking = await DatXeOto.findByIdAndUpdate(
      id,
      { $set: { Trangthai: true } },
      { new: true }
    );

    if (updatedBooking) {
      await LichSuDatXeOto.create({
        MaKH: "KHthanh",
        MaDX: updatedBooking.MaDX,
        Date: updatedBooking.NgayGioDat,
      });
      await DatXeOto.findByIdAndDelete({ id });
      return res
        .status(200)
        .json({ message: "Đã cập nhật trạng thái đặt xe ô tô thành công." });
    }

    updatedBooking = await PhieuDatXeBus.findByIdAndUpdate(
      id,
      { $set: { TrangThai: true } },
      { new: true }
    );

    if (updatedBooking) {
      await LichSuDatXeBus.create({
        MaDX: updatedBooking.MaVeBus,
        MaKH: "KHthanh",
        Date: updatedBooking.NgayGioKhoiHanh,
      });
      await PhieuDatXeBus.findByIdAndDelete({ id });
      return res
        .status(200)
        .json({ message: "Đã cập nhật trạng thái đặt xe bus thành công." });
    }

    updatedBooking = await PhieuDatTau.findByIdAndUpdate(
      id,
      { $set: { TrangThai: true } },
      { new: true }
    );

    if (updatedBooking) {
      await LichSuDatTau.create({
        MaKH: "KHthanh",
        MaDX: updatedBooking.MaVeTau,
        Date: updatedBooking.NgayGioKhoiHanh,
      });
      await PhieuDatTau.findByIdAndDelete({ id });
      return res
        .status(200)
        .json({ message: "Đã cập nhật trạng thái đặt tàu thành công." });
    }

    return res.status(404).json({ message: "Booking not found" });
  } catch (e) {
    console.error("Lỗi khi cập nhật trạng thái:", e);
    res.status(500).json({ error: "Không thể cập nhật trạng thái đặt xe." });
  }
};

module.exports = {
  UpdateState,
};
