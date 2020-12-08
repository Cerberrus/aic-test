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
            console.log(e)
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
            return vacancy[0];
        }
        catch (e) {
            console.log(e)
        }
    };
}


module.exports = new VacancyDataBase()