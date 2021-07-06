module.exports = {
  publicPath:'./',
  css: {
    requireModuleExtension: true,
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://82.156.195.54/",
        pathRewrite: {
          "^/api":""
        },
        changeOrigin: true
      }
    },
    // assetsPublicPath: '/',
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 9528
  }
}