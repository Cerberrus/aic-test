const Instagram= require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')
const setting = require('../../settings/model/ManageSettings')

let instance = null

class InstagramSingleton{
    constructor() {
        if (instance) {
            return instance
        }
        setInterval(async () => await this.client.login(), 7200000)
        setInterval(async () => await this.recyclePhoto(), 3600000)
        instance = this
        return instance;
    }
    init = async ()=>{
        try{
            this.username = await setting.getSetting({key: 'instagramLogin'})
            this.password = await setting.getSetting({key: 'instagramPassword'})
            const cookieStore = await new FileCookieStore('./cookies.json')
            this.client = await new Instagram({username: this.username, password: this.password, cookieStore})
            await this.client.login({username: this.username , password: this.password})
            await this.recyclePhoto()
        }
        catch (e) {
            console.log(e)
        }
    }
    recyclePhoto=async()=>{
        try{
            console.log('Update image from instagram')
            this.instagramPhotos = await this.getPhotosFromInstagram()
            console.log('Update done, length photo list:', this.instagramPhotos.length)
        }
        catch (e) {
            console.log(e)
        }
    }
    getPhotosFromInstagram = async ()=>{
        const {user} = await this.client.getPhotosByUsername({username: 'la_loqiemean'/*this.username*/, first:999999})
        const result= []
        for (let edge of user.edge_owner_to_timeline_media.edges){
            result.push(edge.node.display_url)
        }
        return result
    }
    getPhotos = async ()=>{
        return this.instagramPhotos
    }
    updateUserInformation = async ({username, password})=>{
        try{
            const {authenticated} = await this.client.login({username, password})
            if (authenticated) {
                this.username = username
                this.password = password
                await setting.postSetting({key: 'instagramLogin', value: this.username})
                await setting.postSetting({key: 'instagramPassword', value: this.password})
                await this.getPhotosFromInstagram()
                console.log('Успешная авторизация')
                return ('Успешно')
            } else {
                await this.client.login({username: this.username, password: this.password})
                console.log('Ошибка авторизации')
                return ('Ошибка')
            }
        }
        catch (e) {
            console.log(e)
        }
    }
}
module.exports = new InstagramSingleton()