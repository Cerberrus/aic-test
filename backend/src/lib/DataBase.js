const mysql = require("mysql2");
const dotenv = require("dotenv")

class DataBase {            //Класс базы данных, от которой наследуются для взаимодействия с данными
    static #pool

    constructor() {
        try{
            if (!DataBase.#pool) {                  //Если пул не создан, создаем, иначе пропускаем
                console.log('Create connection')
                dotenv.config()
                DataBase.#createConnection()
            }
        }
        catch (e) {
            console.error(e)
        }
    }
    static async #createConnection() {              //Создает соединение с базой данных, посредством пула
        DataBase.#pool = mysql.createPool({
            connectionLimit: 5,
            host: process.env.DATABASE_HOST,
            database: process.env.DATABASE_NAME,
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
        });
    }

    get connection(){                               //Отдает соединение для запросов
        return DataBase.#pool.promise()
    }

    async implementPaths(fieldList, table) {        //Добавляет ссылки на файл
        for (let field of fieldList) {
            const [result] = await this.connection.execute(
                `select path from ${table} where id = ? order by path like '%.webp' desc`, [field.id])
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