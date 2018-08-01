module.exports = {
    // 多页面开发在这里填写页面名称
    pageNames: [
        'index',
        // 'page1',
        // 'page2'
    ],
    // 开发
    dev: {
        publicPath: '/',
        minimize: false,
        sourceMap: false,
        // 貌似部分移动端手机需要提取样式出来才能渲染css 我的华为浏览器就这样
        extract: true
        // host: '192.168.11.101',
        // port: '8080'
    },
    // 生产
    prod: {
        publicPath: '/',
        minimize: false,
        sourceMap: false,
        extract: true
    }
};
