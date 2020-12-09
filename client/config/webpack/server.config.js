const nodeExternals = require('webpack-node-externals')
const DotEnv        = require('dotenv-webpack')

const getScopedName = require('./helpers/css-scoped-name/getScopedName');
const {externals: {path, alias, isDev}} = require('./base.config')

module.exports = {
    name: 'server',
    mode: process.env.NODE_ENV,
    target: 'node',
    externals: [nodeExternals({
        allowlist: [/^swiper/]
    })],
    entry: {
        server: ['@babel/polyfill', `${path.config}/server.js`]
    },
    output: {
        path: path.dist,
        filename: 'server.js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        "@babel/preset-env",
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-private-methods',
                        '@loadable/babel-plugin',
                    ]
                }
            }
        }]
    },
    resolve: {
        alias: alias
    },
    plugins: [
        new DotEnv({
            path: path.dotenv
        }),
    ],
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
}
