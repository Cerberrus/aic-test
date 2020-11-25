const {merge} = require('webpack-merge')

const clientConfig = require('./client.config')
const {externals: {path, isDev}} = require('./base.config')
const getScopedName = require('./helpers/css-scoped-name/getScopedName');

modernJS = {
    entry: {
        client: `${path.config}/client.js`
    },
    module: {
        rules: [{
            test: /\.js?$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            corejs: 3,
                            useBuiltIns: 'entry',
                            targets: {
                                esmodules: true
                            },
                            loose: true,
                        }],
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        '@loadable/babel-plugin',
                        ['react-css-modules', {
                            generateScopedName: isDev ? '[name]--[local]' : getScopedName,
                            autoResolveMultipleImports: true
                        }],
                        ["module:fast-async", { "spec": true }],
                    ]
                }
            }
        }]
    }
}

module.exports = merge(clientConfig('modern'), modernJS)
