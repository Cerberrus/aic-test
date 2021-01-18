const fs = require("fs");
class ManageFiles {
  async deleteFile(filePath){                     //Принимает путь файла и удаляет его
    try {
      await fs.stat(filePath, (error, stat)=>{
        if(error){
          console.log('no file for delete')
          return false
        }
        else{
          console.log('Deleting')
          fs.unlinkSync(filePath)
          return true
        }
      })
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
module.exports = ManageFiles