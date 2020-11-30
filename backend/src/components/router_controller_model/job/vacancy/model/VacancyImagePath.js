const manageFiles = require('../../../../image/ManageFiles')
module.exports = implementPathList=async (data)=>{
    for(let key of data){
        key.image_path = await manageFiles.getFilesPaths(key.name+'.', key.image_path, '/static/images/vacancy')
    }
    return data
}