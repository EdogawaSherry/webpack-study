// 路径解析
const path = require('path');
const HtmlWebpackPlugin = require('../node_modules/html-webpack-plugin');
const CopyWebpackPlugin = require('../node_modules/copy-webpack-plugin');
const utils = require('./utils');
const config = require('./config');

// entry对象
const Entries = {
    index: path.join(__dirname, `../develop/index/index.js`)
};
// 插件数组
// const HtmlPlugins = [
//     new HtmlWebpackPlugin({
//         // template: path.join(__dirname, `../public/views/index.html`)
//         ejs: path.join(__dirname, `../develop/index/index.ejs`)
//     })
// ];

// config.pageNames.forEach((page) => {
//     const htmlPlugin = new HtmlWebpackPlugin({
//         filename: `${page}.html`,
//         template: path.join(__dirname, `../src/page/${page}.html`),
//         // chunkName集合，page为当前入口文件chunkName commons为公共模块chunkName
//         chunks: [page, 'commons']
//     });
//     HtmlPlugins.push(htmlPlugin);
//     Entries[page] = path.join(__dirname, `../src/script/${page}.js`);
// });
module.exports = {
    // js文件入口
    entry: Entries,
    // 输出到dist目录
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'js/[name].js'
    },
    devServer: {
        host: config.dev.host,
        port: config.dev.port
    },
    module: {
        loaders: [
            {
                // 通过require('jquery')来引入
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        // 暴露出去的全局变量的名称 随便你自定义
                        options: 'jQuery'
                    },
                    {
                        // 同上
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            },
            {
                // 对js文件使用loader
                test: /\.js$/,
                exclude: path.join(__dirname, '../node_modules'),
                // 仅仅解析
                include: path.join(__dirname, '../src'),
                use: 'babel-loader'
            },
            {
                // 对模版文件使用loader
                test: /\.ejs$/,
                use: 'ejs-loader'
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
        new CopyWebpackPlugin([{
            // 源文件目录
            from: path.join(__dirname, '../develop/'),
            // 目标目录 dist目录下
            to: '../views',
            // 筛选过滤，这里复制所有文件，连同文件夹
            ignore: ['.js', '**/*.js', '**/*.less', '**/*.scss']
        }])
    ]
};
