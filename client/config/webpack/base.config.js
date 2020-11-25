const path = require('path')

const PATH = {
    src:    path.resolve(__dirname, '../../src'),
    dist:   path.resolve(__dirname, '../../dist'),
    config: path.resolve(__dirname, '../'),
}

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    externals: {
        path: PATH,
        isDev:  isDev,
        isProd: !isDev,
        alias: {
            '~src':  PATH.src,
            '~dist': PATH.dist,
            '~admin': `${PATH.src}/admin`,
            '~user':  `${PATH.src}/user`,
        }
    }
}
