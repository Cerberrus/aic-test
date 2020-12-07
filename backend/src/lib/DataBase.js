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
            console.log(e)
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
                `select path from ${table} where id = ?`, [field.id])
            const pathsList = !!result ? result.map(value => value.path) : []
            const newPaths = []
            for (let paths of pathsList) {
                await newPaths.push(paths)
            }
            if (newPaths.length > 0) field.path = newPaths
        }
        return
    };

    // postDataIntoDatabase = async (table, fields, values) => {
    //     try {
    //         if (fields.length === values.length) {
    //             const fieldsQuest = fields.map(() => '?').join(',')
    //             fields = fields.join(',')
    //             const query = `insert into ${table}(${fields}) values(${fieldsQuest})`
    //             await this.connection.execute(query, values)
    //             return true
    //         } else return false
    //     } catch (e) {
    //         console.log(e)
    //         return false
    //     }
    // }
    // getDataFromDatabase = async (table,  param = {
    //     renameFields: [],
    //     fields: false,
    //     condition: [
    //         {
    //             table: false,
    //             field: '',
    //             value: false,
    //             union: false
    //         }
    //     ],
    //     join: [{
    //         table: false,
    //         fieldPrimary: '',
    //         fieldForeign: '',
    //         showTable: [],
    //         renameFields: []
    //     }]
    // }) => {
    //     let {fields, renameFields, condition, join} = param
    //
    //     //fields = fields ? fields.forEach((value, index) => table + '.' + value) : table + '.' + '*'
    //     fields = fields
    //         ? fields.map((value, index) => {
    //             if(!!renameFields && !!renameFields[index]){
    //                 return (`${table}.${value} as ${renameFields[index]}`)
    //             }
    //             else{
    //                 return (`${table}.${value}`)
    //             }
    //         })
    //         : table + '.' + '*'
    //
    //     let joinField = []
    //
    //
    //     condition = condition
    //         ? condition
    //             .filter(con => {
    //                 con.table = con.table ? con.table : table
    //                 return !!(con.field) && !!(con.value)
    //             })
    //             .map((value, index) => {
    //                 return index > 0
    //                     ? ` ${value.union ? value.union : ' or '} ${value.table}.${value.field} ${value.value} `
    //                     : ` where ${value.table}.${value.field} ${value.value} `
    //             }).join('')
    //         : ''
    //
    //     join = join
    //         ? join.filter(j => j.table)
    //             .map((j, index) => {
    //                 if (Array(j.showTable).length > 0 && j.showTable)
    //                     j.showTable.forEach((t, index) => {
    //                         if(!!j.renameFields && !!j.renameFields[index]){
    //                             joinField.push(`, ${j.table}.${t} as ${j.renameFields[index]}`)
    //                         }
    //                         else{
    //                             joinField.push(`, ${j.table}.${t}`)
    //                         }
    //                     })
    //                 const key = !!j.fieldPrimary && !!j.fieldForeign
    //                     ? `on ${table}.${j.fieldPrimary} = ${j.table}.${j.fieldForeign}`
    //                     : ''
    //                 return ` join ${j.table} as ${j.table} ${key}`
    //             })
    //         : ''
    //
    //     joinField = joinField.join('')
    //
    //     const query = `select ${fields} ${joinField} from ${table} as ${table} ${join} ${condition}`
    //     console.log(query)
    //
    // }
}

// new DataBase().getDataFromDatabase('slider', {
//     fields: ['image_description', 'id'],
//     renameFields:['imageDescription'],
//     condition: [
//         {
//             field: 'id',
//             value: '> 45'
//         },
//         {
//             union: 'and',
//             field: 'id',
//             value: '< 50'
//         },
//         {
//             union: 'or',
//             field: 'id',
//             value: '= 55'
//         }
//     ],
//     join: [
//         {
//             table: 'file',
//             fieldPrimary: 'image_hash',
//             fieldForeign: 'hash',
//             showTable: ['paths', 'hash'],
//             renameFields: ['pathes', 'hashes']
//         }
//     ]
// })


module.exports = DataBase