const DataBase = require("../../../lib/DataBase");

class SliderDataBase extends DataBase {
    constructor() {
        super();
    }
    async getSliderDataList() {
        try {
            const [result] = await this.connection.execute(
                "select id, title, image_description as imageDescription from slider"
            );
            await super.implementPaths(result, 'slider_file')
            return result
        } catch (e) {
            console.log(e);
        }
    };

    async getSliderData(id) {
        try {
            const [result] = await this.connection.execute(
                "select S.id, S.title, S.image_description  as imageDescription, S.hash from slider as S  where S.id = ?",
                [id]
            );
            return result
        } catch (e) {
            console.log(e);
        }
    };


    async postSliderData({title, imageDescription}) {
        try {
            const result = await this.connection.execute(
                "insert into slider(title, image_description) values(?,?)",
                [title, imageDescription]
            );
            return result[0].insertId
        } catch (e) {
            console.log(e);
        }
    };

    async deleteSliderData({id}) {
        try {
            id = Number(id);
            const sliderData = await this.getSliderData(id)
            await this.implementPaths(sliderData,'slider_file')
            await this.connection.execute("delete from slider where id=?", [id]);
            return sliderData[0];
        } catch (e) {
            console.log(e);
        }
    };
}

module.exports = new SliderDataBase()
