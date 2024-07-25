const ChiTietXeOto = require("../Schema/schema.js").ChiTietXeOto;
const CounterChitietxe = require("../Schema/schema").CounterChitietxe;

const GetChiTietXeOto = async (req, res) => {
  try {
    const chiTietXeOto = await ChiTietXeOto.find({});
    res.status(200).json({ chiTietXeOto });
  } catch (e) {
    console.error("Error fetching ChiTietXeOto:", e);
    res.status(500).json({ message: "Unable to get ChiTietXeOto" });
  }
};

const CreateChiTietXeOto = async (req, res) => {
  try {
    const {
      TenHangXe,
      TenChuSoHuu,
      SoHanhLyToiDa,
      BienSoXe,
      CongTy,
      SDT_TaiXe,
      SoGheToiDa,
      SoTien_1km,
      Image,
      MaSB,
    } = req.body;

    // Basic validation
    if (
      !TenHangXe ||
      !TenChuSoHuu ||
      !SoHanhLyToiDa ||
      !BienSoXe ||
      !CongTy ||
      !SDT_TaiXe ||
      !SoGheToiDa ||
      !SoTien_1km ||
      !Image ||
      !MaSB
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const counterChiTietXe = await CounterChitietxe.findOneAndUpdate(
      { _id: "ChiTietXeCounter" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    if (!counterChiTietXe) {
      return res.status(500).json({ message: "Error fetching counter." });
    }

    const MaDetailCar = `DTC${counterChiTietXe.seq}`;

    const createChiTietXeOto = new ChiTietXeOto({
      MaDetailCar,
      TenHangXe,
      TenChuSoHuu,
      SoHanhLyToiDa,
      BienSoXe,
      CongTy,
      SDT_TaiXe,
      SoGheToiDa,
      SoTien_1km,
      Image,
      MaSB,
    });

    await createChiTietXeOto.save();
    res.status(201).json({ createChiTietXeOto });
  } catch (e) {
    console.error("Error creating ChiTietXeOto:", e);
    res
      .status(500)
      .json({ message: "Unable to create ChiTietXeOto", error: e.message });
  }
};

const UpdateChiTietXeOto = async (req, res) => {
  try {
    const { id } = req.params;
    await ChiTietXeOto.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "ChiTietXeOto updated successfully" });
  } catch (e) {
    res.status(500).json("not update chi tiet xe o to");
  }
};

const GetChiTietXeOtoID = async (req, res) => {
  try {
    /../;
    const { id } = req.params;
    const chiTietXeOto = await ChiTietXeOto.findById(id);

    if (!chiTietXeOto) {
      return res.status(404).json({ message: "ChiTietXeOto not found" });
    }

    res.status(200).json(chiTietXeOto);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

const DeleteChiTietXeOto = async (req, res) => {
  try {
    const { id } = req.params;
    await ChiTietXeOto.findByIdAndDelete(id);
    res.status(200).json({ message: "ChiTietXeOto deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete chi tiet xe o to");
  }
};

const FinDetailCarID = async (req, res) => {
  const { MaSB } = req.query;

  if (!MaSB) {
    return res.status(400).json({ message: "MaSB is required" });
  }

  try {
    const detailCars = await ChiTietXeOto.find({
      MaSB: { $regex: MaSB, $options: "i" },
    });

    if (!detailCars.length) {
      return res
        .status(404)
        .json({ message: "No cars found with the given MaSB" });
    }

    res.status(200).json({ detailCars });
  } catch (error) {
    res.status(500).json({ message: "Error finding cars", error });
  }
};

module.exports = {
  GetChiTietXeOto,
  GetChiTietXeOtoID,
  CreateChiTietXeOto,
  UpdateChiTietXeOto,
  DeleteChiTietXeOto,
  FinDetailCarID,
};
