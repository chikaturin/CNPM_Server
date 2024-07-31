const LichSuDatXeBus = require("../Schema/schema.js").LichSuDatXeBus;

const GetLichSuXeBus = async (req, res) => {
  try {
    const lichSuDatXeBus = await LichSuDatXeBus.find({});
    res.status(200).json({ lichSuDatXeBus });
  } catch (e) {
    res.status(500).json("not get lich su dat xe o to");
  }
};
const CreateLichSuBus = async (req, res) => {
  try {
    const { MaKH, MaDX } = req.body;
    if (!MaKH || !MaDX) {
      return res.status(400).json({ message: "MaKH and MaDX are required" });
    }
    const newHistory = new LichSuDatXeBus({ MaKH, MaDX });
    await newHistory.save();
    res.status(200).json({ newHistory });
  } catch (error) {
    res.status(500).json({ message: "Error creating history", error });
  }
};

const DeleteLichSuXeBus = async (req, res) => {
  try {
    const { MaDX } = req.params;
    await LichSuDatXeBus.findOneAndDelete(MaDX);
    res.status(200).json({ message: "LichSuDatXeBus deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete lich su dat xe o to");
  }
};

module.exports = {
  GetLichSuXeBus,
  CreateLichSuBus,
  DeleteLichSuXeBus,
};
