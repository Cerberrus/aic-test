const csso = require('csso');
const RawSource = require('webpack-sources/lib/RawSource');
const getScopes = require('./helpers/getScopes');

const isCssFilename = filename => /\.css$/.test(filename);

module.exports = class cssoPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('csso-plugin', (compilation) => {
            compilation.hooks.optimizeChunkAssets.tapAsync('csso-plugin', (chunks, callback) => {
                chunks.forEach((chunk) => {
                    // Пробегаемся по всем CSS файлам
                    chunk.files.forEach((filename) => {
                        if (!isCssFilename(filename)) {
                            return;
                        }

                        const asset = compilation.assets[filename];
                        const source = asset.source();

                        // Создаем ast из CSS файла
                        const ast = csso.syntax.parse(source);

                        // Получаем массив массивов с объединенными именами классов
                        const scopes = getScopes(ast);

                        // Сжимаем ast
                        const { ast: compressedAst } = csso.syntax.compress(ast, {
                            usage: {
                                scopes,
                            },
                        });
                        const minifiedCss = csso.syntax.generate(compressedAst);

                        compilation.assets[filename] = new RawSource(minifiedCss);
                    });
                });

                callback();
            });
        });
    }
}