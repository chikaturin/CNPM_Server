const LichSuDatXeOto = require("../Schema/schema.js").LichSuDatXeOto;

const GetLichSuDatXeOto = async (req, res) => {
  try {
    const lichSuDatXeOto = await LichSuDatXeOto.find({});
    res.status(200).json({ lichSuDatXeOto });
  } catch (e) {
    res.status(500).json("not get lich su dat xe o to");
  }
};
const DeleteLichSuDatXeOto = async (req, res) => {
  try {
    const { id } = req.params;
    await LichSuDatXeOto.findByIdAndDelete(id);
    res.status(200).json({ message: "LichSuDatXeOto deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete lich su dat xe o to");
  }
};

module.exports = {
  GetLichSuDatXeOto,
  DeleteLichSuDatXeOto,
};
