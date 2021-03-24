module.exports = {
  publicPath:'./',
  css: {
    requireModuleExtension: true,
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        pathRewrite: {
          "^/api":""
        },
        changeOrigin: true
      }
    },
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 9528
  }
}