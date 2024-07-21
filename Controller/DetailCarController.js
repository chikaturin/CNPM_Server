const ChiTietXeOto = require("../Schema/schema.js").ChiTietXeOto;

const GetChiTietXeOto = async (req, res) => {
  try {
    const chiTietXeOto = await ChiTietXeOto.find({});
    res.status(200).json({ chiTietXeOto });
  } catch (e) {
    res.status(500).json("not get chi tiet xe o to");
  }
};
const CreateChiTietXeOto = async (req, res) => {
  try {
    const CreateChiTietXeOto = new ChiTietXeOto(req.body);
    await CreateChiTietXeOto.save();
    res.status(200).json({ CreateChiTietXeOto });
  } catch (e) {
    res.status(500).json("not create chi tiet xe o to");
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
