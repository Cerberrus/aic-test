const fs = require('fs')
const dot = require('dotenv')
dot.config()
//
// Создаем папки, если они не созданы, где будут храниться загружаемые файлы
//
const folderInit = () => {
    const project = process.cwd()
    console.log(project)

    let tempFolder = project + process.env.FILES_UPLOADS_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }

    tempFolder = project + process.env.FILES_PRIVATE_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }

    tempFolder = project + process.env.FILES_PRIVATE_SUMMARY_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }

    tempFolder = project + process.env.FILES_STATIC_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }

    tempFolder = project + process.env.FILES_STATIC_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }

    tempFolder = project + process.env.FILES_STATIC_IMAGES_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }

    tempFolder = project + process.env.FILES_STATIC_IMAGES_SLIDER_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }

    tempFolder = project + process.env.FILES_STATIC_IMAGES_VACANCY_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }

    tempFolder = project + process.env.FILES_TEMP_FOLDER
    try {
        fs.statSync(tempFolder)
    } catch (e) {
        fs.mkdirSync(tempFolder)
        console.log("Folder created - ", tempFolder)
    }
}

module.exports = {folderInit}

