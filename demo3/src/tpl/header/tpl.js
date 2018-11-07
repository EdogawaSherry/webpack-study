import tpl from './tpl.tpl';
import './tpl.css';

export default function HeaderTpl() {
    const data = {
        title: '我是头部',
        lists: ['皮卡丘', '小火龙', '杰尼龟'],
        html: '<p>我是一个p标签</p>'
    };
    console.log(tpl(data));
    return {
        tpl: tpl(data)
    };
}
