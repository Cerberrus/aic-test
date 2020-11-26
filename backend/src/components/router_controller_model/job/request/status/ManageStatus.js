const connection = require('../../../../database/DataBase')

const getJobRequestStatusList=async ()=>{
    const [result] = await connection.execute('select * from job_request_status')
    return {requestList:result}
}
const postJobRequestStatus=async ({name})=>{
    await connection.execute('insert into job_request_status(name) values(?)',
        [name])
    return getJobRequestStatusList()
}
const updateJobRequestStatus=async ({id}, {name})=>{
    await connection.execute('update job_request_status set name=? where id =?',
        [name, id])
    return getJobRequestStatusList()
}
const deleteJobRequestStatus=async ({id})=>{
    await connection.execute('delete from job_request_status where id=?)', [id])
    return getJobRequestStatusList()
}
module.exports = {getJobRequestStatusList, postJobRequestStatus, updateJobRequestStatus, deleteJobRequestStatus}