const Tuyen = require("../Schema/schema.js").Tuyen;
const DanhSachSanBay = require("../Schema/schema.js").DanhSachSanBay;

const GetTuyen = async (req, res) => {
  try {
    const tuyen = await Tuyen.find({});
    res.status(200).json({ tuyen });
  } catch (e) {
    res.status(500).json("not get tuyen");
  }
};

let new_value_tuyen = 1;
const CreateTuyen = async (req, res) => {
  try {
    const { DiemKhoiHanh, DiemKetThuc, ThoiGianKhoiHanh, ThoiGianKetThuc } =
      req.body;

    if (
      !DiemKhoiHanh ||
      !DiemKetThuc ||
      !ThoiGianKhoiHanh ||
      !ThoiGianKetThuc
    ) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }

    const diemKhoiHanhIsAirport = await DanhSachSanBay.exists({
      MaSB: DiemKhoiHanh,
    });
    const diemKetThucIsAirport = await DanhSachSanBay.exists({
      MaSB: DiemKetThuc,
    });
    const checkKH = await Tuyen.exists({ DiemKhoiHanh });
    const checkKT = await Tuyen.exists({ DiemKetThuc });
    if (
      diemKhoiHanhIsAirport &&
      diemKetThucIsAirport &&
      DiemKhoiHanh === DiemKetThuc
    ) {
      return res.status(400).json({
        message: "Điểm khởi hành và điểm kết thúc không thể đều là sân bay.",
      });
    }
    if (diemKhoiHanhIsAirport && checkKT) {
      return res.status(400).json({
        message: "Điểm kết thúc đã tồn tại.",
      });
    }
    if (diemKetThucIsAirport && checkKH) {
      return res.status(400).json({
        message: "Điểm khởi hành đã tồn tại.",
      });
    }
    const MaTuyen = `T${new_value_tuyen}`;
    new_value_tuyen += 1;
    const newTuyen = new Tuyen({
      MaTuyen,
      DiemKhoiHanh,
      DiemKetThuc,
      ThoiGianKhoiHanh,
      ThoiGianKetThuc,
    });
    await newTuyen.save();

    res.status(200).json({ newTuyen });
  } catch (e) {
    console.error("Lỗi khi tạo tuyến:", e);
    res.status(500).json({ message: "Không thể tạo tuyến.", error: e.message });
  }
};

const DeleteTuyen = async (req, res) => {
  try {
    const { id } = req.params;
    await Tuyen.findByIdAndDelete(id);
    res.status(200).json({ message: "Tuyen deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete tuyen");
  }
};

module.exports = {
  GetTuyen,
  CreateTuyen,
  DeleteTuyen,
};
