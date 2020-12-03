const manageFiles = require("../../../lib/image/ManageFiles");
module.exports = implementPathList = async (data) => {
  for (let key of data) {
    if (key.image_path)
      key.image_path = await manageFiles.getFilesPaths(
        key.name + ".",
        key.image_path,
        "/static/images/job-vacancy/"
      );
    else continue;
  }
  return data;
};
