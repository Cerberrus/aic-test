checkExist =(object, fields)=>{
    for(let field of fields){
        if(field in object){}
        else return false
    }
    return true
}
module.exports = {checkExist}