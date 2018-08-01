const baseWebpack = require('./webpack.base');
const merge = require('../node_modules/webpack-merge');
const config = require('./config');
const utils = require('./utils');
// 部分移动端浏览器不提取样式无法被加载
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseWebpack, {
    module: {
        loaders: utils.styleLoader(config.dev)
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css')
    ]
});
