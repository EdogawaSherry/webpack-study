const path = require('path');
const webpack = require('../node_modules/webpack');
const baseWebpack = require('./webpack.base');
const merge = require('../node_modules/webpack-merge');
const ExtractTextPlugin = require('../node_modules/extract-text-webpack-plugin');
const config = require('./config');
const rm = require('../node_modules/rimraf');
const utils = require('./utils');
const UglifyJsPlugin = require('../node_modules/uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('../node_modules/optimize-css-assets-webpack-plugin');

// 删除
rm(path.join(__dirname, '../public'), (err) => {
    if (err) throw err;
});

module.exports = merge(baseWebpack, {
    // devtool: 'source-map',
    module: {
        loaders: utils.styleLoader(config.prod)
    },
    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        // new OptimizeCssAssetsPlugin({
        //     assetNameRegExp: /\.optimize\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
        //     canPrint: true
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     // 提取出公共模块的chunkName，在html-webpack-plugin插件使用该chunkName
        //     name: 'commons',
        //     // 生成的公共模块文件路径和文件名 [name]是其chunkName 即commons
        //     filename: 'static/js/[name].[hash].js',
        //     // 模块被引用的最小次数，低于该次数将不会被提取
        //     minChunks: 3
        // }),
        new UglifyJsPlugin({
            // 是否生成.map
            sourceMap: config.prod.sourceMap
        })
    ]
});
