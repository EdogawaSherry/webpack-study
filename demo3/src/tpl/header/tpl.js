import tpl from './tpl.tpl';
import './tpl.css';

export default function HeaderTpl() {
    const data = {
        title: '我是头部',
        lists: ['皮卡丘', '小火龙', '杰尼龟']
    };
    return {
        tpl: tpl(data)
    };
}
