module.exports = function setZunderConfig (zunder) {
  zunder.setConfig({
    cacheBust: false,
    prodDir: 'dist',
    stylesheets: {
      'src/main.scss': {
        watch: ['src/**/*.scss'],
        output: 'tooltip.css',
      },
    },
    testDir: 'dist',
  })
}
