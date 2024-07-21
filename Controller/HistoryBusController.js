const LichSuDatXeBus = require("../Schema/schema.js").LichSuDatXeBus;

const GetLichSuXeBus = async (req, res) => {
  try {
    const lichSuDatXeBus = await LichSuDatXeBus.find({});
    res.status(200).json({ lichSuDatXeBus });
  } catch (e) {
    res.status(500).json("not get lich su dat xe o to");
  }
};
const DeleteLichSuXeBus = async (req, res) => {
  try {
    const { id } = req.params;
    await LichSuDatXeBus.findByIdAndDelete(id);
    res.status(200).json({ message: "LichSuDatXeBus deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete lich su dat xe o to");
  }
};

module.exports = {
  GetLichSuXeBus,
  DeleteLichSuXeBus,
};
