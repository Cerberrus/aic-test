const DataBase = require('../../lib/DataBase')

class FileDataBase extends DataBase{
    async post(id, path, table){
        await this.connection.query(`insert into ${table}(id, path) values(?,?)`, [id, path])
    }
    async get(id,table){
        const result = await this.connection.query(`select path from ${table} where id=?`, [id])
        return result[0]
    }
    async delete(id, table){
        await this.connection.execute(`delete from ${table} where id =?`, [id])
    }
}
module.exports = new FileDataBase()