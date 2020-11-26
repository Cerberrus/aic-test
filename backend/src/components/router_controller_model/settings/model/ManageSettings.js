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
    const [result] = await connection.execute('select value from setting where key=?', [key])
    return {key:result.value}
}
const postSetting=async ({key, value})=>{
    await connection.execute('insert into setting(key, value)', [key, value])
    return getSettingList()
}
const updateSetting=async ({key}, {value})=>{
    await connection.execute('update setting set value=? where key =?', [value, key])
    return getSettingList()
}
const deleteSetting=async ({key})=>{
    await connection.execute('delete from setting where key=?)', [key])
    return getSettingList()
}
module.exports = {getPublicInformationList,getSettingList, getSetting, postSetting, updateSetting, deleteSetting}