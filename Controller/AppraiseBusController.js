const AppraiseBus = require("../Schema/schema").AppraiseBus;

const GetAppraiseBus = async (req, res) => {
  try {
    const appraiseBus = await AppraiseBus.find({});
    res.status(200).json({ appraiseBus });
  } catch (e) {
    res.status(500).json("not get appraise car");
  }
};

const CreateAppraiseBus = async (req, res) => {
  try {
    const { MaBus, MaCus, SoSao, NoiDung } = req.body;
    if (!MaBus || !MaCus || !SoSao || !NoiDung) {
      return res.status(400).json("Thiếu thông tin");
    }
    const appraiseBus = new AppraiseBus({
      MaBus,
      MaCus,
      SoSao,
      NoiDung,
    });
    await appraiseBus.save();
    res.status(200).json({ appraiseBus });
  } catch (e) {
    res.status(500).json("not create appraise car");
  }
};

const DeleteAppraiseBus = async (req, res) => {
  try {
    const { MaXe } = req.body;
    if (!MaXe) {
      return res.status(400).json("Thiếu thông tin");
    }
    await AppraiseBus.deleteOne({ MaXe });
    res.status(200).json("delete appraise car success");
  } catch (e) {
    res.status(500).json("not delete appraise car");
  }
};

module.exports = { GetAppraiseBus, CreateAppraiseBus, DeleteAppraiseBus };
