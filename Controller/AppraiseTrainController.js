const AppraiseTrain = require("../Schema/schema").AppraiseTrain;

const GetAppraiseTrain = async (req, res) => {
  try {
    const appraiseTrain = await AppraiseTrain.find({});
    res.status(200).json({ appraiseTrain });
  } catch (e) {
    res.status(500).json("not get appraise car");
  }
};

const CreateAppraiseTrain = async (req, res) => {
  try {
    const { MaXe, MaKH, Rating, Comment } = req.body;
    if (!MaXe || !MaKH || !Rating || !Comment) {
      return res.status(400).json("Thiếu thông tin");
    }
    const appraiseTrain = new AppraiseTrain({
      MaXe,
      MaKH,
      Rating,
      Comment,
    });
    await appraiseTrain.save();
    res.status(200).json({ appraiseTrain });
  } catch (e) {
    res.status(500).json("not create appraise car");
  }
};

const DeleteAppraiseTrain = async (req, res) => {
  try {
    const { MaXe } = req.body;
    if (!MaXe) {
      return res.status(400).json("Thiếu thông tin");
    }
    await AppraiseTrain.deleteOne({ MaXe });
    res.status(200).json("delete appraise car success");
  } catch (e) {
    res.status(500).json("not delete appraise car");
  }
};

module.exports = { GetAppraiseTrain, CreateAppraiseTrain, DeleteAppraiseTrain };
