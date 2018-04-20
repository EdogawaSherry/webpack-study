const path = require('path');
const webpack = require('webpack');
const baseWebpack = require('./webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');
const rm = require('rimraf');
const utils = require('./utils');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 删除
rm(path.join(__dirname, '../dist'), (err) => {
    if (err) throw err;
});

module.exports = merge(baseWebpack, {
    devtool: 'source-map',
    module: {
        loaders: utils.styleLoader(config.prod)
    },
    plugins: [
        new ExtractTextPlugin('static/css/[name].[hash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            // 提取出公共模块的chunkName，在html-webpack-plugin插件使用该chunkName
            name: 'commons',
            // 生成的公共模块文件路径和文件名 [name]是其chunkName 即commons
            filename: 'static/js/[name].[hash].js',
            // 模块被引用的最小次数，低于该次数将不会被提取
            minChunks: 3
        }),
        new UglifyJsPlugin({
            // 是否生成.map
            sourceMap: config.prod.sourceMap
        })
    ]
});
