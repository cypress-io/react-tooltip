const fs = require('fs-extra')
const z = require('zunder')
const u = z.undertaker
const setZunderConfig = require('./set-zunder-config')
const copyScss = require('./copy-scss')

const ensureDevDir = () => fs.ensureDir(z.config.devDir)

setZunderConfig(z)

// TODO: watch scss, so it's copied on change

u.series(
  z.applyDevEnv,
  z.cleanDev,
  ensureDevDir,
  copyScss(z.config.devDir),
  u.parallel(
    // need these for 'design' mode, but z.watchScripts conflicts with z.watchTests
    // because testDir and devDir are the same. need to fix in zunder
    // z.watchServer,
    // z.watchStaticAssets,
    // z.watchScripts,
    z.watchTests,
    z.watchStylesheets
  )
)()
