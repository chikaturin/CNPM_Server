const Tuyen = require("../Schema/schema.js").Tuyen;
const TramDung = require("../Schema/schema.js").TramDung;
const CounterTramDung = require("../Schema/schema").CounterTramDung;

const GetTramDung = async (req, res) => {
  try {
    const tramDung = await TramDung.find({});
    res.status(200).json({ tramDung });
  } catch (e) {
    res.status(500).json("not get tram dung");
  }
};

const CreateTramDung = async (req, res) => {
  try {
    const { MaTuyen, DiaChi, GiaTienVe, SoKM, GiaTienVeTau } = req.body;

    // Validate required fields
    if (!MaTuyen || !DiaChi || !GiaTienVe || !SoKM || !GiaTienVeTau) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }

    // Check if MaTuyen exists
    const tuyenExists = await Tuyen.exists({ MaTuyen });
    if (!tuyenExists) {
      return res.status(400).json({ message: "Mã tuyến không tồn tại." });
    }

    // Check if DiaChi already exists
    const diaChiExists = await TramDung.exists({ DiaChi });
    if (diaChiExists) {
      return res.status(400).json({ message: "Địa chỉ đã tồn tại." });
    }

    // Validate numerical values
    if (GiaTienVe <= 0) {
      return res.status(400).json({ message: "Giá tiền vé phải lớn hơn 0." });
    }
    if (GiaTienVeTau <= 0) {
      return res
        .status(400)
        .json({ message: "Giá tiền vé tàu phải lớn hơn 0." });
    }
    if (SoKM <= 0) {
      return res.status(400).json({ message: "Số KM phải lớn hơn 0." });
    }

    // Increment counter and create new TramDung
    const counterTramdung = await CounterTramDung.findOneAndUpdate(
      { _id: "tramDungCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (!counterTramdung) {
      return res.status(500).json({ message: "Lỗi khi lấy bộ đếm." });
    }

    const MaTram = `TD${counterTramdung.seq}`;

    const newTramDung = new TramDung({
      MaTram,
      MaTuyen,
      DiaChi,
      SoKM,
      GiaTienVe,
      GiaTienVeTau,
    });

    await newTramDung.save();

    res.status(201).json({ newTramDung });
  } catch (e) {
    console.error("Lỗi khi tạo trạm dừng:", e.message);
    res
      .status(500)
      .json({ message: "Không thể tạo trạm dừng.", error: e.message });
  }
};

const GetTramDungID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching TramDung with id:", id);
    const tramDung = await TramDung.findById(id);
    console.log("Fetched TramDung:", tramDung);

    if (!tramDung) {
      return res.status(404).json({ message: "Trạm dừng không tồn tại" });
    }

    res.status(200).json(tramDung);
  } catch (e) {
    console.error("Server error:", e); // Log the error
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
const getTramDungByDiaChi = async (req, res) => {
  const { diaChi } = req.query;

  if (!diaChi) {
    return res.status(400).json({ message: "DiaChi is required" });
  }

  try {
    const tramDungs = await TramDung.find({
      DiaChi: { $regex: diaChi, $options: "i" },
    });
    if (!tramDungs.length) {
      return res
        .status(404)
        .json({ message: "No TramDung found with the given DiaChi" });
    }
    res.status(200).json({ tramDungs });
  } catch (error) {
    res.status(500).json({ message: "Error finding TramDung", error });
  }
};

module.exports = {
  GetTramDung,
  CreateTramDung,
  GetTramDungID,
  DeleteTramDung,
  getTramDungByDiaChi,
};
