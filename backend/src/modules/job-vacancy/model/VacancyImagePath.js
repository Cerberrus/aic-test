const manageFiles = require("../../../lib/image/ManageFiles");
module.exports = implementPathList = async (data) => {
  for (let key of data) {
    const sliderImage = await manageFiles.getFilesPaths(
        key.name + ".",
        key.image_path,
        "/static/images/job-vacancy/"
    );
    key.image_path = sliderImage[0]
    return data;
  };
};
