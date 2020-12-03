const connection = require("../../../lib/database/DataBase");

const getSliderDataList = async () => {
  try {
    const [result] = await connection.execute(
      "select title, image_description as imageDescription, image_path as imagePath from slider"
    );
    return result;
  } catch (e) {
    console.log(e);
  }
};
const __getSliderTitle = async (id) => {
  try {
    const [result] = await connection.execute(
      "select * from slider where id=?",
      [id]
    );
    return result[0].title;
  } catch (e) {
    console.log(e);
  }
};
const postSliderData = async ({ title, imageDescription, imagePath }) => {
  try {
    await connection.execute(
      "insert into slider(title, image_description, image_path) values(?,?,?)",
      [title, imageDescription, imagePath]
    );
    return getSliderDataList();
  } catch (e) {
    console.log(e);
  }
};
const deleteSliderData = async ({ id }) => {
  try {
    id = Number(id);
    const slider = await __getSliderTitle(id);
    await connection.execute("delete from slider where id=?", [id]);
    return slider;
  } catch (e) {
    console.log(e);
  }
};
module.exports = { getSliderDataList, postSliderData, deleteSliderData };
