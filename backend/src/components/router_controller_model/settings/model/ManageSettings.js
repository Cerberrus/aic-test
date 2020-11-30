const connection = require('../../../database/DataBase')

const getPublicInformationList=async ()=>{
    const [result] = await connection.execute('select * from setting where private = 0')
    return {informationList:result}
}
const getSettingList=async ()=>{
    const [result] = await connection.execute('select * from setting')
    return {settingList:result}
}
const getSetting=async ({key})=>{
    const [result] = await connection.execute('select _value from setting where _key=?', [key])
    return result[0]._value
}
const postSetting=async ({key, value})=>{
    try{
        await connection.execute('insert into setting(_key, _value) values(?,?) on duplicate key update _value =?', [key, value, value])
    }
    catch (e) {
        console.log(e)
    }
}
const deleteSetting=async ({key})=>{
    await connection.execute('delete from setting where key=?)', [key])
    return getSettingList()
}
module.exports = {getPublicInformationList,getSettingList, getSetting, postSetting, deleteSetting}