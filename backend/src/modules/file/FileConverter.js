const Sharp = require("sharp");
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
    }

    manipulateImage({method, data}) {
        switch (method) {
            case "convert":
                return this.convertImage(data);
            case "add":
                return this.addFile(data);
            case "update":
                return this.updateImage(data);
            case "check":
                return this.checkFile(data);
            case "delete":
                return this.deleteImage(data);
        }
    }

    async updateImage(data) {
        await this.convertImage(data, true);
    }

    async convertImage({pathImage, toFolder, id, table}, update = false) {
        try {
            if (update) {
                const oldPaths = await fileDataBase.get(id, table)
                for (let object of oldPaths) {
                    await this.deleteFile(`${this.baseFileDerictory}${object.path}`)
                }
            }
            const status = await this.__convert(pathImage, toFolder);
            if (status === true) {
                update ? await this.updateFile({paths: this.paths, id, table})
                    : await this.addFile({paths: this.paths, id, table})
                this.deleteFile(pathImage);
            }

        } catch (e) {
            await this.deleteFile(pathImage);
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
            paths = paths.map(value => value.split(this.baseFileDerictory)[1])
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
            console.error(e)
        }
    }

    async deleteImage({imagePath}) {
        for (let path of imagePath) {
            await this.deleteFile(`${this.baseFileDerictory}${path}`);
        }
        return true
    }

    postFileIntoDatabase(id, paths, table) {
        for (let path of paths) {
            fileDataBase.post(id, path, table)
        }
    }

    async updateFileIntoDatabase(id, paths, table) {
        await fileDataBase.delete(id, table)
        for (let path of paths) {
            await fileDataBase.post(id, path, table)
        }
    }

    async __convert(pathImage, toFolder) {
        try {

            let convertWithTime = "Convert file start| " + Date.now();

            console.log("|IMAGE CONVERT|");
            console.time(convertWithTime);

            const extension = path.extname(pathImage);
            const name = path.basename(pathImage, extension);
            switch (extension) {
                case ".svg":
                    await this.saveSvg(pathImage, name, toFolder);
                    break
                case ".png":
                    await this.convertWebP(pathImage, name, toFolder);
                    await this.convertPng(pathImage, name, toFolder);
                    break
                case ".jpg":
                case ".jpeg":
                    await this.convertWebP(pathImage, name, toFolder);
                    await this.convertJpeg(pathImage, name, toFolder);
                    break
            }
            console.timeEnd(convertWithTime);
            return true;
        } catch (e) {
            console.error(e);
            throw {code: 415, error: "Ошибка преобразования иображения"};
        }
    }

    async convertJpeg(path, name, toFolder) {
        this.paths.push(await this.__convertToJpeg(path, name, toFolder, 1));
        console.log("Stage jpeg x1 end");
        this.paths.push(await this.__convertToJpeg(path, name, toFolder, 2));
        console.log("Stage jpeg x2 end");
    }

    async convertPng(path, name, toFolder) {
        this.paths.push(await this.__savePng(path, name, toFolder, 1));
        console.log("Stage png x1 end");
        this.paths.push(await this.__savePng(path, name, toFolder, 2));
        console.log("Stage png x2 end");
    }

    async convertWebP(path, name, toFolder) {
        this.paths.push(await this.__convertToWebP(path, name, toFolder, 1));
        console.log("Stage webp x1 end");
        this.paths.push(await this.__convertToWebP(path, name, toFolder, 2));
        console.log("Stage webp x2 end");
    }

    async __convertToWebP(imagePath, name, toFolder, resize) {
        const imageInfo = await Sharp(imagePath).metadata();
        const filename = `${toFolder}/${name}.@x${resize}.webp`
        await Sharp(imagePath)
            .resize(imageInfo.width * resize, imageInfo.height * resize)
            .webp({quality: 75, lossless: true})
            .toFile(filename);
        return filename
    }

    async __convertToJpeg(imagePath, name, toFolder, resize) {
        const imageInfo = await Sharp(imagePath).metadata();
        const filename = `${toFolder}/${name}.@x${resize}.jpeg`
        await Sharp(imagePath)
            .resize(imageInfo.width * resize, imageInfo.height * resize)
            .jpeg({quality: 75, progressive: true, chromaSubsampling: "4:4:4"})
            .toFile(filename);
        return filename
    }

    async __savePng(imagePath, name, toFolder, resize) {
        const imageInfo = await Sharp(imagePath).metadata();
        const filename = `${toFolder}/${name}.@x${resize}.png`
        await Sharp(imagePath)
            .resize(imageInfo.width * resize, imageInfo.height * resize)
            .toFile(filename);
        return filename
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
        const data = await fs.readFile(imagePath);
        const filename = `${toFolder}/${name}.svg`;
        const result = await svgo.optimize(data);
        await fs.writeFile(filename, result.data);
        this.paths.push(filename)
    }
}

module.exports = FileConverter;