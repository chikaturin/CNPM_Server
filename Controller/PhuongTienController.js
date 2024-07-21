const PhuongTien = require("../Schema/schema.js").PhuongTien;
const Tuyen = require("../Schema/schema.js").Tuyen;
const GetPhuongTien = async (req, res) => {
  try {
    const phuongTien = await PhuongTien.find({});
    res.status(200).json({ phuongTien });
  } catch (e) {
    res.status(500).json("not get phuong tien");
  }
};

let new_value_phuongTien = 1;
const CreatePhuongTien = async (req, res) => {
  try {
    const { MaTuyen, MaLoai, TenPhuongTien, SoGheToiDa } = req.body;

    // Kiểm tra dữ liệu yêu cầu
    if (!MaTuyen || !MaLoai === undefined || !TenPhuongTien || !SoGheToiDa) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }

    if (SoGheToiDa <= 7) {
      return res.status(400).json({ message: "Số ghế tối đa phải lớn hơn 7." });
    }

    const MaPT = `PT${new_value_phuongTien}`;
    new_value_phuongTien += 1;

    // Kiểm tra xem Mã Tuyến có tồn tại hay không
    const checkMaTuyen = await Tuyen.exists({ MaTuyen });
    if (!checkMaTuyen) {
      return res.status(400).json({ message: "Mã tuyến không tồn tại." });
    }

    // Tạo mới PhuongTien
    const createPhuongTien = new PhuongTien({
      MaPT,
      MaTuyen,
      MaLoai,
      TenPhuongTien,
      SoGheToiDa,
    });

    const result = await createPhuongTien.save();
    res.status(200).json({ result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Không thể tạo phương tiện" });
  }
};

const DeletePhuongTien = async (req, res) => {
  try {
    const { id } = req.params;
    await PhuongTien.findByIdAndDelete(id);
    res.status(200).json({ message: "PhuongTien deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete phuong tien");
  }
};

module.exports = {
  GetPhuongTien,
  CreatePhuongTien,
  DeletePhuongTien,
};
