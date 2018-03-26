# webpack基础功能建设
由于webpack更新了4.0以上版本，这里描述的是v3版本

自己使用webpack有一段时间了，现在也在学习中，接触webpack之前所使用的工具只有grunt，之后遇到上了webpack，学习过程中也遇到了很多坑，网上也有不少教程，这里也就整理一下，当作学习笔记，不少地方借鉴了vue(特别是目录搭建+样式处理)

#### 笔记目录
* 基础功能搭建 => 能进行简单的打包+服务器构建(本章)
* 环境分离+多页面 => 开放／生产分离出来
* 构建模版 => 可以进行小项目的开发 `webpack+jquery+ejs`
* 路由+HMR TODO

#### webpack的核心(个人理解)
* `entry` 入口文件
* `output` 输出文件
* `loaders` 解析各种文件的loader
* `plugins` 插件配置

#### 搭建目录(为了之后的开发构建，统一目录)
* build/ webpack工具文件目录
* src/  项目开发目录
    * assets/
    * page/  html页面文件夹
    * script/ 脚本文件夹
    * syle/ 样式文件夹
* package.json

#### npm安装基本包
* `webpack` 目前还是不要用v4版本`npm install -D webpack@3.10.0`
* `babel-loader``js`文件的`loader `
* `babel-core` 同上
* `html-webpack-plugin` 个人理解为将打包的`js`和`html`进行绑定
* `style-loader` 样式`loader `
* `css-loader` 同上
* `url-loader` 资源(img资源、media资源等)`loader`

#### 走出第一步
* `build/`文件下面加入创建`webpack.js`
* `src/script/`文件下创建`index.js`
* `src/page/`文件下创建`index.html`


编写代码

```
    // 路径解析
    const path = require('path');

    module.exports = {
        // js文件入口
        entry: path.join(__dirname, '../src/script/index.js'),
        // 输出到dist目录
        output: {
            path: path.join(__dirname, '../dist'),
            filename: 'js/[name].js'
        },
        module: {
            loaders: [
                {
                    // 对js文件使用loader
                    test: /\.js$/,
                    use: 'babel-loader'
                }
            ]
        }
    };

```
打开终端运行一下

`webpack --config build/webpack.js`

