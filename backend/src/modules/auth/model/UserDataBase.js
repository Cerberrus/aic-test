const DataBase = require('../../../lib/DataBase')

class UserDataBase extends DataBase{
  async get(username){
    try{
      const [user] = await this.connection.execute(
          "select `name`, username, password from admin where username = ?",
          [username]
      );
      return !!user[0] ? user[0] : false
    }
    catch (e) {
      console.error(e)
    }
  }

  async post(name, username, password){
    try{
      await this.connection.execute(
          "insert into Admin(`name`, username, password) values(?,?,?)",
          [name, username, password]
      );
      return true
    }
    catch (e) {
      console.error(e)
    }
  }
}

module.exports = new UserDataBase()