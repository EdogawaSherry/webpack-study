// 路径解析
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');
const config = require('./config');

// entry对象
const Entries = {};
// 插件数组
const HtmlPlugins = [];

config.pageNames.forEach((page) => {
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.join(__dirname, `../src/page/${page}.html`),
        chunks: [page]
    });
    HtmlPlugins.push(htmlPlugin);
    Entries[page] = path.join(__dirname, `../src/script/${page}.js`);
});
module.exports = {
    // js文件入口
    entry: Entries,
    // 输出到dist目录
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].[hash].js'
    },
    // devServer: {
    //     host: '192.168.0.101',
    //     port: '2018'
    // },
    module: {
        loaders: [
            {
                // 对js文件使用loader
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    // 标签+属性
                    attrs: ['img:src', 'audio:src', 'video:src']
                }
            },
            {
                // 对下列资源文件使用loader
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    // 小于10kb将会转换成base64
                    limit: 10240,
                    // 大于10kb的资源输出地[name]是名字[ext]后缀
                    name: utils.assetsPath('img/[name].[hash:6].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: utils.assetsPath('media/[name].[hash:6].[ext]')
                }
            }
        ]
    },
    plugins: [
        ...HtmlPlugins,
        new CopyWebpackPlugin([{
            // 源文件目录
            from: path.join(__dirname, '../static'),
            // 目标目录 dist目录下
            to: 'static',
            // 筛选过滤，这里复制所有文件，连同文件夹
            ignore: ['.*']
        }])
    ]
};
