const fs = require("fs/promises");

class ManageFiles {
  deleteFile = (path) => {
    try {
      fs.unlink(path);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}
module.exports = ManageFiles