![](https://img-blog.csdn.net/20180323164938671?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

继续前进，加入html，引入`html-webpack-plugin`插件

```
	// 路径解析
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // js文件入口
    entry: path.join(__dirname, '../src/script/main.js'),
    // 输出到dist目录
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                // 对js文件使用loader
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 生成的html文件名，该文件将被放置在输出目录
            filename: 'index.html',
            // 源html文件路径
            template: path.join(__dirname, '../src/page/index.html')
        })
    ]
};

```
运行一下，html已被生成，并且加入了`script`标签

![这里写图片描述](https://img-blog.csdn.net/20180323170532334?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

加入样式文件，在`src/style/`文件下创建`index.css`，随便写点样式，并由`index.js`引入

```
/* index.css */
body {
	background: red;
}
```

```
/* index.js */
import '../style/index.css';

console.log('webpack第一步');

	
```
由于没有加`css`的`loader`，此时运行必定报错，需要加入对相应的`loader`

```
	...
	module: {
        loaders: [
            {
                // 对js文件使用loader
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                // 对css文件使用loader
                test: /\.css$/,
                // 从右到左执行loader
                use: ['style-loader', 'css-loader']
            }
        ]
    },
	...
```
运行一下，`css`已被打包进`main.js`内

![](https://img-blog.csdn.net/20180323172501474?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

浏览器打开`index.html`，可看到样式被插入到`head`里面`style`标签内

![](https://img-blog.csdn.net/20180326095559466?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

#### 样式和脚本分离(`extract-text-webpack-plugin`)
`npm install -D extract-text-webpack-plugin`

借助`extract-text-webpack-plugin`插件可以将`css`从`js`内分离

```
/* webpack.js */
// 引入插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// plugins里面加入
plugins: [
	new ExtractTextPlugin('css/[name].css'),
	new HtmlWebpackPlugin({
		// 生成的html文件名，该文件将被放置在输出目录
		filename: 'index.html',
		// 源html文件路径
		template: path.join(__dirname, '../src/page/index.html')
    })
]

```
运行一下，`css`被生成了，这里解释一下为什么我们引入的是`index.css`却生成了`main.css`，由于目前属于单页面且没有指定`[name]`，默认为`main`，之前的`js`也是如此

![这里写图片描述](https://img-blog.csdn.net/20180326103753783?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


#### 暂停一下
为了不那么麻烦运行，使用`npm start` 替换`webpack --config build/webpack.js`，修改`packgae.json`文件

```
{
  "name": "demo1",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack --config build/webpack.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "html-webpack-plugin": "^3.1.0",
    "webpack": "^3.10.0"
  }
}
```
继续前进，`css`引入资源，`webpack.js`加入`url-loader`

```
/* index.css */
body {
    background: url('../assets/bg.jpg');
}
div {
    background: url('../assets/header.jpg') no-repeat;
}

```
```
	// module.loaders加入
	{
		// 对下列资源文件使用loader
		test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
		loader: 'url-loader',
		options: {
			// 小于10kb将会转换成base64
			limit: 10240,
			// 大于10kb的资源输出地[name]是名字[ext]后缀
			name: 'img/[name].[ext]'
		}
	}
```
运行一下，小于10k的已被转换成了base64，大于的执行路径引用

![这里写图片描述](https://img-blog.csdn.net/20180326105321583?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
细看引用路径，就会发现这个路径是错误的，我们需要的是`background: url(../img/bg.jpg);`这样的路径，更改这里我们需要修改`.css`文件的处理规则

```
/* webpack.js */
...
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
		publicPath: '../'
	})
}
...
```
运行结果

![运行结果](https://img-blog.csdn.net/20180326142350132?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

#### 再次暂停一下，增加[hash]
为了便于开发，解决缓存问题，为打包生成的文件加入`[hash]`，若嫌弃生成的`hash`的长度，可使用`[hash:n]`自定义长度

#### html标签引入资源处理(标签+第三方库)
对于`img``audio``video`标签这些资源来说，虽然我们可以通过`html-loader`来引入，但如果没有对应的`loader`来处理这些文件，也会出错，之前已经有图片处理的`url-loader`，这个`loader`也同样适用于处理媒体资源

`npm install -D html-loader`

```
...
/* webpack.js */
{
	test: /\.html$/,
	loader: 'html-loader',
	options: {
		// 标签+属性 貌似link:href会出错，引入脚本也会出现问题，img，audio，video是OK的
		attrs: ['img:src', 'audio:src', 'video:src'],
		interpolate: true
	}
},
// 相应的loader解析
{
	test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
	loader: 'url-loader',
	options: {
		limit: 10240,
		name: 'media/[name].[hash:8].[ext]'
	}
}
...

```
由于`.js`和`.css`已经有相应的处理，`html-loader`并不适用于这两个文件的引用，运行结果如下

![这里写图片描述](https://img-blog.csdn.net/20180326135640330?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可以看到对应的资源都已经被打包，且被输出到指定文件夹，多次引用也不会重复打包，但如果有第三方库，且不支持webpack的模块引入，这样也就没有`loader`来处理了0.0，不过我们可以在外部建立一个`static`文件夹来存放这些第三方资源，通过`copy-webpack-plugin`来复制资源到指定位置，这里顺便使用一下`rimraf`包来清理`dist`目录(虽然`clean-webpack-plugin`也能清理，但还是觉得直接删除暴力，直接些)

#### 追加`static`文件目录
* build/ webpack工具文件
* src/  项目开发目录
    * assets/
    * page/  html页面文件夹
    * script/ 脚本文件夹
    * syle/ 样式文件夹
* static/ 第三方库文件夹+仓库(放啥都行)
	* bootstrap/ bs库(假的～随便起名0.0懒得下载)
* package.json

下载包

`npm install -D copy-webpack-plugin rimraf`

```
/* webpack.js */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rm = require('rimraf');

// 删除
rm(path.join(__dirname, '../dist'), (err) => {
    if (err) throw err;
});

// plugins增加copy插件
new CopyWebpackPlugin([{
	// 源文件目录
	from: path.join(__dirname, '../static'),
	// 目标目录 dist目录下
	to: 'static',
	// 筛选过滤，这里复制所有文件，连同文件夹
	ignore: ['.*']
}])
```
运行结果如下

![这里写图片描述](https://img-blog.csdn.net/20180326143318646?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

bootstrap库已经被复制过来了，同样之前生成的乱目录文件也被清理干净了，这里提一下，由于没有相应的`loader`处理，源`html`文件中引入资源的时候就不能使用本地相对路径了，直接`static/***`

#### 重新构建目录

基本的一些处理做完了，但个人有强迫症，目录很乱，`src/assets/`下面图片和媒体资源混乱(虽然打包之后分开了)，打包生成的目录也乱(这里打包生成的目录借鉴vue)，来整理目录吧，就想收拾房间那样～

首先处理`src/assets/`，手动分离并修改相应文件的引用路径，如果嫌麻烦可以不修改，直接进入打包之后的文件修改

#### 理想的`dist`目录结构
* dist/
	* static/
		* css/
		* js/
		* media/
		* img/
		* 第三方库文件/
	* index.html

我们只需要在`webpack.js`里面相应的位置加入`staic/`即可，附上目前完整的`webpack.js`代码

```
/* webpack.js */
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

```
由于多了一层目录，所以`ExtractTextPlugin.extract`里面也就对应的多一层`../`

至此，基础配置就算是完成了，接下来，使用`webpack-dev-server`构建服务

#### 搭建服务器

`npm install -D webpack-dev-server@2.9.7` v3以上版本是需要`webpack-cli`这里还是使用3.0以下的吧

通过`webpack-dev-server --config buidl/webpack.js`运行即可，修改一下`packge.json`

```
"scripts": {
    "start": "webpack-dev-server --config build/webpack.js",
    "build": "webpack --config build/webpack.js"
  }
```
`npm start`开启本地服务器，`npm run build`可以打包，先`npm start`运行一下(我已经删除了dist目录)

![这里写图片描述](https://img-blog.csdn.net/20180326204406144?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

这里可以看到服务器已经搭建完毕，可以通过`localhost:8080`访问，另外并没有生成`dist`目录，因为其生成的文件都放置内存中，我们没法看见，如果运行`npm run build`就会看到打包生成的文件了，浏览器访问一下吧～

另外我们也可以自定义端口号和加入局域网IP来搭建服务器

```
/* webpack.js */
module.exports = {
	entry: ....
	output: ...
	// 加入端口和IP配置
	devServer: {
        host: '192.168.0.101',
        port: '2018'
    },
    module: ...
}
```

#### Babel

由于es6的普及，开发过程中es6的特性也被大量使用，let，const，箭头函数啊等等，webpack只是打包，并没有将es6转换为es5

![打包运行](https://img-blog.csdn.net/20180326210638231?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

可见`webpack`只是执行，并未处理语法，所以这时候我们就需要用到`babel`，通过`.babelrc`文件以及相应的配置可以来帮我们转换es6，[babel](https://babeljs.cn)具体说明见官网

`npm install -D babel-preset-latest babel-preset-stage-0`

创建`.babelrc`文件并写入相关配置代码，这里的配置都是极为基础，打包运行如下，可见`const`、`() => {}`、`...`都被转换了

![](https://img-blog.csdn.net/20180326211356551?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1llbHVvY2hlbjQ4Njk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


好了第一步就算是走完了，下一章的笔记是环境分离，多页面开发，压缩文件也放入下一章里面～

希望对大家有所帮助，如有错误，欢迎指出...




