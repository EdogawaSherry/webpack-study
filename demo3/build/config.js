module.exports = {
    // 多页面配置
    pageNames: [
        'index',
        'demo1',
        'demo2'
    ],
    // 开发
    dev: {
        sourceMap: true,
        extract: false,
        // 局域网IP
        host: '192.168.11.105',
        // 端口号
        port: '2018'
    },
    // 生产
    prod: {
        sourceMap: false,
        extract: true
    }
};
