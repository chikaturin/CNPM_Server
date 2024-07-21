const DanhSachSanBay = require("../Schema/schema").DanhSachSanBay;

const GetDanhSachSanBay = async (req, res) => {
  try {
    const danhSachSanBay = await DanhSachSanBay.find({});
    res.status(200).json({ danhSachSanBay });
  } catch (e) {
    res.status(500).json("not get danh sach san bay");
  }
};

let new_value_danhSachSanBay = 5;

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

module.exports = {
  GetDanhSachSanBay,
  CreateDanhSachSanBay,
  DeleteDanhSachSanBay,
};
