const mysql = require("mysql2");
const dotenv = require("dotenv")

class DataBase {
    static #pool

    constructor() {
        try{
            if (!DataBase.#pool) {
                console.log('Create connection')
                dotenv.config()
                DataBase.#createConnection()
            }
        }
        catch (e) {
            console.error(e)
        }
    }
    static async #createConnection() {
        DataBase.#pool = mysql.createPool({
            connectionLimit: 5,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
        });
    }

    get connection(){
        return DataBase.#pool.promise()
    }

    async implementPaths(fieldList, table) {
        for (let field of fieldList) {
            const [result] = await this.connection.execute(
                `select path from ${table} where id = ? order by path`, [field.id])
            const pathsList = !!result ? result.map(value => value.path) : []
            const newPaths = []
            for (let paths of pathsList) {
                await newPaths.push(paths)
            }
            if (newPaths.length > 0) field.path = newPaths
        }
        return
    };
}

module.exports = DataBase