const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

let instance = null

class DataBase {
    constructor() {
        if (instance) {
            return instance
        }

        this.connection = mysql.createConnection({
            host     :process.env.DATABASE_HOST,
            database :process.env.DATABASE_NAME,
            user     :process.env.DATABASE_USER,
            password :process.env.DATABASE_PASSWORD})
        console.log("Database connected!")
        instance = this
        return instance;
    }

    getConnection =()=>{
        return this.connection.promise()
    }
}

module.exports = new DataBase().getConnection()