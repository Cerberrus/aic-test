const {externals: {isDev}} = require('./base.config')

module.exports =  {
    module: {
        rules: [{
            test: /\.(png|jpg|jpeg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: `img/[name].[hash:8].[ext]`,
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    ...(isDev ? {
                        options: {
                            disable: true
                        }
                    } : {
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 90
                            },
                            optipng: {
                                optimizationLevel: 5
                            },
                            pngquant: {
                                enabled: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 90
                            }
                        }
                    })
                }
            ]
        }]
    },
};