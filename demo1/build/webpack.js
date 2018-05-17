// 路径解析
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rm = require('rimraf');

// 删除
rm(path.join(__dirname, '../dist'), (err) => {
    if (err) throw err;
});

module.exports = {
    // js文件入口
    entry: path.join(__dirname, '../src/script/main.js'),
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
                // 对css文件使用loader
                test: /\.css$/,
                // 使用插件提取样式
                use: ExtractTextPlugin.extract({
                    // 样式loader运行顺序，后续可加入less/sass等处理
                    use: 'css-loader',
                    // 若上述处理进行顺利，执行style-loader并导出文件
                    fallback: 'style-loader',
                    // 样式覆盖路径 处理背景图之类
                    publicPath: '../../'
                })
            },
            {
                // 对下列资源文件使用loader
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    // 小于10kb将会转换成base64
                    limit: 10240,
                    // 大于10kb的资源输出地[name]是名字[ext]后缀
                    name: 'static/img/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('static/css/[name].[hash].css'),
        new HtmlWebpackPlugin({
            // 生成的html文件名，该文件将被放置在输出目录
            filename: 'index.html',
            // 源html文件路径
            template: path.join(__dirname, '../src/page/index.html')
        }),
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
