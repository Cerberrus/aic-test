const DataBase = require("../../../lib/DataBase");

class SettingDatabase extends DataBase{
  async getPublicInformationList(){
    const [result] = await this.connection.execute(
        "select id, `_key` as `key`, `_value` as `value` from setting where private = 0"
    );
    return result;
  };
  async getSettingList(){
    const [result] = await this.connection.execute(
        "select * from setting"
    );
    return result;
  };
  async getSetting({ key }){
    const [result,] = await this.connection.execute(
        "select `_value` as `value` from setting where _key=?",
        [key,]
    );
    return result[0].value;
  };
  async postSetting({ key, value }){
    try {
      await this.connection.execute(
          "insert into setting(_key, _value) values(?,?) on duplicate key update _value =?",
          [key, value, value]
      );
    } catch (e) {
      console.log(e);
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