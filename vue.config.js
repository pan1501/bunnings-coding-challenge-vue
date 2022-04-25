const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports.chainWebpack = (config) => {
  config.module
    .rule("csv")
    .test(/\.csv$/)
    .use("csv-loader")
    .loader("csv-loader")
    .options({
      dynamicTyping: true,
      header: true,
      skipEmptyLines: true,
    })
    .end();
};
