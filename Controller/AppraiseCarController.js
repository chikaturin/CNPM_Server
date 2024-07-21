const AppraiseCar = require("../Schema/schema").AppraiseCar;

const GetAppraiseCar = async (req, res) => {
  try {
    const appraiseCar = await AppraiseCar.find({});
    res.status(200).json({ appraiseCar });
  } catch (e) {
    res.status(500).json("not get appraise car");
  }
};

const CreateAppraiseCar = async (req, res) => {
  try {
    const { MaXe, MaKH, Rating, Comment } = req.body;
    if (!MaXe || !MaKH || !Rating || !Comment) {
      return res.status(400).json("Thiếu thông tin");
    }
    const appraiseCar = new AppraiseCar({
      MaXe,
      MaKH,
      Rating,
      Comment,
    });
    await appraiseCar.save();
    res.status(200).json({ appraiseCar });
  } catch (e) {
    res.status(500).json("not create appraise car");
  }
};

const DeleteAppraiseCar = async (req, res) => {
  try {
    const { MaXe } = req.body;
    if (!MaXe) {
      return res.status(400).json("Thiếu thông tin");
    }
    await AppraiseCar.deleteOne({ MaXe });
    res.status(200).json("delete appraise car success");
  } catch (e) {
    res.status(500).json("not delete appraise car");
  }
};

module.exports = { GetAppraiseCar, CreateAppraiseCar, DeleteAppraiseCar };
