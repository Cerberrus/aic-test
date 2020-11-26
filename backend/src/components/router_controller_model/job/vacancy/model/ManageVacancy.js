const connection = require('../../../../database/DataBase')

const getJobVacancyList=async ()=>{
    const [result] = await connection.execute('select * from job_vacancy')
    return {vacancyList:result}
}
const getJobVacancy=async ({id})=>{
    const [result] = await connection.execute('select * from job_vacancy where id=?', [id])
    return {vacancy:result}
}
const postJobVacancy=async ({name, ImageDescription, imagePath})=>{
    await connection.execute('insert into job_vacancy(name, Image_description, image_path) values(?,?,?)',
        [name, ImageDescription, imagePath])
    return getJobVacancyList()
}
const updateJobVacancy=async ({id}, {name, ImageDescription, imagePath})=>{
    await connection.execute('update job_vacancy set name=?, Image_description=?, image_path=? where id =?',
        [name, ImageDescription, imagePath,id])
    return getJobVacancyList()
}
const deleteJobVacancy=async ({id})=>{
    await connection.execute('delete from job_vacancy where id=?)', [id])
    return getJobVacancyList()
}
module.exports = {getJobVacancyList, getJobVacancy, postJobVacancy, updateJobVacancy, deleteJobVacancy}