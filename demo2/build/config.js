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
        extract: false
    },
    // 生产
    prod: {
        sourceMap: false,
        extract: true
    }
};
