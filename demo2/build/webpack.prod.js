const path = require('path');
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
        new UglifyJsPlugin({
            // 是否生成.map
            sourceMap: config.prod.sourceMap
        })
    ]
});
