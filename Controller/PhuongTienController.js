const PhuongTien = require("../Schema/schema.js").PhuongTien;
const Tuyen = require("../Schema/schema.js").Tuyen;
const CounterPhuongTien = require("../Schema/schema").CounterPhuongTien;

const GetPhuongTien = async (req, res) => {
  try {
    const phuongTien = await PhuongTien.find({});
    res.status(200).json({ phuongTien });
  } catch (e) {
    res.status(500).json("not get phuong tien");
  }
};

const CreatePhuongTien = async (req, res) => {
  try {
    const { MaTuyen, MaLoai, TenPhuongTien, SoGheToiDa, image } = req.body;

    // Kiểm tra dữ liệu yêu cầu
    if (
      !MaTuyen ||
      !MaLoai === undefined ||
      !TenPhuongTien ||
      !SoGheToiDa ||
      !image
    ) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }

    if (SoGheToiDa <= 7) {
      return res.status(400).json({ message: "Số ghế tối đa phải lớn hơn 7." });
    }
    const counterPhuongTien = await CounterPhuongTien.findOneAndUpdate(
      { _id: "phuongTienCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (!counterPhuongTien) {
      return res.status(500).json({ message: "Lỗi khi lấy bộ đếm." });
    }

    const MaPT = `PT${counterPhuongTien.seq}`;

    // Kiểm tra xem Mã Tuyến có tồn tại hay không
    const checkMaTuyen = await Tuyen.exists({ MaTuyen });
    if (!checkMaTuyen) {
      return res.status(400).json({ message: "Mã tuyến không tồn tại." });
    }

    // Tạo mới PhuongTien
    const createPhuongTien = new PhuongTien({
      MaPT: MaPT,
      MaTuyen,
      MaLoai,
      TenPhuongTien,
      SoGheToiDa,
      image,
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

const SearchFindPhuongTien = async (req, res) => {
  let type;
  switch (req.params.type) {
    case "true":
      type = true;
      break;
    case "false":
      type = false;
      break;
    default:
      return res.status(400).send("Invalid type parameter");
  }

  try {
    const phuongTien = await PhuongTien.find({ MaLoai: type });
    res.json(phuongTien);
  } catch (err) {
    res.status(500).send("Error querying database");
  }
};

module.exports = {
  GetPhuongTien,
  CreatePhuongTien,
  DeletePhuongTien,
  SearchFindPhuongTien,
};
