const Sharp = require("sharp");
const crypto = require("crypto")
const path = require("path");
const fs = require("fs");
const ManageFiles = require("./ManageFiles");
const SVGO = require("svgo");
const fileDataBase = require('./FileDataBase')

class FileConverter extends ManageFiles {
    constructor() {
        super();
        this.paths = []
        this.baseFileDerictory = `${process.cwd()}/uploads`
        this.hash = ''
    }

    manipulateImage({method, data}) {
        switch (method) {
            case "convert":
                return this.convertImage(data); //Добавляем изображения и конвертируем их
            case "add":
                return this.addFile(data);      //Добавляем файл резюме
            case "update":
                return this.updateImage(data);  //Обновляем изображения
            case "check":
                return this.checkFile(data);    //Проверяет существование файла и возвращает измененый объект,с имплементрованными существующими файлами
            case "delete":
                return this.deleteImage(data);  //Удаляем изображения
        }
    }

    async updateImage(data) {
        await this.convertImage(data, true);
        return true
    }

    async convertImage({pathImage, toFolder, id, table}, update = false) {
        try {
            if (update) {
                const oldPaths = await fileDataBase.get(id, table)
                for (let object of oldPaths) {
                    await this.deleteFile(`${this.baseFileDerictory}${object.path}`)
                }
            }
            this.__convert(pathImage, toFolder).then(async status => {
                if(status === true){
                    if(!!update)    await this.updateFile({paths: this.paths, id, table})
                    else            await this.addFile({paths: this.paths, id, table})

                    this.deleteFile(pathImage);
                }
            });
            return true
        } catch (e) {
            await this.deleteFile(pathImage);
            return  false
        }
    }

    async addFile({paths, id, table}) {
        try {
            paths = paths.map(value => value.split(this.baseFileDerictory)[1])
            await this.postFileIntoDatabase(id, paths, table)
        } catch (e) {
            console.error(e)
        }
    }

    async updateFile({paths, id, table}) {
        try {
            if(Array.isArray(paths)){
                paths = paths.map(value => value.split(this.baseFileDerictory)[1])
            }
            await this.updateFileIntoDatabase(id, paths, table)
        } catch (e) {
            console.error(e)
        }
    }

    async checkFile(objectList) {
        try {
            for (let object of objectList) {
                if (!!object.path) {
                    const exist = await object.path.filter(path => fs.existsSync(this.baseFileDerictory + path))
                    if (!!exist) {
                        object.path = exist.map(path => ('https://aic.xutd.tk' + path))
                    } else {
                        object.path = null
                    }
                }
            }
            return objectList
        } catch (e) {
            console.log(e)
            return {}
        }
    }

    async deleteImage({imagePath}) {
        try{
            if (Array.isArray(imagePath)) {
                console.log('isArray')
                for (let path of imagePath) {
                    await this.deleteFile(`${this.baseFileDerictory}${path}`);
                }
            }
            return true
        }catch (e) {
            console.log(e)
            return false
        }
    }

    postFileIntoDatabase(id, paths, table) {
        try{
            for (let path of paths) {
                fileDataBase.post(id, path, table)
            }
        }
        catch (e) {
            console.error(e)
        }
    }

    async updateFileIntoDatabase(id, paths, table) {
        try{
            await fileDataBase.delete(id, table)
            for (let path of paths) {
                await fileDataBase.post(id, path, table)
            }
        }catch (e) {
            console.log(e)
        }
    }

