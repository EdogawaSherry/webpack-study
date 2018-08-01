# webpack-cli
### 功能
* 单页／多页面开发
* 开发生产分离
* css背景图小于10k转换为base64，大于则url引用
* css／js压缩打包
* es6=>es5
* tpl模版
* HMR(测试中，目前只能执行一次，好奇怪)

### 文件目录介绍
* ...
* build/ webpack主要脚本目录
	* config.js 全局配置，单页面／多页需要手动添加`HTMLDirs`数组里面
	* utils.js 目前只拥有图片和样式的处理
	* webpack.base.js 公共的基础配置
	* webpack.dev.js 开发环境配置
	* webpack.prod.js 生产环境配置
* src/ 编程目录
	* assets/ 资源
	* page／ html目录
	* script/ 脚本目录
	* style/ 样式目录
* static／ 静态资源目录，一般html标签引用的资源放里面吧
* .babelrc babel配置
* .eslintignore 代码检测(不需要检查的目录文件配置)
* .eslintrc.json 代码检测(代码检测还是结合IDE使用吧)
* ...

### 运行
* `npm start` 开发环境
* `npm run build` 正式发布

### tpl描述
tpl模版功能，使用`ejs-loader`解析`.tpl`文件，js文件引入tpl文件即可，
其它js文件引入模版js文件即可，`.tpl`支持ejs语法

```
	/** 模版js文件 **／
	// 引入模版
	import tpls from './header.tpl';
	// 样式，并不是必须，如果小型开发，样式直接在主入口引入，tpl文件就写class即可
	import './header.less';
	/**
	 * 头部模版
	 * @param { Object } data 传入参数
	 * @return { Object }
	 */
	export default function header(data) {
		// tpls 打印出来其实是一个函数，支持Object传入，用于渲染，该函数返回的是html字符串
	    return {
	        tpl: tpls(data)
	    };
	}

```
原理就是这样，自定义各种骚操作吧
