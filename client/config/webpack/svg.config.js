const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const {externals: {isProd, alias}} = require('./base.config')

const svgoConfig = () => {
    let config

    if (isProd) {
        config = [
            {
                convertPathData: {
                    floatPrecision: 2
                }
            },
            {removeXMLNS: true},
            {removeViewBox: false},
            {removeDimensions: true},
            {
                removeAttrs: {
                    attrs: '(stroke|fill|fill-rule)'
                }
            }
        ]
    } else {
        config = [
            {
                removeAttrs: {
                    attrs: '(stroke|fill|fill-rule)'
                }
            }
        ]
    }

    return config
}

module.exports =  {
    module: {
        rules: [{
            test: /\.svg$/,
            use: [
                {
                    loader: 'svg-sprite-loader',
                    options: {
                        extract: true,
                        publicPath : `${alias.user}/static/icons`,
                        spriteFilename: './img/sprite.[hash:8].svg'
                    }
                },
                {
                    loader: 'svgo-loader',
                    options: {
                        plugins: svgoConfig()
                    }
                }
            ]
        }]
    },
    plugins: [
        new SpriteLoaderPlugin({
            plainSprite: true
        })
    ],
}