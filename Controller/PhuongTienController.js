const PhuongTien = require("../Schema/schema.js").PhuongTien;

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
    const createPhuongTien = await PhuongTien.create(req.body);
    res.status(200).json({ createPhuongTien });
  } catch (e) {
    console.error(e); // Log the error for debugging
    res.status(500).json("not create phuong tien");
  }
};

const UpdatePhuongTien = async (req, res) => {
  try {
    const { id } = req.params;
    await PhuongTien.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "PhuongTien updated successfully" });
  } catch (e) {
    res.status(500).json("not update phuong tien");
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

module.exports = {
  GetPhuongTien,
  CreatePhuongTien,
  UpdatePhuongTien,
  DeletePhuongTien,
};
