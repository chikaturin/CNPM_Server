const DanhSachSanBay = require("../Schema/schema").DanhSachSanBay;
const Counter = require("../Schema/schema").CounterLSB;

const GetDanhSachSanBay = async (req, res) => {
  try {
    const danhSachSanBay = await DanhSachSanBay.find({});
    res.status(200).json({ danhSachSanBay });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error retrieving danh sach san bay" });
  }
};
const CreateDanhSachSanBay = async (req, res) => {
  try {
    const { TenSanBay, ThanhPho } = req.body;

    if (!TenSanBay || !ThanhPho) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }

    const counter = await Counter.findOneAndUpdate(
      { _id: "sanBayCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (!counter) {
      return res.status(500).json({ message: "Lỗi khi lấy bộ đếm." });
    }

    const MaSB = `SB${counter.seq}`;
    const newDanhSachSanBay = new DanhSachSanBay({
      MaSB: MaSB,
      TenSanBay,
      ThanhPho,
    });

    await newDanhSachSanBay.save();
    res.status(201).json({ newDanhSachSanBay });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Không thể tạo danh sách sân bay.", error: e.message });
  }
};

const DeleteDanhSachSanBay = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await DanhSachSanBay.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "DanhSachSanBay not found" });
    }

    res.status(200).json({ message: "DanhSachSanBay deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error deleting danh sach san bay" });
  }
};

const GetSanBayID = async (req, res) => {
  try {
    const { id } = req.params;
    const danhSachSanBay = await DanhSachSanBay.findById(id);

    if (!danhSachSanBay) {
      return res.status(404).json({ message: "Sân bay không tồn tại" });
    }

    res.status(200).json(danhSachSanBay);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error retrieving sân bay" });
  }
};

const getSanBaybyTenSanBay = async (req, res) => {
  const { TenSanBay } = req.query;

  if (!TenSanBay) {
    return res.status(400).json({ message: "sanbay is required" });
  }

  try {
    const sanbays = await DanhSachSanBay.find({
      TenSanBay: { $regex: TenSanBay, $options: "i" },
    });

    if (!sanbays.length) {
      return res
        .status(404)
        .json({ message: "No sanbays found with the given TenSanBay" });
    }

    res.status(200).json({ sanbays });
  } catch (error) {
    console.error("Error finding SanBay:", error);
    res.status(500).json({ message: "Error finding SanBay", error });
  }
};

module.exports = {
  GetDanhSachSanBay,
  CreateDanhSachSanBay,
  DeleteDanhSachSanBay,
  GetSanBayID,
  getSanBaybyTenSanBay,
};
