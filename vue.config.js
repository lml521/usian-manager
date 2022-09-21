const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查,
  devServer: {
    host: "localhost",
    port: "8888",
    https: false,
    hot: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_SERVICE_URL, //API服务器的地址
        // ws: true, //代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          ["^" + process.env.VUE_APP_BASE_API]: " ",
        },
      },
      // [process.env.VUE_APP_BASE_API1]: {
      //   target: process.env.VUE_APP_SERVICE_URL_V1, //API服务器的地址
      //   // ws: true, //代理websockets
      //   changeOrigin: true, // 虚拟的站点需要更管origin
      //   pathRewrite: {
      //     //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
      //     ["^" + process.env.VUE_APP_BASE_API1]: " ",
      //   },
      // },   [process.env.VUE_APP_BASE_API2]: {
      //   target: process.env.VUE_APP_SERVICE_URL_V2, //API服务器的地址
      //   // ws: true, //代理websockets
      //   changeOrigin: true, // 虚拟的站点需要更管origin
      //   pathRewrite: {
      //     //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
      //     ["^" + process.env.VUE_APP_BASE_API2]: " ",
      //   },
      // },
    },
  },
})
