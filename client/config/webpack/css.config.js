const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const getScopedName = require('./helpers/css-scoped-name/getScopedName')
const cssoLoader = require('./loaders/cssoLoader')

const {externals: {isDev, path}} = require('./base.config')

module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                ...(isDev ? ['style-loader'] : [
                    MiniCssExtractPlugin.loader,
                ]),
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: isDev,
                        modules: {
                            localIdentName: '[local]'
                        }
                    },
                },
                ...(isDev ? [] : [{
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                require('autoprefixer'),
                            ]
                        }
                    }
                }]),
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash:8].css'
        }),
        new cssoLoader(),
    ]
}