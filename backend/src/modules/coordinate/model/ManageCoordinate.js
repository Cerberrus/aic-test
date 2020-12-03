const connection = require("../../../lib/database/DataBase");

const getCoordinateList = async () => {
  const [result] = await connection.execute(
    "select C.id, C.name, C.description, C.coordinate, CT.name from coordinate as C join coordinate_type as CT on C.type_id = CT.id"
  );
  return result;
};
const postCoordinate = async ({ coordinate, name, description, typeId }) => {
  typeId = Number(typeId);
  await connection.execute(
    "insert into coordinate(coordinate,name, description, type_id) values(?,?,?,?)",
    [coordinate, name, description, typeId]
  );
  return getCoordinateList();
};
const deleteCoordinate = async ({ id }) => {
  id = Number(id);
  await connection.execute(
   "delete from coordinate where id=?)",
   [id]
  );
  return getCoordinateList();
};
module.exports = { getCoordinateList, postCoordinate, deleteCoordinate };