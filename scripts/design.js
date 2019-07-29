const fs = require('fs-extra')
const z = require('zunder')
const u = z.undertaker
const setZunderConfig = require('./set-zunder-config')
const copyScss = require('./copy-scss')

const ensureDevDir = () => fs.ensureDir(z.config.devDir)

setZunderConfig(z)

u.series(
  z.applyDevEnv,
  z.cleanDev,
  ensureDevDir,
  copyScss(z.config.devDir),
  u.parallel(
    z.watchServer,
    z.watchStaticAssets,
    z.watchScripts,
    z.watchStylesheets
  )
)()
