module.exports =  {
    module: {
        rules: [{
            test: /\.(woff|woff2|eot|ttf)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: `fonts/[name].[hash:8].[ext]`,
                    }
                },
            ]
        }]
    },
};