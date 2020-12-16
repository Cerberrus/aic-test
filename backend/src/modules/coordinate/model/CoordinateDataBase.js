const DataBase = require('../../../lib/DataBase')

class CoordinateDataBase extends DataBase {
    async getList() {
        const [coordinateList] = await this.connection.execute(
            "select C.id, C.title ,C.longitude, C.latitude, CT.id as type, CT.type as typeTitle from coordinate as C join coordinate_type as CT on C.type_id = CT.id"
        );
        const res = {
            type: "FeatureCollection",
            features: await coordinateList.map((value) => {
                    return {
                        type: "Feature",
                        id: value.id,
                        title: value.title,
                        geometry: {
                            type: "Point",
                            coordinates: [value.longitude, value.latitude]
                        },
                        properties: {
                            type: value.type,
                            typeTitle: value.typeTitle
                        }
                    }
                }
            )
        }
        const typeList = await this.getType()
        return {typeList, coordinateList: res};
    };

    async get({id}) {
        const [coordinateList] = await this.connection.execute(
            "select C.id, C.title ,C.longitude, C.latitude, CT.id as type, CT.type as typeTitle from coordinate as C join coordinate_type as CT on C.type_id = CT.id where C.id =?", [id]
        );
        const res = {
            type: "FeatureCollection",
            features: await coordinateList.map((value) => {
                    return {
                        type: "Feature",
                        id: value.id,
                        title: value.title,
                        geometry: {
                            type: "Point",
                            coordinates: [value.longitude, value.latitude]
                        },
                        properties: {
                            type: value.type,
                            typeTitle: value.typeTitle
                        }
                    }
                }
            )[0]
        }
        const typeList = await this.getType()
        return {typeList, coordinate: res};
    };

    async update({id}, {title, longitude, latitude, typeId}) {
        id = Number(id);
        longitude = Number(longitude);
        latitude = Number(latitude);
        typeId = Number(typeId);
        await this.connection.execute(
            "update coordinate set title=?,longitude=?,latitude=?,type_id=? where id = ?",
            [title, longitude, latitude, typeId, id]
        );
        // await this.connection.execute(
        //     "insert into coordinate(title,longitude,latitude,type_id) values(?,?,?,?)",
        //     [title,longitude,latitude, typeId]
        // );
        return this.getList();
    }

    async post({title, longitude, latitude, typeId}) {
        typeId = Number(typeId);
        await this.connection.execute(
            "insert into coordinate(title,longitude,latitude,type_id) values(?,?,?,?)",
            [title, longitude, latitude, typeId]
        );
        return this.getList();
    };

    async delete({id}) {
        id = Number(id);
        await this.connection.execute(
            "delete from coordinate where id=?",
            [id]
        );
        return this.getList();
    };

    async getType() {
        const [result] = await this.connection.execute(
            "select id,`type` from coordinate_type"
        );
        return result;
    };

    async postType({name}) {
        await this.connection.execute("insert into coordinate_type(name) values(?)",
            [name]
        );
        return this.getType();
    };

    async deleteType({id}) {
        await this.connection.execute(
            "delete from coordinate_type where id=?)",
            [id]
        );
        return this.getType();
    };
}


module.exports = new CoordinateDataBase()