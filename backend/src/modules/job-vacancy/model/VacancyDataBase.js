const DataBase = require('../../../lib/DataBase')

class VacancyDataBase extends DataBase {
    async getJobVacancyList() {
        const [result] = await this.connection.execute(
            "select id, title, image_description as imageDescription, description from vacancy"
        );
        await super.implementPaths(result, 'vacancy_file')
        return result;
    };

    async getJobVacancy(id) {
        id = Number(id);
        const [result] = await this.connection.execute(
            "select id, title, image_description as imageDescription, description from vacancy  where id =?",
            [id]
        );
        await super.implementPaths(result, 'vacancy_file')
        return result;
    };

    async postJobVacancy({title, description, imageDescription}) {
        try{
            const result = await this.connection.execute(
                "insert into vacancy(title,description, image_description) values(?,?,?)",
                [title, description, imageDescription]
            );
            return result[0].insertId;
        }
        catch (e) {
            console.error(e)
        }
    };

    async updateJobVacancy({id},{title, description, imageDescription}) {
        try{
            await this.connection.execute(
                "update vacancy set title=?,description=?, image_description=? where id = ?",
                [title, description, imageDescription, id]
            );
            return id;
        }
        catch (e) {
            console.error(e)
        }
    };

    async deleteJobVacancy({id}) {
        try{
            id = Number(id);
            const vacancy = await this.getJobVacancy(id);
            await super.implementPaths(vacancy, 'vacancy_file')
            await this.connection.execute(
                "delete from vacancy where id=?",
                [id]
            );
            return vacancy[0] || false;
        }
        catch (e) {
            console.error(e)
        }
    };
}


module.exports = new VacancyDataBase()