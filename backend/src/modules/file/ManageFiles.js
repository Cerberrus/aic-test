const fs = require("fs");
class ManageFiles {
  deleteFile = (filePath) => {
    try {
      const exist = fs.existsSync(filePath)
      if(exist){
        fs.unlinkSync(filePath);
      }
      return true
    } catch (e) {
      console.error(e);
      return false;
    }
  };
}
module.exports = ManageFiles