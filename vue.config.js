const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    porh: 8888,
    host: "localhost",
    open: true,
    https: false,
  },
  lintOnSave: false, //关闭语法检查
});
