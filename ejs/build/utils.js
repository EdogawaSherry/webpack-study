const path = require('path');
const ExtractTextPlugin = require('../node_modules/extract-text-webpack-plugin');
// 静态资源文件+第三方资源存放文件夹名称
const staticDir = 'static';
// 资源路径 背景图片 bgm等，传入路径以及文件名 ex img/xxx.png
exports.assetsPath = _path => path.posix.join(staticDir, _path);

/**
 * 样式处理 生成样式loader对象，并放入数组里面
 * @param { Object } options 对应config.js里面的对象属性
 * @return { Array }
 */
exports.styleLoader = (option) => {
    const options = option || {};
    // 两个固定的loader
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
            minimize: options.minimize
        }
    };
    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    };
    /**
     * 生成{test: xxx, use: xxx}中use的值
     * @param { String } loader loader名 less, scss, sass, 可为空，空默认css
     */
    function generateLoaders(loader) {
        // 加入两个固定loader
        const loaders = [cssLoader, postcssLoader];
        if (loader) {
            // 通过名字加入loader，末端压入数组，感谢loader的执行顺序是从后往前
            loaders.push({
                loader: `${loader}-loader`,
                options: {
                    // 是否生成.map
                    sourceMap: options.sourceMap
                }
            });
        }
        // 是否需要提取样式
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'style-loader',
                publicPath: '../../'
            });
        }
        return ['style-loader'].concat(loaders);
    }
    // 通过上述函数生成对应的值
    const loaders = {
        css: generateLoaders(),
        less: generateLoaders('less'),
        scss: generateLoaders('sass'),
        sass: generateLoaders('sass')
    };
    const output = [];
    // 遍历并加入正则，得到最终的loader
    for (const key in loaders) {
        if (Object.prototype.hasOwnProperty.call(loaders, key)) {
            const loader = loaders[key];
            output.push({
                test: new RegExp(`\\.${key}$`),
                use: loader
            });
        }
    }
    return output;
};
