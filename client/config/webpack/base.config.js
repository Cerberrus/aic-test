const path = require('path')

const PATH = {
    dotenv: path.resolve(__dirname, '../../../.env'),
    src:    path.resolve(__dirname, '../../src'),
    dist:   path.resolve(__dirname, '../../dist'),
    config: path.resolve(__dirname, '../'),
    admin:  path.resolve(__dirname, '../../src/admin'),
    user:   path.resolve(__dirname, '../../src/user'),
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
