const manage = require("./model/ManageRequest");
const upload = require("./model/UploadSummary");
const multer = require("multer");

const toGetJobRequestList = async (req, res) => {
  try {
    const data = await manage.getJobRequestList();
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toGetJobRequest = async (req, res) => {
  try {
    const data = await manage.getJobRequest(req.params);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toPostJobRequest = async (req, res) => {
  try {
    const data = await manage.postJobRequest(req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toUpdateJobRequest = async (req, res) => {
  try {
    const data = await manage.updateJobRequest(req.params, req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toDeleteJobRequest = async (req, res) => {
  try {
    const data = await manage.deleteJobRequest(req.params);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};

module.exports = {
  toGetJobRequestList,
  toGetJobRequest,
  toPostJobRequest,
  toUpdateJobRequest,
  toDeleteJobRequest,
};
