const LichSuDatTau = require("../Schema/schema.js").LichSuDatTau;

const GetLichSuDatTau = async (req, res) => {
  try {
    const lichSuDatTau = await LichSuDatTau.find({});
    res.status(200).json({ lichSuDatTau });
  } catch (e) {
    res.status(500).json("not get lich su dat xe o to");
  }
};
const DeleteLichSuDatTau = async (req, res) => {
  try {
    const { id } = req.params;
    await LichSuDatTau.findByIdAndDelete(id);
    res.status(200).json({ message: "LichSuDatTau deleted successfully" });
  } catch (e) {
    res.status(500).json("not delete lich su dat xe o to");
  }
};

module.exports = {
  GetLichSuDatTau,
  DeleteLichSuDatTau,
};
