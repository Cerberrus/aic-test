const DataBase = require('../../../lib/DataBase')

class CoordinateDataBase extends DataBase{
  async get(){
    const [coordinateList] = await this.connection.execute(
        "select C.id, C.title ,C.longitude, C.latitude, CT.name as type, CT.id as typeId from coordinate as C join coordinate_type as CT on C.type_id = CT.id"
    );
    const typeList = await this.getType()
    return {typeList, coordinateList};
  };
  async post({ coordinate, name, title, description, typeId }){
    typeId = Number(typeId);
    await this.connection.execute(
        "insert into coordinate(title,longitude,latitude, type_id) values(?,?,?,?,?)",
        [coordinate, name, description, typeId]
    );
    return this.get();
  };
  async delete({ id }){
    id = Number(id);
    await this.connection.execute(
        "delete from coordinate where id=?)",
        [id]
    );
    return this.get();
  };
  async getType(){
    const [result] = await this.connection.execute(
        "select * from coordinate_type"
    );
    return result;
  };
  async postType({ name }){
    await this.connection.execute("insert into coordinate_type(name) values(?)",
        [name]
    );
    return this.getType();
  };
  async deleteType({ id }){
    await this.connection.execute(
        "delete from coordinate_type where id=?)",
        [id]
    );
    return this.getType();
  };
}


module.exports = new CoordinateDataBase()