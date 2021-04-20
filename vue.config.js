module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
    devServer: {
        port: 8080,//端口号
        open: true, //配置自动启动浏览器
        proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
       
    }
}