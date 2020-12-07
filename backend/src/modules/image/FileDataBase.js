const DataBase = require('../../lib/DataBase')

class FileDataBase extends DataBase{
    async post(id, path, table){
        await this.connection.query(`insert into ${table}(id, path) values(?,?)`, [id, path])
    }
    async delete(hash){
        await this.connection.execute('delete from file where hash =?', [hash])
    }
}
module.exports = new FileDataBase()