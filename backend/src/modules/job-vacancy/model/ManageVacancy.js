const connection = require("../../../lib/database/DataBase");

const getJobVacancyList = async () => {
  const [result] = await connection.execute(
   "select * from job_vacancy"
  );
  return { vacancyList: result };
};
const getJobVacancy = async ({ id }) => {
  id = Number(id);
  const [
    result,
  ] = await connection.execute(
   "select * from job_vacancy where id=?",
   [id]
  );
  return result[0];
};
const postJobVacancy = async ({ title, ImageDescription, imagePath }) => {

  await connection.execute(
    "insert into job_vacancy(name, Image_description, image_path) values(?,?,?)",
    [title, ImageDescription, imagePath]
  );

  return getJobVacancyList();
};
const deleteJobVacancy = async ({ id }) => {
  id = Number(id);
  const vacancy = await getJobVacancy({ id });

  await connection.execute(
   "delete from job_vacancy where id=?",
   [id]
  );
  return vacancy.name;
};
module.exports = {
  getJobVacancyList,
  getJobVacancy,
  postJobVacancy,
  deleteJobVacancy,
};