    async __convert(pathImage, toFolder) {
        try {
            const date = await new Date()
            const preHash = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}}`
            this.hash = await crypto.createHash('sha256').update(preHash).digest("hex")
            let convertWithTime = "Convert file start| " + Date.now();

            console.log("|IMAGE CONVERT|");
            console.time(convertWithTime);
            const extension = path.extname(pathImage);
            console.log('Extension', extension)
            const name = path.basename(pathImage, extension);
            if(extension === '.svg'){
                await this.saveSvg(pathImage, name, toFolder);
            }
            else if(extension === '.png'){
                await this.convertWebP(pathImage, name, toFolder);
                await this.convertPng(pathImage, name, toFolder);
            }
            else if(extension === '.jpg' || extension === '.jpeg'){
                await this.convertWebP(pathImage, name, toFolder);
                await this.convertJpeg(pathImage, name, toFolder);
            }
            else{
                console.log('else false')
                return false;
            }
            console.timeEnd(convertWithTime);
            return true;
        } catch (e) {
            console.error(e);
            throw {code: 415, error: "Ошибка преобразования иображения"};
        }
    }

    async convertJpeg(path, name, toFolder) {
        this.paths.push(await this.__convertToJpeg(path, name, toFolder, 1024));
        console.log("Stage jpeg x1 end");
        this.paths.push(await this.__convertToJpeg(path, name, toFolder, 2048));
        console.log("Stage jpeg x2 end");
    }

    async convertPng(path, name, toFolder) {
        this.paths.push(await this.__savePng(path, name, toFolder, 1024));
        console.log("Stage png x1 end");
        this.paths.push(await this.__savePng(path, name, toFolder, 2048));
        console.log("Stage png x2 end");
    }

    async convertWebP(path, name, toFolder) {
        this.paths.push(await this.__convertToWebP(path, name, toFolder, 1024));
        console.log("Stage webp x1 end");
        this.paths.push(await this.__convertToWebP(path, name, toFolder, 2048));
        console.log("Stage webp x2 end");
    }

    targetResize(target, width, height){
        const ratioW = target / width
        const ratioH = target / height
        const ratio = ratioW < ratioH?ratioW:ratioH
        const newWidth = Math.trunc(width * ratio)
        const newHeight = Math.trunc(height * ratio)
        return {newWidth, newHeight}
    }

    async __convertToWebP(imagePath, name, toFolder, resize) {
        try{
            let imageInfo = await Sharp(imagePath).metadata();
            const filename = `${toFolder}/${name}@${resize}px-${this.hash}.webp`
            resize = this.targetResize(resize, imageInfo.width, imageInfo.height)
            await Sharp(imagePath)
                .resize(resize.newWidth, resize.newHeight)
                .webp({quality: 60})
                .toFile(filename);
            return filename
        }
        catch (e) {
            console.log(e)
        }
    }

    async __convertToJpeg(imagePath, name, toFolder, resize) {
        try{
            let imageInfo = await Sharp(imagePath).metadata();
            const filename = `${toFolder}/${name}@${resize}px-${this.hash}.jpeg`
            resize = this.targetResize(resize, imageInfo.width, imageInfo.height)
            await Sharp(imagePath)
                .resize(resize.newWidth, resize.newHeight)
                .jpeg({quality: 75, progressive: true, chromaSubsampling: "4:4:4"})
                .toFile(filename)
            return filename
        }
        catch (e) {
            console.log(e)
        }
    }

    async __savePng(imagePath, name, toFolder, resize) {
        try{
            let imageInfo = await Sharp(imagePath).metadata();
            const filename = `${toFolder}/${name}@${resize}px-${this.hash}.png`
            resize = this.targetResize(resize, imageInfo.width, imageInfo.height)
            await Sharp(imagePath)
                .resize(resize.newWidth, resize.newHeight)
                .toFile(filename);
            return filename
        }
        catch (e) {
            console.log(e)
        }
    }

    async saveSvg(imagePath, name, toFolder) {
        const svgo = new SVGO({
            plugins: [
                {
                    cleanupAttrs: true,
                },
                {
                    removeDoctype: true,
                },
                {
                    removeXMLProcInst: true,
                },
                {
                    removeComments: true,
                },
                {
                    removeMetadata: true,
                },
                {
                    removeTitle: true,
                },
                {
                    removeDesc: true,
                },
                {
                    removeUselessDefs: true,
                },
                {
                    removeEditorsNSData: true,
                },
                {
                    removeEmptyAttrs: true,
                },
                {
                    removeHiddenElems: true,
                },
                {
                    removeEmptyText: true,
                },
                {
                    removeEmptyContainers: true,
                },
                {
                    removeViewBox: false,
                },
                {
                    cleanupEnableBackground: true,
                },
                {
                    convertStyleToAttrs: true,
                },
                {
                    convertColors: true,
                },
                {
                    convertPathData: true,
                },
                {
                    convertTransform: true,
                },
                {
                    removeUnknownsAndDefaults: true,
                },
                {
                    removeNonInheritableGroupAttrs: true,
                },
                {
                    removeUselessStrokeAndFill: true,
                },
                {
                    removeUnusedNS: true,
                },
                {
                    cleanupIDs: true,
                },
                {
                    cleanupNumericValues: true,
                },
                {
                    moveElemsAttrsToGroup: true,
                },
                {
                    moveGroupAttrsToElems: true,
                },
                {
                    collapseGroups: true,
                },
                {
                    removeRasterImages: false,
                },
                {
                    mergePaths: true,
                },
                {
                    convertShapeToPath: true,
                },
                {
                    sortAttrs: true,
                },
                {
                    removeDimensions: true,
                },
                {
                    removeAttrs: {attrs: "(stroke|fill)"},
                },
            ],
        });
        const data = await fs.readFileSync(imagePath);
        const filename = `${toFolder}/${name}.svg`;
        const result = await svgo.optimize(data);
        await fs.writeFileSync(filename, result.data);
        this.paths.push(filename)
    }
}

module.exports = FileConverter;