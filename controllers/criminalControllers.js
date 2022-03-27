const { Criminal } = require("../models/criminals");

getCriminals = async (req, res) => {
  console.log(req.headers);
  try {
    const criminals = await Criminal.find({});
    if (criminals.length != 0)
      res.status(200).json({ success: true, data: criminals });
    else res.json({ success: false, msg: "no criminal" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

addCriminal = async (req, res) => {
  const props = Object.keys(Criminal.schema.obj);
  try {
    if (props.length === Object.keys(req.body).length) {
      const criminal = await Criminal.create(req.body);
      res.status(200).json({ sucess: true, data: criminal });
    } else {
      const empty = props.filter((prop) => !req.body.hasOwnProperty(prop));
      res.status(400).json({ success: false, msg: empty });
    }
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

getCriminalByID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const criminal = await Criminal.findById(id);
    if (criminal) res.status(200).json({ sucess: true, data: criminal });
    else
      res
        .status(400)
        .json({ sucess: false, msg: "no entry match criminal ID" });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: error });
  }
};

updateCriminalID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const update_criminal = await Criminal.findByIdAndUpdate(id, req.body);
    if (!update_criminal) {
      const err = new Error();
      err.message = "No criminal updated";
      throw err;
    }
    res.status(200).json({ sucess: true, data: id });
  } catch ({ message }) {
    res.status(500).json({ success: false, message });
  }
};

deleteCrimalByID = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const delete_criminal = await Criminal.findByIdAndDelete(id);
    if (!delete_criminal) return;
    res.status(200).json({ sucess: true, data: id });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
};

getCriminalCrime = async (req, res) => {
  const { id } = req.params;
  const criminal = await Criminal.findById(id).populate("crime");
  res.json({ mode: "texting", data: criminal.crime });
};
module.exports = {
  getCriminals,
  addCriminal,
  getCriminalByID,
  updateCriminalID,
  deleteCrimalByID,
  getCriminalCrime,
};
