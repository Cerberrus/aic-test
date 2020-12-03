const manageFiles = require("../../../lib/image/ManageFiles");
module.exports = implementPathList = async (data) => {
  for (let key of data) {
    const imageList = await manageFiles.getFilesPaths(
      key.title + ".",
      key.imagePath,
      "/static/images/slider/"
    );
    key.imagePath = imageList[0];
  }
  return data;
};