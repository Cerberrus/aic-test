const connection = require('../../../../database/DataBase')

const getJobRequestList=async ()=>{
    const [result] = await connection.execute('select * from job_request')
    return {requestList:result}
}
const getJobRequest=async ({id})=>{
    const [result] = await connection.execute('select * from job_request where id=?', [id])
    return {request:result}
}
const postJobRequest=async ({jobVacancyId, name, happyDate, phoneNumber, sex, email, resumeText, resumeFilePath})=>{
    await connection.execute('insert into job_request(job_vacancy_id, name, happy_date, phone_number, sex, email, resume_text, resume_file_path) values(?,?,?,?,?,?,?,?)',
        [jobVacancyId, name, happyDate, phoneNumber, sex, email, resumeText, resumeFilePath])
    return getJobRequestList()
}
const updateJobRequest=async ({id}, {jobVacancyId, name, happyDate, phoneNumber, sex, email, resumeText, resumeFilePath})=>{
    await connection.execute('update job_request set job_vacancy_id=?, name=?, happy_date=?, phone_number=?, sex=?, email=?, resume_text=?, resume_file_path=? where id =?',
        [jobVacancyId, name, happyDate, phoneNumber, sex, email, resumeText, resumeFilePath,id])
    return getJobRequestList()
}
const deleteJobRequest=async ({id})=>{
    await connection.execute('delete from job_request where id=?)', [id])
    return getJobRequestList()
}
module.exports = {getJobRequestList, getJobRequest, postJobRequest, updateJobRequest, deleteJobRequest}