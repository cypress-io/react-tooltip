const z = require('zunder')
const u = z.undertaker
const setZunderConfig = require('./set-zunder-config')
const copyScss = require('./copy-scss')

setZunderConfig(z)

u.series(
  z.applyDevEnv,
  z.cleanDev,
  z.copyDevScripts,
  z.buildDevStylesheets,
  copyScss(z.config.devDir)
)()
