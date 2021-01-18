const fs = require("fs");
class ManageFiles {
  async checkExistFileList(baseFileDirectory, object){
    for (let element of object) {
      if (["path"] in element) {
        const exist = await element.path.filter(async path => await this.checkExistPath(baseFileDirectory+path))
        if (exist.length > 0) {
          element.path = exist.map(path => ('https://aic.xutd.tk' + path))
        } else {
          element.path = null
        }
      }
    }
    return object
  }
  async checkExistPath(filePath){
    await fs.stat(filePath, (error, stat)=>{
      return !error;})
  }
  async deleteFile(filePath){                     //Принимает путь файла и удаляет его
    try {
      await fs.stat(filePath, (error, stat)=>{
        if(error){
          console.log('no file for deletez')
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