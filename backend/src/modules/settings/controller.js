const settingDatabase = require("./model/SettingDataBase");

const toGetSettingList = (req, res) => {
  try {
    settingDatabase.getSettingList()
        .then(data=>{
          res.status(200).json(data);
    })

  } catch (e) {
    res.status(404).send();
  }
};
const toGetPublicInformationList = (req, res) => {
  try {
    settingDatabase.getPublicInformationList()
        .then(data=>res.status(200).json(data))
  } catch (e) {
    res.status(404).send();
  }
};
const toGetSetting = (req, res) => {
  try {
    settingDatabase.getSetting(req.params)
        .then(data=>res.status(200).json(data))

  } catch (e) {
    res.status(404).send();
  }
};
const toPostSetting = async (req, res) => {
  try {
    for(let set in req.query){
      await settingDatabase.postSetting({key:set, value: req.query[set]})
    }
    res.status(200).send('ok')
  } catch (e) {
    console.error(e)
    res.status(404).send();
  }
};
const toDeleteSetting = (req, res) => {
  try {
    settingDatabase.deleteSetting(req.params)
        .then(data => res.status(200).json(data))

  } catch (e) {
    res.status(404).send();
  }
};

module.exports = {
  toGetPublicInformationList,
  toGetSettingList,
  toGetSetting,
  toPostSetting,
  toDeleteSetting,
};
