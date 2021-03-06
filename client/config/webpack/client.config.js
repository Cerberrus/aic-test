const DotEnv            = require('dotenv-webpack')
const LoadablePlugin    = require('@loadable/webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const {externals: {path, alias, isDev}} = require('./base.config')

module.exports = (target) => ({
    name: 'client',
    mode: process.env.NODE_ENV,
    output: {
        path: path.dist,
        filename: `client/${target}/[name].[hash:8].js`,
        publicPath: '/'
    },
    ...(isDev ? {devtool: 'cheap-module-source-geography'} : {}),
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                }
            }
        },
    },
    resolve: {
        alias: alias
    },
    plugins: [
        new DotEnv({
            path: path.dotenv
        }),
        ...(isDev ? [
            new HTMLWebpackPlugin({
                template: `${path.config}/template.ejs`
            })
        ] : [
            new LoadablePlugin({
                filename: `${target}-scripts.json`
            }),
        ])
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    devServer: {
        port: 3001,
        // host: '192.168.0.201',
        historyApiFallback: true,
        hot: isDev,
        inline: isDev,
        open: isDev
    },
})
