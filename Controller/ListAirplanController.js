const DanhSachSanBay = require("../Schema/schema").DanhSachSanBay;
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs

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

    const MaSB = uuidv4(); // Generate a unique ID using UUID

    const newDanhSachSanBay = new DanhSachSanBay({
      MaSB: MaSB,
      TenSanBay,
      ThanhPho,
    });

    await newDanhSachSanBay.save();
    res.status(201).json({ newDanhSachSanBay });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Không thể tạo danh sách sân bay." });
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

const getSanBaybyMaSanBay = async (req, res) => {
  const { sanbay } = req.query;

  if (!sanbay) {
    return res.status(400).json({ message: "sanbay is required" });
  }

  try {
    const sanbays = await DanhSachSanBay.find({
      TenSanBay: { $regex: sanbay, $options: "i" },
    });

    if (!sanbays.length) {
      return res
        .status(404)
        .json({ message: "No sanbays found with the given TenSanBay" });
    }

    res.status(200).json({ sanbays });
  } catch (error) {
    res.status(500).json({ message: "Error finding SanBay", error });
  }
};

module.exports = {
  GetDanhSachSanBay,
  CreateDanhSachSanBay,
  DeleteDanhSachSanBay,
  GetSanBayID,
  getSanBaybyMaSanBay,
};
