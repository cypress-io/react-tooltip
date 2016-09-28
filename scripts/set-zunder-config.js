module.exports = function setZunderConfig (zunder) {
  zunder.setConfig({
    cacheBust: false,
    prodDir: 'dist',
    stylesheetName: 'tooltip.css',
    testDir: 'dist',
  })
}
