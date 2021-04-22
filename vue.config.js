const path = require("path")
module.exports = {
  //关闭eslint语法检测功能
  lintOnSave: false,
  //路径设置
  publicPath:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",
  //开发服务器配置
  devServer: {
    //配置静态资源目录
    contentBase: path.join(__dirname, "public"),
    port: 9001, //端口号
    open: true, //配置自动启动浏览器
    proxy: "http://localhost:4000", // 配置跨域处理,只有一个代理
  },
  // 配置Webpack相关
  configureWebpack: {
    // 解析
    resolve: {
      // 配置路径别名
      alias: {
        "@v": path.resolve(__dirname, "src/views"),
        "@c": path.resolve(__dirname, "src/components"),
      },
    },
  },
};
