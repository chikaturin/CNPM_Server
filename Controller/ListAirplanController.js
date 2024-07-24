const DanhSachSanBay = require("../Schema/schema").DanhSachSanBay;

const GetDanhSachSanBay = async (req, res) => {
  try {
    const danhSachSanBay = await DanhSachSanBay.find({});
    res.status(200).json({ danhSachSanBay });
  } catch (e) {
    res.status(500).json("not get danh sach san bay");
  }
};

let new_value_danhSachSanBay = 1;

const CreateDanhSachSanBay = async (req, res) => {
  try {
    const { TenSanBay, ThanhPho } = req.body;

    if (!TenSanBay || !ThanhPho) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }

    const MaSB = `SB${new_value_danhSachSanBay}`;
    new_value_danhSachSanBay += 1;

    const newDanhSachSanBay = new DanhSachSanBay({
      MaSB: MaSB,
      TenSanBay,
      ThanhPho,
    });

    await newDanhSachSanBay.save();
    res.status(200).json({ newDanhSachSanBay });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Không thể tạo danh sách sân bay." });
  }
};

const DeleteDanhSachSanBay = async (req, res) => {
  try {
    const { id } = req.params;
    await DanhSachSanBay.findByIdAndDelete(id);
    res.status(200).json({ message: "DanhSachSanBay deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete danh sach san bay");
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
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const getSanBaybyMaSanBay = async (req, res) => {
  const { sanbay } = req.query;

  if (!sanbay) {
    return res.status(400).json({ message: "sanbay is required" });
  }

  try {
    const sanbays = await DanhSachSanBay.find({
      MaSB: { $regex: sanbay, $options: "i" },
    });
    if (!sanbays.length) {
      return res
        .status(404)
        .json({ message: "No sanbays found with the given TenSanBay" });
    }
    res.status(200).json({ sanbays });
  } catch (error) {
    res.status(500).json({ message: "Error finding MaSB", error });
  }
};

module.exports = {
  GetDanhSachSanBay,
  CreateDanhSachSanBay,
  DeleteDanhSachSanBay,
  GetSanBayID,
  getSanBaybyMaSanBay,
};
