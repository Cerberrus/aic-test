const DataBase = require("../../../lib/DataBase");

class SliderDataBase extends DataBase {
    async getSliderDataList() {
        try {
            const [result] = await this.connection.execute(
                "select id, title, image_description as imageDescription from slider"
            );
            await super.implementPaths(result, 'slider_file') //Добавляем пути файлов
            return result
        } catch (e) {
            console.error(e);
        }
    };

    async getSliderData(id) {
        try {
            const [result] = await this.connection.execute(
                "select S.id, S.title, S.image_description  as imageDescription from slider as S  where S.id = ?",
                [id]
            );
            return result
        } catch (e) {
            console.error(e);
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
            console.error(e);
        }
    };
    async updateSliderData({id},{title, imageDescription}) {
        try {
            const result = await this.connection.execute(
                "update slider set title=?, image_description=? where id =?",
                [title, imageDescription, id]
            );
            return id
        } catch (e) {
            console.error(e);
        }
    };

    async deleteSliderData({id}) {
        try {
            id = Number(id);
            const sliderData = await this.getSliderData(id)         //Берем данные удаляемой записи
            await this.implementPaths(sliderData,'slider_file')
            await this.connection.execute("delete from slider where id=?", [id]);
            return sliderData[0];
        } catch (e) {
            console.error(e);
        }
    };
}

module.exports = new SliderDataBase()
