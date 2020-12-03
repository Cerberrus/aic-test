const manageCoordinate = require("./model/ManageCoordinate");

const toGetCoordinateList = async (req, res) => {
  try {
    const data = await manageCoordinate.getCoordinateList();
    res
     .status(200)
     .json(data);
  } catch (e) {
    res
     .status(404)
     .send();
  }
};
const toPostCoordinate = async (req, res) => {
  try {
    const data = await manageCoordinate.postCoordinate(req.query);
    res
     .status(200)
     .json(data);
  } catch (e) {
    res
     .status(404)
     .send();
  }
};
const toDeleteCoordinate = async (req, res) => {
  try {
    const data = await manageCoordinate.deleteCoordinate(req.params);
    res
     .status(200)
     .json(data);
  } catch (e) {
    res
     .status(404)
     .send();
  }
};

module.exports = {
  toGetCoordinateList,
  toPostCoordinate,
  toDeleteCoordinate,
};