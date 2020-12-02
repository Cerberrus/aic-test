const fs = require('fs/promises')

const deleteFile = async (path) => {
    try{
        fs.unlink(path)
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}
const deleteFileList = async (paths) => {
    try{
        for(let path of paths){
            fs.unlink(path)
        }
        return true
    }
    catch (e) {
        console.log(e)
        return false
    }
}
const getFilesPaths = async (filename, path, outputPath = false) => {
    try{
        const filePathList = await fs.readdir(path)
        const name = String(filename).toLowerCase()
        let responsePaths = []
        for (let filePath of filePathList) {
            if (filePath.indexOf(name) !== -1) {
                if (outputPath) responsePaths.push(outputPath + filePath)
                else responsePaths.push(path + '/' + filePath)
            }
        }
        return responsePaths
    }
    catch (e) {
        
    }
}
module.exports = {deleteFile,deleteFileList,getFilesPaths}