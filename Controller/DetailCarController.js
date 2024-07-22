const ChiTietXeOto = require("../Schema/schema.js").ChiTietXeOto;

const GetChiTietXeOto = async (req, res) => {
  try {
    const chiTietXeOto = await ChiTietXeOto.find({});
    res.status(200).json({ chiTietXeOto });
  } catch (e) {
    res.status(500).json("not get chi tiet xe o to");
  }
};

let new_value_detailCar = 1;
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

    const MaDetailCar = `DC${new_value_detailCar}`;
    new_value_detailCar += 1;

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
    res.status(200).json({ createChiTietXeOto });
  } catch (e) {
    console.error("Error creating ChiTietXeOto:", e);
    res
      .status(500)
      .json({ message: "Not able to create ChiTietXeOto", error: e.message });
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
const DeleteChiTietXeOto = async (req, res) => {
  try {
    const { id } = req.params;
    await ChiTietXeOto.findByIdAndDelete(id);
    res.status(200).json({ message: "ChiTietXeOto deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete chi tiet xe o to");
  }
};

module.exports = {
  GetChiTietXeOto,
  CreateChiTietXeOto,
  UpdateChiTietXeOto,
  DeleteChiTietXeOto,
};
