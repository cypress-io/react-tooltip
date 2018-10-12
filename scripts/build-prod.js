const z = require('zunder')
const u = z.undertaker
const setZunderConfig = require('./set-zunder-config')
const copyScss = require('./copy-scss')

setZunderConfig(z)

u.series(
  z.applyProdEnv,
  z.cleanProd,
  z.copyProdScripts,
  z.buildProdStylesheets,
  copyScss(z.config.prodDir)
)()
