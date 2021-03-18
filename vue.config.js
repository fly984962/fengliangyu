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
    disableHostCheck: true
  }
}