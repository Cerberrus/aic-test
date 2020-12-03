const connection = require("../../../lib/database/DataBase");

const getCoordinateTypeList = async () => {
  const [result] = await connection.execute(
   "select * from coordinate_type"
  );
  return result;
};
const postCoordinateType = async ({ name }) => {
  await connection.execute("insert into coordinate_type(name) values(?)",
   [name]
  );
  return getCoordinateTypeList();
};
const deleteCoordinateType = async ({ id }) => {
  await connection.execute(
   "delete from coordinate_type where id=?)",
   [id]
  );
  return getCoordinateTypeList();
};
module.exports = {
  getCoordinateTypeList,
  postCoordinateType,
  deleteCoordinateType,
};