import '../style/index.css';
import '../style/less.less';
import '../style/scss.scss';
import '../style/sass.sass';
import HeaderTpl from '../tpl/header/tpl';

const header = new HeaderTpl();
const $ = require('jquery');

$('body').prepend(header.tpl);

//
// console.log($);
// console.log($('#J-demo1').html());
//
// $('#J-btn1').click(function () {
//     alert('hello');
// });
