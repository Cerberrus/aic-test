const Sharp = require("sharp");
const path = require("path");
const fs = require("fs/promises");
const controlImage = require("./ManageFiles");
const SVGO = require("svgo");

class ImageConverter {
  manipulateImage({ method, data }) {
    switch (method) {
      case "convert":
        return this.convertImage(data);
      case "update":
        return this.updateImage(data);
      case "delete":
        return this.deleteImage(data);
    }
  }

  async convertImage({ pathImage, toFolder }) {
    try {
      const status = await this.__convert(pathImage, toFolder);
      if (status === true) await controlImage.deleteFile(pathImage);
    } catch (e) {
      await controlImage.deleteFile(pathImage);
    }
  }

  async deleteImage({ imagePath, imageName }) {
    try {
      const paths = await controlImage.getFilesPaths(imageName, imagePath);
      await controlImage.deleteFileList(paths);
    } catch (e) {
      throw e;
    }
  }

  async updateImage({ pathImageOld, pathImage }) {
    await this.convertImage(pathImage);
    await this.deleteImage(pathImageOld);
  }

  async __convert(pathImage, toFolder) {
    try {
      let convertWithTime = "Convert image start| " + Date.now();
      console.log("|IMAGE CONVERT|");
      console.time(convertWithTime);
      const extension = path.extname(pathImage);
      const name = path.basename(pathImage, extension);
      if (extension === ".svg") {
        await this.__saveSvg(pathImage, name, toFolder);
      } else if (extension === ".png") {
        await this.convertWebP(pathImage, name, toFolder);
        await this.convertPng(pathImage, name, toFolder);
      } else if (extension === ".jpeg" || extension === ".jpg") {
        await this.convertWebP(pathImage, name, toFolder);
        await this.convertJpeg(pathImage, name, toFolder);
      }
      console.timeEnd(convertWithTime);
      return true;
    } catch (e) {
      console.error(e);
      throw { code: 415, error: "Ошибка преобразования иображения" };
    }
  }

  async convertJpeg(path, name, toFolder) {
    await this.__convertToJpeg(path, name, toFolder, 1);
    console.log("Stage jpeg x1 end");
    await this.__convertToJpeg(path, name, toFolder, 2);
    console.log("Stage jpeg x2 end");
  }

  async convertPng(path, name, toFolder) {
    await this.__savePng(path, name, toFolder, 1);
    console.log("Stage png x1 end");
    await this.__savePng(path, name, toFolder, 2);
    console.log("Stage png x2 end");
  }

  async convertWebP(path, name, toFolder) {
    await this.__convertToWebP(path, name, toFolder, 1);
    console.log("Stage webp x1 end");
    await this.__convertToWebP(path, name, toFolder, 2);
    console.log("Stage webp x2 end");
  }

  async __convertToWebP(imagePath, name, toFolder, resize) {
    const imageInfo = await Sharp(imagePath).metadata();
    await Sharp(imagePath)
      .resize(imageInfo.width * resize, imageInfo.height * resize)
      .webp({ quality: 75, lossless: true })
      .toFile(`${toFolder}/${name}.@x${resize}.webp`);
  }

  async __convertToJpeg(imagePath, name, toFolder, resize) {
    const imageInfo = await Sharp(imagePath).metadata();

    await Sharp(imagePath)
      .resize(imageInfo.width * resize, imageInfo.height * resize)
      .jpeg({ quality: 75, progressive: true, chromaSubsampling: "4:4:4" })
      .toFile(`${toFolder}/${name}.@x${resize}.jpeg`);
  }

  async __savePng(imagePath, name, toFolder, resize) {
    const imageInfo = await Sharp(imagePath).metadata();
    await Sharp(imagePath)
      .resize(imageInfo.width * resize, imageInfo.height * resize)
      .toFile(`${toFolder}/${name}.@x${resize}.png`);
  }

  async __saveSvg(imagePath, name, toFolder) {
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
          removeAttrs: { attrs: "(stroke|fill)" },
        },
      ],
    });
    const data = await fs.readFile(imagePath);
    const path = `${toFolder}/${name}.svg`;
    const result = await svgo.optimize(data);
    await fs.writeFile(path, result.data);
  }
}

module.exports = ImageConverter;