const baseWebpack = require('./webpack');
const merge = require('webpack-merge');
const config = require('./config');
const utils = require('./utils');
// 部分移动端浏览器不提取样式无法被加载
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseWebpack, {
    devtool: 'inline-source-map',
    module: {
        loaders: utils.styleLoader(config.dev)
    }
    // plugins: [
    //     new ExtractTextPlugin('static/css/style.css')
    // ]
});
