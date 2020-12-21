const instagram = require("instagram-web-api");
const FileCookieStore = require("tough-cookie-filestore2");
const settingDatabase = require("../../settings/model/SettingDataBase");

class Instagram {
  
  static #username
  static #usernamePrivate
  static #password
  static #client
  
  constructor() {
    setInterval(async () => await Instagram.#client.login(), 7200000);
    setInterval(async () => await this.recyclePhoto(), 3600000);
    this.instagramPhotos = []
  }

  init = async () => {
    try {
      Instagram.#usernamePrivate = await settingDatabase.getSetting({ key: "instagramLoginPrivate" });
      Instagram.#username = await settingDatabase.getSetting({ key: "instagramLogin" });
      Instagram.#password = await settingDatabase.getSetting({ key: "instagramPassword" });
      const cookieStore = await new FileCookieStore("./cookies.json");
      Instagram.#client = await new instagram({
        username: Instagram.#username,
        password: Instagram.#password,
        cookieStore,
      });
      await Instagram.#client.login({
        username: Instagram.#username,
        password: Instagram.#password,
      });
      await this.recyclePhoto();
    } catch (e) {
      console.log('Error in init instagram')
      await this.init()
    }
  };
  recyclePhoto = async () => {
    try {
      this.instagramPhotos = []
      console.log("Update image from instagram");
      await this.getPhotosFromInstagram();
    } catch (e) {
      console.log(e)
      console.log('Error in recycle instagram photo')
    }
  };
  getPhotosFromInstagram = async () => {      //Отправляет первые 50 изображений с instagram
      const { user } = await Instagram.#client.getPhotosByUsername({
        username: Instagram.#username,
        first: 50,
      });
      for (let edge of user.edge_owner_to_timeline_media.edges) {
        this.instagramPhotos.push(edge.node.display_url);
      }
  };
  getPhotos = async () => {
    return this.instagramPhotos;
  };
}

module.exports = new Instagram();
