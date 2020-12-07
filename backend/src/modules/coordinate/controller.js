const coordinateDataBase = require("./model/CoordinateDataBase");

const toGetCoordinateList = async (req, res) => {
  try {
    const data = await coordinateDataBase.get();
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toPostCoordinate = async (req, res) => {
  try {
    const data = await coordinateDataBase.post(req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toDeleteCoordinate = async (req, res) => {
  try {
    const data = await coordinateDataBase.delete(req.params);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};

const toGetCoordinateTypeList = async (req, res) => {
  try {
    const data = await coordinateDataBase.getType();
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toPostCoordinateType = async (req, res) => {
  try {
    const data = await coordinateDataBase.postType(req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toDeleteCoordinateType = async (req, res) => {
  try {
    const data = await coordinateDataBase.deleteType(req.params);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};

module.exports = {
  toGetCoordinateList,
  toPostCoordinate,
  toDeleteCoordinate,
  toGetCoordinateTypeList,
  toPostCoordinateType,
  toDeleteCoordinateType,
};