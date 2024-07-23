const Tuyen = require("../Schema/schema.js").Tuyen;
const TramDung = require("../Schema/schema.js").TramDung;

const GetTramDung = async (req, res) => {
  try {
    const tramDung = await TramDung.find({});
    res.status(200).json({ tramDung });
  } catch (e) {
    res.status(500).json("not get tram dung");
  }
};

let new_value_tramDung = 1;

const CreateTramDung = async (req, res) => {
  try {
    const { MaTuyen, DiaChi, GiaTienVe, SoKM } = req.body;

    if (!MaTuyen || !DiaChi || !GiaTienVe || !SoKM) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }

    const MaTram = `TD${new_value_tramDung}`;
    new_value_tramDung += 1;

    const getMaTuyen = await Tuyen.exists({ MaTuyen });
    if (!getMaTuyen) {
      return res.status(400).json({ message: "Mã tuyến không tồn tại." });
    }

    const checkDiaChi = await TramDung.exists({ DiaChi });
    if (checkDiaChi) {
      return res.status(400).json({ message: "Địa chỉ đã tồn tại." });
    }

    if (GiaTienVe <= 0) {
      return res.status(400).json({ message: "Giá tiền vé phải lớn hơn 0." });
    }

    if (SoKM <= 0) {
      return res.status(400).json({ message: "Số KM phải lớn hơn 0." });
    }
    const newTramDung = new TramDung({
      MaTram,
      MaTuyen,
      DiaChi,
      SoKM,
      GiaTienVe,
    });

    await newTramDung.save();

    res.status(201).json({ newTramDung });
  } catch (e) {
    console.error("Lỗi khi tạo trạm dừng:", e);
    res
      .status(500)
      .json({ message: "Không thể tạo trạm dừng.", error: e.message });
  }
};

const GetTramDungID = async (req, res) => {
  try {
    const { id } = req.params;
    const tramDung = await TramDung.findById(id);

    if (!tramDung) {
      return res.status(404).json({ message: "Trạm dừng không tồn tại" });
    }

    res.status(200).json(tramDung);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

const DeleteTramDung = async (req, res) => {
  try {
    const { id } = req.params;
    await TramDung.findByIdAndDelete(id);
    res.status(200).json({ message: "TramDung deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete tram dung");
  }
};
module.exports = {
  GetTramDung,
  CreateTramDung,
  GetTramDungID,
  DeleteTramDung,
};
