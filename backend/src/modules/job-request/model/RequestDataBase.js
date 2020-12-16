const DataBase = require('../../../lib/DataBase')

class RequestDataBase extends DataBase {
    async getList({orderBy, desc}={orderBy:'id', desc:true}) {
        const [result] = await this.connection.execute(
            "select" +
            " R.id,R.`name`, R.date, R.happy_date, R.phone_number, R.sex, R.email, R.resume_text as resumeText, RS.status, RS.id as statusId, V.title as vacancy from summary as R" +
            " join summary_status as RS" +
            " join vacancy as V on R.vacancy_id = V.id and R.status_id = RS.id" +
            ` order by R.${orderBy} ${desc?'DESC':''}`)
        await super.implementPaths(result, 'summary_file')
        const statusList = await this.getStatusList()
        return {statusList, summaryList:result};
    };

    async get(id) {
        id = Number(id);
        const [result,] = await this.connection.execute("select id from summary where id=?", [id]);
        return result;
    };

    async updateSummaryStatus(id) {
        id = Number(id);
        const [result,] = await this.connection.execute("select id from summary where id=?", [id]);
        return result;
    };

    async post(
        {jobVacancyId, name, happyDate, phoneNumber, sex, email, resumeText}
        ) {
        jobVacancyId = Number(jobVacancyId);
        const result = await this.connection.execute(
            "insert into summary(vacancy_id, `name`, happy_date, phone_number, sex, email, resume_text) values(?,?,?,?,?,?,?)",
            [
                jobVacancyId, name, happyDate, phoneNumber, sex, email, resumeText
            ]
        );
        return result[0].insertId
    };


    async delete({id}) {
        id = Number(id);
        const result = await this.get(id)
        await this.implementPaths(result, 'summary_file')
        await this.connection.execute("delete from summary where id=?", [id]);
        return result[0]
    };

    // async updateSummaryStatus({ id }, { name }){
    //     await this.connection.execute(
    //         "update summary_status set name=? where id =?", [
    //             name,
    //             id,
    //         ]);
    //     return this.getStatusList();
    // };
    async getStatusList(){
        const [result] = await this.connection.execute(
            "select * from summary_status"
        );
        return result;
    };
    async postStatus({ name }){
        await this.connection.execute(
            "insert into summary_status(status) values(?)", [
                name,
            ]);
        return this.getStatusList();
    };
    async deleteStatus({ id }){
        await this.connection.execute(
            "delete from summary_status where id=?)",
            [id]
        );
        return this.getStatusList();
    };
}

module.exports = new RequestDataBase()
