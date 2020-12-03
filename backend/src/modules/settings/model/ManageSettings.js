const connection = require("../../../lib/database/DataBase");

const getPublicInformationList = async () => {
  const [result] = await connection.execute(
   "select id, `_key` as `key`, `_value` as `value` from setting where private = 0"
  );
  return result;
};
const getSettingList = async () => {
  const [result] = await connection.execute(
   "select * from setting"
  );
  return result;
};
const getSetting = async ({ key }) => {
  const [result,] = await connection.execute(
   "select `_value` as `value` from setting where _key=?",
   [key,]
  );
  return result[0].value;
};
const postSetting = async ({ key, value }) => {
  try {
    await connection.execute(
      "insert into setting(_key, _value) values(?,?) on duplicate key update _value =?",
      [key, value, value]
    );
  } catch (e) {
    console.log(e);
  }
};
const deleteSetting = async ({ key }) => {
  await connection.execute(
   "delete from setting where key=?)",
   [key]
  );
  return getSettingList();
};
module.exports = {
  getPublicInformationList,
  getSettingList,
  getSetting,
  postSetting,
  deleteSetting,
};