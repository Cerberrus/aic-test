const instagram = require("./model/Instagram");

const toGetInstagramPhotoList = async (req, res) => {
  try {
    const data = await instagram.getPhotos();
    res.status(200).send(data);
  } catch (e) {
    res.status(404).send();
  }
};
const toUpdateUserInformation = async (req, res) => {
  try {
    const data = await instagram.updateUserInformation(req.body);
    res.status(200).send(data);
  } catch (e) {
    res.status(404).send();
  }
};

module.exports = { toGetInstagramPhotoList, toUpdateUserInformation };