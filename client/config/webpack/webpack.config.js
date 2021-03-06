const {merge} = require('webpack-merge')

module.exports = (env, argv) => {
    process.env.NODE_ENV = argv.mode;

    const legacyJS     = require('./js.legacy.config')
    const modernJs     = require('./js.modern.config')
    const serverConfig = require('./server.config')
    const svgConfig    = require('./svg.config')
    const imageConfig  = require('./image.config')
    const cssConfig    = require('./css.config')
    const fontConfig   = require('./font.config')


    const clientLegacy = merge(legacyJS, svgConfig, imageConfig, cssConfig, fontConfig)
    const clientModern = merge(modernJs, svgConfig, imageConfig, cssConfig, fontConfig)
    const serverBuild  = merge(serverConfig, svgConfig, imageConfig, cssConfig, fontConfig)

    if(argv.mode === 'production') {
        return [clientModern, clientLegacy, serverBuild]
    } else {
        return clientModern
    }
}
