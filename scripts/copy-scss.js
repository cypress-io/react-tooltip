const fs = require('fs')
const path = require('path')

module.exports = (dir) => () => {
  const from = path.join(__dirname, '..', 'src', 'main.scss')
  const to = path.join(dir, 'tooltip.scss')

  return fs.createReadStream(from)
    .pipe(fs.createWriteStream(to))
}
