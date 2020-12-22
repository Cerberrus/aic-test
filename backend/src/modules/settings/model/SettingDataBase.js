const DataBase = require("../../../lib/DataBase");

class SettingDatabase extends DataBase{
  async getPublicInformationList(){
    const [result] = await this.connection.execute(
        "select `_key`, `_value` from setting where private = 0"
    );
    const response = {}
    for(let object of result){
      response[[object._key]] = object._value
    }
    return response;
  };
  async getSettingList(){
    const [result] = await this.connection.execute(
        "select * from setting where private = 0 or private = 1"
    );
    const response = {}
    for(let object of result){
      response[[object._key]] = object._value
    }

    return response
  };
  async getSetting({ key }){
    const [result,] = await this.connection.execute(
        "select `_value` as `value` from setting where _key=?",
        [key,]
    );
    return result[0].value;
  };
  async postSetting({ key, value}){
    try {
      await this.connection.execute(
          "insert into setting(_key, _value) values(?,?) on duplicate key update _value =?",
          [key, value, value]
      );
    } catch (e) {
      console.error(e);
    }
  };
  async deleteSetting({ key }){
    await this.connection.execute(
        "delete from setting where key=?)",
        [key]
    );
    return this.getSettingList()
  };
}
module.exports = new SettingDatabase()