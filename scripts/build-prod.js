var fs = require('fs')
var path = require('path')
var z = require('zunder')
var u = z.undertaker
var setZunderConfig = require('./set-zunder-config')

setZunderConfig(z)

var copyScss = () => {
  var from = path.join(__dirname, '..', 'src', 'main.scss')
  var to = path.join(z.config.prodDir, 'tooltip.scss')
  
  return fs.createReadStream(from)
    .pipe(fs.createWriteStream(to))
}

u.series(
  z.applyProdEnv,
  z.cleanProd,
  z.copyProdScripts,
  z.buildProdStylesheets,
  copyScss
)()
