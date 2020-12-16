const instagram = require("instagram-web-api");
const FileCookieStore = require("tough-cookie-filestore2");
const settingDatabase = require("../../settings/model/SettingDataBase");

class Instagram {
  
  static #username
  static #password
  static #client
  
  constructor() {
    setInterval(async () => await Instagram.#client.login(), 7200000);
    setInterval(async () => await this.recyclePhoto(), 3600000);
  }

  init = async () => {
    try {
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
      console.error('Error in init instagram')
      await this.init()
    }
  };
  recyclePhoto = async () => {
    try {
      console.log("Update file from instagram");
      this.instagramPhotos = await this.getPhotosFromInstagram();
      console.log(
        "Update done, length photo list:",
        this.instagramPhotos.length
      );
    } catch (e) {
      console.error('Error in recycle instagram photo')
    }
  };
  getPhotosFromInstagram = async () => {
    const { user } = await Instagram.#client.getPhotosByUsername({
      username: "la_loqiemean" /*Instagram.#username*/,
      first: 999999,
    });
    const result = [];
    for (let edge of user.edge_owner_to_timeline_media.edges) {
      result.push(edge.node.display_url);
    }
    return result;
  };
  getPhotos = async () => {
    return this.instagramPhotos;
  };
  updateUserInformation = async ({ username, password }) => {
    try {
      const { authenticated } = await Instagram.#client.login({ username, password });
      if (authenticated) {
        Instagram.#username = username;
        Instagram.#password = password;
        await settingDatabase.postSetting({
          key: "instagramLogin",
          value: Instagram.#username,
        });
        await settingDatabase.postSetting({
          key: "instagramPassword",
          value: Instagram.#password,
        });
        await this.getPhotosFromInstagram();
        console.log("Успешная авторизация");
        return "Успешно";
      } else {
        await Instagram.#client.login({
          username: Instagram.#username,
          password: Instagram.#password,
        });
        console.error("Ошибка авторизации");
        return "Ошибка";
      }
    } catch (e) {
      console.error('Error in update user information')
    }
  };
}

module.exports = new Instagram();
